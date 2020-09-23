require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});


(async () => {
  await client.connect();
  const res = await client.query('SELECT NOW()');
  console.log(res.rows[0]);
  await client.end()
})();