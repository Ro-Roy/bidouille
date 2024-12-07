CREATE VIEW napoleon_affair_view AS
WITH report_people_mentions AS (
    SELECT
        pr.location,
        hp.name AS person_mentioned
    FROM napoleon_data.public_reports pr
    LEFT JOIN napoleon_data.historical_people hp
        ON LOWER(pr.details) LIKE '%' || LOWER(hp.name) || '%' -- Match mentions of people in report details
),
person_mentions_count AS (
    SELECT
        location,
        person_mentioned,
        COUNT(*) AS mention_count
    FROM report_people_mentions
    WHERE person_mentioned IS NOT NULL
    GROUP BY location, person_mentioned
),
most_mentioned_persons AS (
    SELECT
        location,
        person_mentioned AS most_mentioned_person,
        MAX(mention_count) AS occurrences_most_mentioned_person
    FROM person_mentions_count
    GROUP BY location, person_mentioned
    HAVING MAX(mention_count) = (
        SELECT MAX(mention_count)
        FROM person_mentions_count AS sub
        WHERE sub.location = person_mentions_count.location
    )
)
SELECT
    pr.location,
    COUNT(pr.id) AS total_reports,
    COUNT(DISTINCT rpm.person_mentioned) AS total_people_mentioned,
    mmp.most_mentioned_person,
    mmp.occurrences_most_mentioned_person
FROM napoleon_data.public_reports pr
LEFT JOIN report_people_mentions rpm
    ON pr.location = rpm.location
LEFT JOIN most_mentioned_persons mmp
    ON pr.location = mmp.location
GROUP BY pr.location, mmp.most_mentioned_person, mmp.occurrences_most_mentioned_person
ORDER BY pr.location;