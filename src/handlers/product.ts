import express, { Request, Response } from 'express'
import { product, Product } from '../models/product'
import jwt from 'jsonwebtoken'
import tokenVerification from '../middlewares/TokenVerification'
const product_ = new Product()

const index = async (_req: Request, res: Response) => {
  try{
  const products = await product_.index()
  res.json(products)
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

const show = async (_req: Request, res: Response) => {
    try{
   const product = await product_.show(parseInt(_req.params.id))
   res.json(product)
}catch(err){
    res.status(400)
    res.json(err)
}
}

const create = async (_req: Request, res: Response) => {
    try {
        const product: product = {
            name:  _req.body.name,
            price: _req.body.price,
            category: _req.body.category
        }

        const newProduct = await product_.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
const mostpopular = async (_req: Request, res: Response) =>{
    try{
        const mostPopProduct = await product_.mostpopular()
        res.json(mostPopProduct)
    }catch(err){
        res.status(400)
        res.json(err)
    }

}

const productByCategory = async (_req: Request, res: Response) =>{
    try{
        const product = await product_.productByCategory(_req.params.category)
        res.json(product)
    }catch(err){
        res.status(400)
        res.json(err)
    }

}
/////////////////////////////////////////////////////////
const productsRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products',tokenVerification, create)
  app.get('/products/popular', mostpopular)
  app.get('/products/:category', productByCategory)
}

export default productsRoutes