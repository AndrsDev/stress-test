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
  write("2. Apertura de cuentas monetarias");
  write("3. Efectuar transferencias entre cuentas");
  write("4. Obtener el historial de movimientos de todas las cuentas");
  write("5. Obtener el balance total de todas las cuentas");
  const option = await read("\nIngrese el número test para iniciarlo:");
  let n = 0;
  switch (option) {
    case "1":
      n = await read("\n¿Cuántos clientes desea crear?");
      await createClients(n);
      break;
    case "2":
      n = await read("\n¿Cuántas cuentas desea abrir?");
      await createAccounts(n);
      break;
    case "3":
      n = await read("\n¿Cuántas transferencias desea realizar?");
      await createTransfers(n);
      break;
    case "4":
      await getAllTransactions();
      break;
    case "5":
      await getTotalBalance();
      break;
    default:
      write("No se ha seleccionado una opción correcta, finalizando el programa.");
      break;
  }
  write("\n");
  rl.close();
  await client.end();
})();

async function createClients(number) {
  write(`\nIniciando inserción de ${number} clientes.`)
  write("...");
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
  write(`Inserción de clientes finalizada.`)
}

async function createAccounts(number) {
  write(`\nIniciando creación de ${number} cuentas.`)
  write("...");
  const query = `
    insert into "account" (
      created,
      balance,
      currency,
      status,
      type
    ) values (
      current_timestamp,
      0,
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
  write(`Creación de cuentas finalizada.`)
}

async function createTransfers(number) {
  write(`\nIniciando creación de ${number} transferencias.`)
  write("...");
  const query = `
    BEGIN;
      insert into "transaction" (
        date, amount, type, account
      ) values (
        current_timestamp,
        100,
        2,
        1
      );
      insert into "transaction" (
        date, amount, type, account
      ) values (
        current_timestamp,
        100,
        1,
        2
      );
      UPDATE "account" SET balance = balance - 100.00
        WHERE id = 1;
      UPDATE "account" SET balance = balance + 100.00
        WHERE id = 2;
    COMMIT;
  `;

  const promises = [];
  for (let i = 0; i < number; i++) {
    promises.push(client.query(query));    
  }

  await Promise.all(promises);
  write(`Creación de transferencias finalizada.`)
}

async function getAllTransactions() {
  write(`\nIniciando lectura de todas las transacciones.`)
  write("...");
  const query = `
    select 
      transaction.id,
      transaction.date,
      transaction.amount,
      transaction_type.name
    from "transaction" 
    inner join "transaction_type" ON transaction.type = transaction_type.id;
  `;

  const result = await client.query(query);
  write(result.rows);
  write(`Lectura de todas las transaccines finalizada.`)
}

async function getTotalBalance() {
  write(`\nIniciando suma de balance de todas las cuentas.`)
  write("...");
  const query = `
    select sum(balance) from "account";
  `;
  const result = await client.query(query);
  write(result.rows);
  write(`Suma del balance de todas las cuentas finalizada.`)
}