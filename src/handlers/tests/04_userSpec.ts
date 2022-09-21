import app from "../../server";
import supertest from 'supertest';
import {user} from '../../models/user';
const request = supertest(app)

describe('test user end points ', () => {
    let token = '';
    try{
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
    
    it('test index end point ', async () => {
      const res = await request.get('/users').set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('test show end point ', async () => {
        const res = request.get('/users/1').set('Authorization', `Bearer ${token}`);
        expect((await res).status).toBe(200);
    });
    
}catch(err){
    throw new Error('userSpec handle test failed')
}
  });