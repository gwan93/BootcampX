const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});


pool.query(`
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name LIKE '%${process.argv[2]}%'
  LIMIT ${process.argv[3] || 5};
`)
  .then(res => {
    for (const row of res.rows) {
      console.log(`${row.name} has an id of ${row.student_id} and was in the ${row.cohort} cohort`)
    }
  })
.catch(err => console.error('query error', err.stack));