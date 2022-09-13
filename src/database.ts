import dotenv from 'dotenv';
import { Pool } from 'pg'
dotenv.config();

const {
DATABASE_HOST,
DATABASE_NAME,
DATABASE_USER,
DATABASE_PASS,
DATABASE_PORT,
ENV,
DATABASE_NAME_TEST,
} = process.env;

let Client:Pool |null= null ; 
if(ENV=='dev')
{
console.log('hello from dev')
Client = new Pool({
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASS,
    port: parseInt(DATABASE_PORT as string)
});
}

if(ENV=='test')
{
 console.log('hello from test')
 Client = new Pool({
        host: DATABASE_HOST,
        database: DATABASE_NAME_TEST,
        user: DATABASE_USER,
        password: DATABASE_PASS,
        port: parseInt(DATABASE_PORT as string)
    });
}
export default Client;