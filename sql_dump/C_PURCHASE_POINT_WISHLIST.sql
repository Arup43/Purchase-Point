create table WISHLIST
(
    EMAIL      VARCHAR2(1000) not null
        references USERS,
    PRODUCT_ID VARCHAR2(1000) not null
        references PRODUCTS,
    ITEM       NUMBER         not null
)
/

INSERT INTO C##PURCHASE_POINT.WISHLIST (EMAIL, PRODUCT_ID, ITEM) VALUES ('b@gmail.com', 'amazon basics gaming headset for pc and consoles-4336', 1);