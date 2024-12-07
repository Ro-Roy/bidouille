WITH filtered_reports AS (
    SELECT
        id,
        location,
        latitude,
        longitude,
        start_time,
        end_time,
        EXTRACT(EPOCH FROM (end_time - start_time)) AS duration -- Duration in seconds
    FROM napoleon_data.public_reports
    WHERE start_time IS NOT NULL
      AND end_time IS NOT NULL
      AND location IS NOT NULL
      AND latitude IS NOT NULL
      AND longitude IS NOT NULL
),
ordered_reports AS (
    SELECT
        id,
        location,
        latitude,
        longitude,
        start_time,
        end_time,
        duration,
        LAG(id) OVER (ORDER BY start_time) AS prev_id,
        LAG(location) OVER (ORDER BY start_time) AS prev_location,
        LAG(latitude) OVER (ORDER BY start_time) AS prev_latitude,
        LAG(longitude) OVER (ORDER BY start_time) AS prev_longitude,
        LAG(start_time) OVER (ORDER BY start_time) AS prev_start_time,
        LAG(end_time) OVER (ORDER BY start_time) AS prev_end_time
    FROM filtered_reports
),
timeline_analysis AS (
    SELECT
        id,
        location,
        duration,
        start_time,
        end_time,
        prev_id,
        prev_location,
        prev_start_time,
        prev_end_time,
        EXTRACT(EPOCH FROM (start_time - prev_end_time)) AS time_difference, -- Difference in seconds
        6371 * acos(
            cos(radians(latitude)) * cos(radians(prev_latitude)) *
            cos(radians(prev_longitude) - radians(longitude)) +
            sin(radians(latitude)) * sin(radians(prev_latitude))
        ) AS distance
    FROM ordered_reports
    WHERE prev_id IS NOT NULL
),
tagged_issues AS (
    SELECT
        id,
        location,
        duration,
        time_difference,
        distance,
        CASE
            WHEN start_time < prev_end_time THEN 'overlapping_timeframes'
            WHEN time_difference < 7200 AND distance > 500 THEN 'moving_fast' -- Less than 2 hours and > 500 km
            WHEN duration > 86400 THEN 'long_duration' -- Duration > 24 hours
            WHEN distance > 500 THEN 'long_distance' -- Distance > 500 km
            WHEN location IS NULL OR start_time IS NULL OR end_time IS NULL THEN 'missing_data'
            ELSE 'clear'
        END AS issue
    FROM timeline_analysis
)
SELECT
    id,
    location,
    duration,
    time_difference,
    distance,
    issue
FROM tagged_issues
ORDER BY id;