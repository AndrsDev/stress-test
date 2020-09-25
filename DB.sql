CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar,
  "password" varchar,
  "token_version" int
);

CREATE TABLE "client" (
  "id" SERIAL PRIMARY KEY,
  "created" timestamp,
  "first_name" varchar,
  "last_name" varchar,
  "birthday" date,
  "email" varchar,
  "address" varchar,
  "user" int,
  "phone" int,
  "gender" int,
  "type" int,
  "country" int
);

CREATE TABLE "phone" (
  "id" SERIAL PRIMARY KEY,
  "number" int,
  "dial" int
);

CREATE TABLE "client_type" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "country" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "iso_code" varchar,
  "dial_code" varchar
);

CREATE TABLE "account" (
  "id" SERIAL PRIMARY KEY,
  "created" timestamp,
  "balance" int,
  "currency" int,
  "clent" int,
  "status" int,
  "type" int
);

CREATE TABLE "account_status" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "account_type" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "currency" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "loan" (
  "id" SERIAL PRIMARY KEY,
  "granted" date,
  "amount" int,
  "interest_percentage" real,
  "months" int,
  "type" int,
  "client" int
);

CREATE TABLE "loan_type" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "payment" (
  "id" SERIAL PRIMARY KEY,
  "date" timestamp,
  "description" varchar,
  "client" int,
  "type" int
);

CREATE TABLE "payment_type" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "credit_card" (
  "id" SERIAL PRIMARY KEY,
  "number" int,
  "valid_from" date,
  "valid_until" date,
  "cvv" int,
  "daily_limit" int,
  "total_limit" int,
  "currency" int,
  "client" int
);

CREATE TABLE "debit_card" (
  "id" SERIAL PRIMARY KEY,
  "number" int,
  "valid_from" date,
  "valid_until" date,
  "cvv" int,
  "daily_limit" int,
  "total_limit" int,
  "account" int
);

CREATE TABLE "transaction" (
  "id" SERIAL PRIMARY KEY,
  "date" timestamp,
  "amount" int,
  "type" int,
  "account" int
);

CREATE TABLE "transaction_type" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "gender" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

ALTER TABLE "client" ADD FOREIGN KEY ("user") REFERENCES "user" ("id");

ALTER TABLE "client" ADD FOREIGN KEY ("phone") REFERENCES "phone" ("id");

ALTER TABLE "client" ADD FOREIGN KEY ("gender") REFERENCES "gender" ("id");

ALTER TABLE "client" ADD FOREIGN KEY ("type") REFERENCES "client_type" ("id");

ALTER TABLE "client" ADD FOREIGN KEY ("country") REFERENCES "country" ("id");

ALTER TABLE "account" ADD FOREIGN KEY ("currency") REFERENCES "currency" ("id");

ALTER TABLE "account" ADD FOREIGN KEY ("clent") REFERENCES "client" ("id");

ALTER TABLE "account" ADD FOREIGN KEY ("status") REFERENCES "account_status" ("id");

ALTER TABLE "account" ADD FOREIGN KEY ("type") REFERENCES "account_type" ("id");

ALTER TABLE "loan" ADD FOREIGN KEY ("type") REFERENCES "loan_type" ("id");

ALTER TABLE "loan" ADD FOREIGN KEY ("client") REFERENCES "client" ("id");

ALTER TABLE "payment" ADD FOREIGN KEY ("client") REFERENCES "client" ("id");

ALTER TABLE "payment" ADD FOREIGN KEY ("type") REFERENCES "payment_type" ("id");

ALTER TABLE "credit_card" ADD FOREIGN KEY ("currency") REFERENCES "currency" ("id");

ALTER TABLE "credit_card" ADD FOREIGN KEY ("client") REFERENCES "client" ("id");

ALTER TABLE "debit_card" ADD FOREIGN KEY ("account") REFERENCES "account" ("id");

ALTER TABLE "transaction" ADD FOREIGN KEY ("type") REFERENCES "transaction_type" ("id");

ALTER TABLE "transaction" ADD FOREIGN KEY ("account") REFERENCES "account" ("id");
