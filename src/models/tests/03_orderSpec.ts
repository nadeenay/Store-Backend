import {order, Order, req_product} from '../order'
import {order_product}  from '../order'
import {product, Product}  from '../product'

describe(' test order model',()=>{
    try{
    const order = new Order();
    const product = new Product();
    it(' test creating an order ',async()=>{
        const order_:order = {
            user_id:1,
            status: 'Completed'
        }
        const req_product_:req_product[] = [
            {
                quantity:2,
                product_id:1
            },
            {
                quantity:3,
                product_id:2
            }
        ]
        expect(await order.create(order_,req_product_)).toBeDefined();
    });


    it(' get current orders for the user ',async ()=>{
        expect(await order.currentOrder(1)).toBeDefined();
    });

    it(' get completed order  of the user ', async()=>{
        expect(await order.completedOrders(1)).toBeDefined();
    });

    it('test index function to list all products',async()=>{    
        const p: product= {
            name :'cheese ',
            price: 10,
            category: 'food'
        }
        expect(await product.create(p)).toBeDefined();
    });

    it('add order by the user ',async()=>{
        const order_product_:order_product = {
            quantity:3,
            order_id:1,
            product_id:3
        }
        expect(await order.addProduct(order_product_)).toBeDefined();
    });
}catch(err){
    throw new Error('orderSpec handle test failed')
}

});