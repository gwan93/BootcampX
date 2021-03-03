const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit];

pool.query(`
  SELECT DISTINCT teachers.name, cohorts.name as cohort
  FROM teachers
  JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id
  JOIN students ON assistance_requests.student_id = students.id
  JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1
  ORDER BY teachers.name
  LIMIT $2;
`, values)
  .then(res => {
    for (const row of res.rows) {
      console.log(`${row.cohort}: ${row.name}`)
    }
  })
.catch(err => console.error('query error', err.stack));




