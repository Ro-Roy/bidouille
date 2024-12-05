SELECT
    MIN(size) FILTER (WHERE LOWER(filename) LIKE '%secret%') AS smallest_secret_file_size,
    MIN(size) AS smallest_file_size
FROM dtf.madelines_files;

--

SELECT
    filename,
    size
FROM dtf.madelines_files
WHERE created_at >= '2059-11-26 00:00:00' -- Dernière semaine
  AND created_at <= '2059-12-03 23:59:59'
  AND size = (
      SELECT MAX(size)
      FROM dtf.madelines_files
      WHERE created_at >= '2059-11-26 00:00:00'
        AND created_at <= '2059-12-03 23:59:59'
  )
ORDER BY filename ASC;

-- 
WITH avg_size AS (
    SELECT AVG(size) AS average_size
    FROM dtf.madelines_files
)
SELECT
    filename,
    size
FROM dtf.madelines_files, avg_size
WHERE size > 0.75 * average_size
ORDER BY size DESC, filename ASC;
--
WITH executable_files AS (
    SELECT parent_id AS folder_id
    FROM dtf.madelines_files
    WHERE permissions LIKE '%x%' -- Fichiers exécutables
)
SELECT
    folder_id,
    COUNT(*) AS nb_executables
FROM executable_files
GROUP BY folder_id
HAVING COUNT(*) >= 3
ORDER BY folder_id ASC;
--
WITH user_file_count AS (
    SELECT owner, COUNT(*) AS num_files
    FROM dtf.madelines_files
    GROUP BY owner
)
SELECT
    owner,
    num_files
FROM user_file_count
WHERE num_files = (
    SELECT MIN(num_files)
    FROM user_file_count
)
ORDER BY owner ASC;