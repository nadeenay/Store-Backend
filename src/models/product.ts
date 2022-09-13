// @ts-ignore
import Client from '../database'

export type product = {
    product_id?: number,
    name :string ,
    price: number,
    category?: string
}

export class Product {
  async index(): Promise<product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products'
  
      const result = await conn.query(sql)
  
      conn.release()
  
      return result.rows 
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  async show(id: number): Promise<product> {
    try {
    const sql = 'SELECT * FROM products WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  async create(b: product): Promise<product> {
      try {
    const sql = 'INSERT INTO products (name,price, category) VALUES($1, $2,$3) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()
    const cat = b.category? b.category: null;
    const result = await conn
        .query(sql, [b.name, b.price, cat])

    const product = result.rows[0]

    conn.release()
     return product
      } catch (err) {
          throw new Error(`Could not add new product ${b.name}. Error: ${err}`)
      }
  }

  async mostpopular(): Promise<product> {
      try {
    const sql = 'SELECT p.id,p.name ,(SELECT sum(quantity) FROM product_order GROUP BY product_id) Quntity FROM product p JOIN product_order ON p.id and product_id  ORDER BY Quntity DESC LIMIT 5' 
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql)

    const product = result.rows[0]
    
    conn.release()

    return product
      } catch (err) {
          throw new Error(`Could not get the most popular. Error: ${err}`)
      }
  }
  async productByCategory(categ: string): Promise<product | null> {
    try {
  const sql = 'SELECT * FROM products WHERE category=($1)'
  // @ts-ignore
  const conn = await Client.connect()

  const result = await conn
      .query(sql, [categ])

  const product = result.rows[0]
  conn.release()
   if(result.rows[0])
   {
   return product
   }
   return null

    } catch (err) {
        throw new Error(`Could not add new product with this category . Error: ${err}`)
    }
}


}