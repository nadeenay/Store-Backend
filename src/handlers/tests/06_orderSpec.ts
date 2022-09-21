import app from "../../server";
import supertest from 'supertest';
import {order,order_product} from '../../models/order';
import {user} from '../../models/user';
import { req_product } from "../../models/order";
import {product} from '../../models/product';
const request = supertest(app)

describe('test order end points ', () => {
    try{
    let token = ''
    it('before testing insert user',async ()=>{
        const u: user = {
            first_name: 'nadeen',
            last_name: 'ayman',
            password_: 'radwagamal'
        }
        const res =  await request.post('/users').send(u);
        token=res.body
        expect(res.status).toBe(200);
    })
    it('before testing insert product1',async()=>{
        const product_: product = {
            name:  'milk',
            price: 50,
            category: 'drink'
        }
        const res1 =  await request.post('/products').send(product_).set('Authorization', `Bearer ${token}`);
        expect(res1.status).toBe(200);
    })
    it(' before testing insert product2',async()=>{
        const product2: product = {
            name:  'juice',
            price: 60,
            category: 'drink'
        }
        const res2 =  await request.post('/products').send(product2).set('Authorization', `Bearer ${token}`);
        expect(res2.status).toBe(200);
    })

    it(' before testing insert product3',async()=>{
        const product2: product = {
            name:  'juice',
            price: 70,
            category: 'drink'
        }
        const res2 =  await request.post('/products').send(product2).set('Authorization', `Bearer ${token}`);
        expect(res2.status).toBe(200);
    })

    const order_: order = {
        status: 'Completed',
        user_id: 1,
    }
    const products:req_product[]=[
        {
          product_id:4,
          quantity:5
        }
       ]

    it('test create order  ', async () => {
        const res =  await request.post('/orders').send({ status: 'Completed',user_id: 1,products}).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    
    // it('test show order ', async () => {
    //     const res = await request.get('/orders/1').set('Authorization', `Bearer ${token}`);
    //     expect(res.status).toBe(200);
    // });

    it('test completedOrders end point ', async () => {
        const res = await request.get('/orders/completed/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    const product_: product = {
        name:  'cheese',
        price: 33,
        category: 'food'
    }

    it('test create product end point  ', async () => {
        const res =  await request.post('/products').send(product_).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test addProduct end point', async () => {
        const order_product_:order_product = {
            quantity: 1,
            order_id: 0,
            product_id: 0
        }
        const res =await request.post('/orders/1/products/5').send(order_product_).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
}catch(err){
    throw new Error('orderSpec handle test failed')
}
  });