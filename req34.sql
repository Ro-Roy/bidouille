CREATE TEMP TABLE not_guilty AS
SELECT
    p.id AS person_id,
    p.first_name,
    p.last_name,
    p.birth_date,
    c.classification,
    c.description
FROM
    public.people p
JOIN
    justice.defendants d
ON
    p.id = d.person_id
JOIN
    justice.outcomes o
ON
    d.trial_id = o.trial_id
JOIN
    justice.cases c
ON
    o.trial_id = c.id
WHERE
    o.outcome = 'NOT_GUILTY';

--4
CREATE TABLE public.release_dates AS
SELECT
    p.id AS person_id,
    p.first_name,
    p.last_name,
    o.created_at,
    o.serving_time,
    (o.created_at + ((o.serving_time - COALESCE(sr.amount, 0)) || ' months')::interval) AS release_date
FROM
    public.people p
JOIN
    justice.defendants d
ON
    p.id = d.person_id
JOIN
    justice.outcomes o
ON
    d.trial_id = o.trial_id
LEFT JOIN
    justice.sentence_reductions sr
ON
    o.id = sr.outcome_id
WHERE
    o.outcome = 'GUILTY'
ORDER BY
    release_date DESC,
    o.serving_time DESC;