import express, { Request, Response } from 'express'
import { order, Order, order_product } from '../models/order'
import jwt from 'jsonwebtoken'
import client from '../database'
import { product } from '../models/product'
import {req_product} from '../models/order'
const order_ = new Order()

/////////////////////////////////////
/*
body for create handler 
{
 "user_id":
 "status":
 "products":[
  {
    "product_id":
    "quantity":
  }
 ]
}
*/ 
/////////////////////////////////////
const create = async (_req: Request, res: Response) => {
  try{
  const order_product_:order = {
  user_id:_req.body.user_id,
  status:_req.body.status,
}

const products : req_product[] =  _req.body.products

const orders = await order_.create(order_product_,products)
res.json(orders)
  } catch(err){
    res.status(401);
    throw new Error(`error while creating order ${err}`)
  }
}
const currentOrder = async (_req: Request, res: Response) => {
    try{
  const orders = await order_.currentOrder(parseInt(_req.params.user_id))
  res.json(orders)
    } catch(err){
      res.status(401);
      res.json('can not handle currentOrder request')
      return 
    }
}

const completedOrders = async (_req: Request, res: Response) => {
   const order = await order_.completedOrders(parseInt(_req.params.user_id))
   res.json(order)
}

const  addProduct= async (req:Request, res:Response) =>{
  const order_product_:order_product = {
      quantity: req.body.quantity,
      order_id: parseInt(req.params.order_id),
      product_id: parseInt(req.params.product_id)
  }
  const Product = await order_.addProduct(order_product_)
  res.json(Product)
}

const show= async(req:Request, res:Response) =>{
   try{
  const order = await order_.show(parseInt(req.params.id))
   }catch(err) {
    throw new Error(`can not show this order ${err}`)
   }
}

// Middleware
const tokenVerification= async (req: Request, res: Response, next: Function) =>
{
    try{
        const authorizationHeaders= req.headers.authorization
        const token = authorizationHeaders?.split(' ')[1]
        jwt.verify(token as string, process.env.TOKEN_SECRET as string)
        next()

    }catch(err){
        res.status(401);
        res.json('Access denied , Token is not defiend')
        return 
    }

}

/////////////////////////////////////////////////////////////////////////////////////
const ordersRoutes = (app: express.Application) => {
  app.post('/orders',tokenVerification, create)
  app.get('/orders/:id',tokenVerification, show)
  app.get('/orders/:user_id',tokenVerification, currentOrder)
  app.get('/orders/completed/:user_id',tokenVerification, completedOrders)
  app.post('/orders/:order_id/products/:product_id',tokenVerification,addProduct)
}

export default ordersRoutes
