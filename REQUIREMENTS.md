## API Endpoints
#### Products
- Index 
[
no data required
return all the products
]
- Show
[
send id of product in the route (id)
return the required product
]
- Create [token required]
[
    body{
        name: 
        price: 
        category: [OPTIONAL]
    }
    return the created product
]
- Products by category (args: product category)
[
   send the category in the route (:category)
   return the required products
]
## RESTful routes for Products
- Index route            :'products'            [GET]
- Show route             :'products/:id'        [GET]
- Create route           :'products'            [POST]
- productByCtegory route :'products/:category'  [GET]
#### Users
- Index [token required]
[
    no data required 
    return all users
]
- Show [token required]
[
    send id of product in the route (id)
    return the required user
]
- Create N[token required]
[
    body{
        first_name:
        last_name:
        password_:
    }
    return token for this user
]

## RESTful routes for Users
- Index route :'users'    [GET]
- Show route  :'users/:id'[GET]
- Create route:'users'    [POST]

#### Orders
- Create [token required]
[
body 
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
return the created order
]
- Show specific order by user (args: user id)[token required]
[
    send id of product in the route (id)
    return the required order
]
- Current Order by user (args: user id)[token required]
[
    send id of user who made this order in the route (user_id)
    return all orders with this user id
]
- Completed Orders by user (args: user id)[token required]
[
    send id of user who made this order in the route (user_id)
    return all orders with this user id and thier status (Completed)
]
- addProduct add product to spacific order [token required]
[
    body{
        quantity:
    }
    send the order_id and product_id in the route parameters (:order_id,:product_id)
]

## RESTful routes for Orders
- Create route          :'orders'                               [POST]
- Show route            :'orders/:id'                           [GET]
- CurrentOrder route    :'orders/:user_id'                      [GET]
- CompletedOrders route :'orders/completed/:user_id'            [GET]
- addProduct route      :'orders/:order_id/products/:product_id'[POST]

## Data Shapes
#### Table users
- id : SERIAL  PRIMARY KEY 
- first_name : VARCHAR(100)
- last_name : VARCHAR(100)
- password_: VARCHAR



#### Table products
- id : SERIAL PRIMARY KEY
- name  : VARCHAR(100)
- price : integer
- category : varchar


#### Table orders
- id : SERIAL  PRIMARY KEY
- user_id : BIGINT  REFERENCES users(id)
- status :VARCHAR(100)


#### Table  product_order
- quantity int 
- product_id bigint REFERENCES products(id)
- order_id bigint REFERENCES orders(id)
- PRIMARY KEY(product_id, order_id)

