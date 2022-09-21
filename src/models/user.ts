import Client from '../database'
import bcrypt from 'bcrypt'
const saltRounds = process.env.SALT_ROUNDS
const pepper = process.env.BCRYPT_PASSWORD

export type user = {
  id?: number;
  first_name: string;
  last_name: string;
  password_: string;
}

export class User {
  async index(): Promise<user[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get users: ${err}`)
    } 
  }

  async show(id: number): Promise<user> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      //@ts-ignoreX$
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`unable show user ${id}: ${err}`)
    }
  }

  async create(u: user): Promise<user> {
    try {
      console.log(u)
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'INSERT INTO users (first_name, last_name, password_) VALUES($1, $2,$3) RETURNING *'

      const hash = bcrypt.hashSync(
        u.password_ + pepper, 
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [u.first_name,u.last_name, hash])
      const user = result.rows[0]

      conn.release()

      return user
    } catch(err) {
      throw new Error(`unable create user (${u.first_name}): ${err}`)
    } 
  }
  async authenticate(user_:user): Promise<user | null> {
    try{
    // @ts-ignore
    const conn = await Client.connect()
    const sql = 'SELECT password_ FROM users WHERE id=($1)'

    const result = await conn.query(sql, [user_.id])

    console.log(user_.password_+pepper)

    if(result.rows.length) {

      const user = result.rows[0]

      console.log(user)
      
      if (bcrypt.compareSync(user_.password_+pepper, user.password_)) {
        return user
      }
    }

    return null
}catch(err)
{
    throw new Error(`unable authenticate user: ${err}`)
}
  }
}