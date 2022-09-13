import jasmine from "jasmine";
import {product , Product } from '../product'

describe('test product model',  ()=>{
    const product = new Product();
    it('test insex function to list all products',async()=>{    
        const p: product= {
            name :'milk ',
            price: 30,
            category: 'drink'
        }
        expect(await product.create(p)).toBeDefined();
    });

  it('test insex function to list all products',async()=>{
    expect(await product.index()).toBeDefined();
  });

//   it('test insex function to list all products',async()=>{
//     expect(await product.mostpopular()).toBeDefined();
//   });

  it('test insex function to list all products',async()=>{
    expect(await product.productByCategory('drink')).toBeDefined();
  });

  it('test insex function to list all products',async()=>{
    expect(await product.show(1)).toBeDefined();
  });
});

