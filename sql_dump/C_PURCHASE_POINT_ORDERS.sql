create table ORDERS
(
    ORDER_ID        VARCHAR2(2000) not null
        primary key,
    EMAIL           VARCHAR2(1000) not null
        references USERS,
    "DATE"          DATE           not null,
    TOTAL_COST      NUMBER         not null,
    ADDRESS         VARCHAR2(2000),
    STREET          VARCHAR2(2000),
    CITY            VARCHAR2(2000),
    STATE           VARCHAR2(2000),
    PIN_CODE        VARCHAR2(2000),
    LANDMARK        VARCHAR2(2000),
    DELIVERY_STATUS VARCHAR2(1000),
    PAYMENT         VARCHAR2(2000) not null
)
/

INSERT INTO C##PURCHASE_POINT.ORDERS (ORDER_ID, EMAIL, "DATE", TOTAL_COST, ADDRESS, STREET, CITY, STATE, PIN_CODE, LANDMARK, DELIVERY_STATUS, PAYMENT) VALUES ('2022-02-23T04:00:41.316Z', 'debnatharupbzs@gmail.com', TO_DATE('2022-01-23 10:00:41', 'YYYY-MM-DD HH24:MI:SS'), 37395.6, 'Palashi, Ahsanullah hall,Buet', 'hyth', 'Dhaka', 'Dhaka', '1211', 'hytht', 'assigned', 'bkash');
INSERT INTO C##PURCHASE_POINT.ORDERS (ORDER_ID, EMAIL, "DATE", TOTAL_COST, ADDRESS, STREET, CITY, STATE, PIN_CODE, LANDMARK, DELIVERY_STATUS, PAYMENT) VALUES ('2022-02-23T10:27:26.958Z', 'b@gmail.com', TO_DATE('2022-01-23 16:27:26', 'YYYY-MM-DD HH24:MI:SS'), 11160, 'Palashi, Ahsanullah hall,Buet', 'fefer er', 'Dhaka', 'Dhaka', '1211', 'ergfegrf', 'assigned', 'bkash');
INSERT INTO C##PURCHASE_POINT.ORDERS (ORDER_ID, EMAIL, "DATE", TOTAL_COST, ADDRESS, STREET, CITY, STATE, PIN_CODE, LANDMARK, DELIVERY_STATUS, PAYMENT) VALUES ('2022-02-21T22:05:07.573Z', 'debnatharupbzs@gmail.com', TO_DATE('2022-01-22 04:05:07', 'YYYY-MM-DD HH24:MI:SS'), 2598.05, 'Palashi, Ahsanullah hall,Buet', 'rfgerg', 'Dhaka', 'Dhaka', '1211', 'gerger', 'delivered', 'bkash');
INSERT INTO C##PURCHASE_POINT.ORDERS (ORDER_ID, EMAIL, "DATE", TOTAL_COST, ADDRESS, STREET, CITY, STATE, PIN_CODE, LANDMARK, DELIVERY_STATUS, PAYMENT) VALUES ('2022-02-23T06:40:15.032Z', 'debnatharupbzs@gmail.com', TO_DATE('2022-01-23 12:40:15', 'YYYY-MM-DD HH24:MI:SS'), 2158.49, 'Palashi, Ahsanullah hall,Buet', 'egtrg', 'Dhaka', 'Dhaka', '1211', 'tgtrgtr', 'assigned', 'cash-on-delivery');