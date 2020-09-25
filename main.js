require('dotenv').config();
const readline = require("readline");
const { Client } = require('pg');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new Client({
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

function write(message) {
  console.log(message);
}

function read(message) {
  return new Promise((resolve, reject) => {
    rl.question(`${message} \n`, (param) => {
      resolve(param);
    });
  }) 
}

(async () => {
  // await client.connect();
  const name = await read("What is your name?");

  write(`Hello ${name}`);

  rl.close();

  // const res = await client.query('SELECT NOW()');
  // console.log(res.rows[0]);
  // await client.end()
})();