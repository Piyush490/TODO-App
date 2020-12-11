# TODO-App
NodeJS+Postgres

## Steps to run
1) Install postgres + nodejs to your local machine.
2) Create a database 'perntodo' and a table named 'todo' using command-
    CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    priority VARCHAR(255)
);
3) Add your username and password in ./db.js file.
4) Run npm install to install all dependencies
5) Run Node server.js

## Assumptions-
1) TODO table primary key is 'id' attribute.
2) User can set priorities through numbers or strings which can be restricted in frontend.
