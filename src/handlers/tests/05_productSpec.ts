import app from "../../server";
import supertest from 'supertest';
import {product} from '../../models/product';
import { user } from "../../models/user";
const request = supertest(app)

describe('test product end points ', () => {
    try{
    let token = ''
    const u: user = {
        first_name: 'nadeen',
        last_name: 'ayman',
        password_: 'helloworld'
    }

    it('test create end point  ', async () => {
        const res =  await request.post('/users').send(u);
        token = res.body;
        expect((res).status).toBe(200);
    });
    const product_: product = {
        name:  'cheese',
        price: 40,
        category: 'food'
    }

    it('test create end point  ', async () => {
        const res =  await request.post('/products').send(product_).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    
    it('test index end point ', async () => {
      const res = await request.get('/products');
      expect(res.status).toBe(200);
    });
    
    it('test show end point ', async () => {
        const res = await request.get('/products/1');
        expect(res.status).toBe(200);
    });

    // it('test productByCategory end point ', async () => {
    //     const res = await request.get('/products/food');
    //     expect(res.status).toBe(200);
    // });

}catch(err){
    throw new Error('orderSpec handle test failed')
}
  });