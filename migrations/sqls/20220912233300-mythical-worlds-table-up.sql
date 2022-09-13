/* Replace with your SQL commands */
CREATE TABLE users(
    id SERIAL  PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password_ VARCHAR
);

CREATE TABLE products(
    id SERIAL PRIMARY KEY ,
    name  VARCHAR(100) NOT NULL,
    price  integer NOT NULL,
    category varchar
);

CREATE TABLE orders(
    id SERIAL  PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    status VARCHAR(100)
);

CREATE TABLE product_order(
    quantity int NOT NULL,
    product_id bigint NOT NULL REFERENCES products(id),
    order_id bigint NOT NULL REFERENCES orders(id),
    PRIMARY KEY(product_id, order_id)
);

INSERT INTO users (first_name,last_name,password_) VALUES('nadeen','ayman','radwagamal');
INSERT INTO products (name,price,category) VALUES('milk',2,'drink');
INSERT INTO products (name,price,category) VALUES('juice',3,'drink');
INSERT INTO orders (user_id,status) VALUES(1,'Completed') ;
INSERT INTO product_order (quantity,order_id,product_id) VALUES(3,1,2);
