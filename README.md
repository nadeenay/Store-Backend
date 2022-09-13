### To run the project 
1- #### Install dependencies
```
npm install 
```
2- #### Add .env file and write the following code
```
DATABASE_HOST=localhost
DATABASE_NAME=store
DATABASE_USER=postgres
DATABASE_PASS=13579
DATABASE_PORT=5433
ENV=dev
DATABASE_NAME_TEST=store_test
BCRYPT_PASSWORD=your-secret-password SALT_ROUNDS=10
TOKEN_SECRET= JWT_SECRET
```
3- #### create the database
```
CREATE DATABASE store;
CREATE DATABASE store_test;
```
4- #### run the migration file to create tables
```
db-migrate up 
```
5- #### run the server 
```
npm run server
```
6- run tests
```
npm run test 
```
