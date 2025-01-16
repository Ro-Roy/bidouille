SELECT DISTINCT p.first_name, p.last_name
FROM public.people p
WHERE EXISTS (
    SELECT 1
    FROM transport.metro_usage_logs m
    JOIN transport.metro_stations s ON m.station_id = s.id
    WHERE s.name = 'Morgane Abeille' 
      AND m.person_id = p.id
);

---- 2 
SELECT b.*
FROM backup.street_logs b
LEFT JOIN public.street_logs p ON b.id = p.id
WHERE p.id IS NULL;


---3 
SELECT b.*
FROM backup.street_logs b
INNER JOIN public.street_logs p ON b.id = p.id;
  
---- 4
SELECT 
    'metro' AS place_type,
    COUNT(DISTINCT m.person_id) AS entries,
    m.station_id AS place_id
FROM transport.metro_usage_logs m
GROUP BY m.station_id
UNION ALL
SELECT 
    'shop' AS place_type,
    COUNT(DISTINCT s.person_id) AS entries,
    s.shop_id AS place_id
FROM public.shop_entrance_logs s
GROUP BY s.shop_id
ORDER BY entries DESC, place_id ASC, place_type DESC;

---5
SELECT 
    p.id AS person_id,
    p.first_name AS person_first_name,
    p.last_name AS person_last_name,
    l.created_at,
    'street' AS place,
    l.street_id AS place_id
FROM public.street_logs l
JOIN public.people p ON l.person_id = p.id
WHERE l.created_at BETWEEN '2059-12-03 17:00:00' AND '2059-12-03 22:00:00'
UNION ALL
SELECT 
    p.id AS person_id,
    p.first_name AS person_first_name,
    p.last_name AS person_last_name,
    l.created_at,
    'shop' AS place,
    l.shop_id AS place_id
FROM public.shop_entrance_logs l
JOIN public.people p ON l.person_id = p.id
WHERE l.created_at BETWEEN '2059-12-03 17:00:00' AND '2059-12-03 22:00:00'
UNION ALL
SELECT 
    p.id AS person_id,
    p.first_name AS person_first_name,
    p.last_name AS person_last_name,
    l.created_at,
    'metro' AS place,
    l.station_id AS place_id
FROM transport.metro_usage_logs l
JOIN public.people p ON l.person_id = p.id
WHERE l.created_at BETWEEN '2059-12-03 17:00:00' AND '2059-12-03 22:00:00'
ORDER BY created_at, person_id;


---- 6
(
    SELECT l.person_id, l.validation, l.created_at
    FROM transport.metro_usage_logs l
    WHERE l.created_at BETWEEN '2059-12-03 12:00:00' AND '2059-12-03 14:00:00'
)
UNION ALL
(
    SELECT l.person_id, l.validation, l.created_at
    FROM transport.metro_usage_logs l
    WHERE l.created_at BETWEEN '2059-12-03 20:00:00' AND '2059-12-03 22:00:00'
    ORDER BY l.created_at DESC
    LIMIT 10
)
ORDER BY person_id;

