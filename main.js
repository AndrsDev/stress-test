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
  await client.connect()

  write("------------------------------------------------------------");
  write("Universidad InterNaciones");
  write("Desempeño de Sistemas");
  write("Andrés Enrique Sanabria Flores 17030008");
  write("------------------------------------------------------------");

  write("Menú");
  write("1. Creación de clientes (datos personales, correo, contraseña, etc.)");
  write("2. Apertura de cuentas monetarias y de ahorro");
  write("3. Efectuar transferencias entre cuentas");
  write("4. Obtener el historial de movimientos de todas las cuentas");
  write("5. Obtener el balance total de todas las cuentas");
  const option = await read("\nIngrese el número test para iniciarlo:");



  switch (option) {
    case "1":
      await createClients(10000);
      break;
  
    default:
      break;
  }


  rl.close();

  // const res = await client.query('SELECT NOW()');
  // console.log(res.rows[0]);
  await client.end();
})();

async function createClients(number) {
  write(`\nIniciando inserción de ${number} clientes...`)
  const query = `
    insert into "client" (
      created, 
      first_name, 
      last_name, 
      birthday, 
      address,
      "user",
      phone,
      gender,
      type,
      country
    ) values (
      current_timestamp, 
      'Julio', 
      'Profe',
      '1997-08-24',
      'City',
      1, 
      1,
      1,
      1, 
      1
    );
  `;

  const promises = [];
  for (let i = 0; i < number; i++) {
    promises.push(client.query(query));    
  }

  await Promise.all(promises);
  write(`Inserción de ${number} clientes finalizada.`)
}