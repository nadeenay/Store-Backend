import {order, Order, req_product} from '../order'
import {order_product}  from '../order'

describe(' test order model',()=>{
    const order = new Order();
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
        console.log(' hello from test ')
        expect(await order.currentOrder(1)).toBeDefined();
    });

    it(' get completed order  of the user ', async()=>{
        expect(await order.completedOrders(1)).toBeDefined();
    });

    it(' add order by the user ',async()=>{
        const order_product_:order_product = {
            quantity:3,
            order_id:1,
            product_id:1
        }
        expect(await order.addProduct(order_product_)).toBeDefined();
    });

});