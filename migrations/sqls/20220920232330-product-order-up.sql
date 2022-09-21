/* Replace with your SQL commands */
CREATE TABLE product_order(
    quantity int NOT NULL,
    product_id bigint NOT NULL REFERENCES products(id),
    order_id bigint NOT NULL REFERENCES orders(id),
    PRIMARY KEY(product_id, order_id)
);