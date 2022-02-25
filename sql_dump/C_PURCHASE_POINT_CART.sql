create table CART
(
    EMAIL      VARCHAR2(1000) not null
        references USERS,
    PRODUCT_ID VARCHAR2(1000) not null
        references PRODUCTS,
    ITEM       NUMBER         not null
)
/

