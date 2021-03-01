SELECT cohorts.name AS cohort_name, count(cohorts.name) AS student_count
FROM cohorts
JOIN students
ON students.cohort_id = cohorts.id
GROUP BY cohorts.name
HAVING count(cohorts.name) >= 18
ORDER BY count(cohorts.name);
