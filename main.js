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
  write("------------------------------------------------------------");
  write("Universidad InterNaciones");
  write("Desempeño de Sistemas");
  write("Andrés Enrique Sanabria Flores 17030008");
  write("------------------------------------------------------------");

  write("Menú");
  write("1. Creación de usuarios (datos personales, correo, contraseña, etc.)");
  write("2. Apertura de cuentas monetarias y de ahorro");
  write("3. Efectuar transferencias entre cuentas");
  write("4. Obtener el historial de movimientos de todas las cuentas");
  write("5. Obtener el balance total de todas las cuentas");
  const option = await read("\nIngrese el número test para iniciarlo:");

  // await client.connect();

  write(`Opción elegida ${option}`);

  rl.close();

  // const res = await client.query('SELECT NOW()');
  // console.log(res.rows[0]);
  // await client.end()
})();