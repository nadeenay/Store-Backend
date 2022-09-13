// @ts-ignore
import Client from '../database'

export type order = {
    order_id?: number,
    status: string,
    user_id: number
}


export type order_product = {
    quantity: number ,
    order_id: number,
    product_id: number
}


export type req_product = {
  quantity: number ,
  product_id: number
}

export class Order {
  async create(order_:order,req_product_:req_product[]):Promise<order|undefined> {
    try{
      const {user_id ,status} = order_
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'INSERT INTO orders (user_id,status) VALUES($1,$2) RETURNING * '
      const result = await conn.query(sql,[user_id,status])
      for(let i = 0; i< req_product_.length ;i++)
      {
      const sql = 'INSERT INTO product_order (quantity,order_id,product_id) VALUES($1,$2,$3) RETURNING * '
      console.log(`Q= ${req_product_[i].quantity} rows= ${result.rows[0].id} id= ${req_product_[i].product_id} `)
      await conn.query(sql,[req_product_[i].quantity,result.rows[0].id,req_product_[i].product_id])
      }
      conn.release()
  
      return result.rows[0]

    }catch(err){
      throw new Error(`Could not create this order : ${err}`)
    }
  }


  async show(id: number):Promise<order> {
    try{
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT FROM orders WHERE id=($1)'
      const result = await conn.query(sql,[id])
      conn.release()
  
      return result.rows[0]

    }catch(err){
      throw new Error(`Could not show the order with id ${id} : ${err}`)
    }
  }
 
  async addProduct(order_product_:order_product):Promise<order_product|undefined>{
    
      try{
        // @ts-ignore
        const conn =Client.connect();
        const sql = 'INSERT INTO product_order (quantity,order_id,product_id)  VALUES($1,$2,$3) RETURNING *'
        const result  = (await conn).query(sql,[order_product_.quantity,order_product_.order_id,order_product_.product_id])
        console.log((await result).rows[0])
        return (await result).rows[0]
    }catch(err){
        throw new Error(`Couldn't add the product to order ${order_product_.order_id}`)
    }

  }

  async currentOrder(user_id: number): Promise<order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders WHERE user_id=($1) '
  
      const result = await conn.query(sql,[user_id])
  
      conn.release()
  
      return result.rows 
    } catch (err) {
      throw new Error(`Could not get orders for this user Error: ${err}`)
    }
  }

  async completedOrders(user_id: number): Promise<order> {
    try {
    const sql = 'SELECT * FROM orders WHERE status=($1) AND user_id=($2)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, ['Completed',user_id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find completed orders for this user. Error: ${err}`)
    }
  }

}