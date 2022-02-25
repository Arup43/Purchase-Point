create table REVIEW
(
    EMAIL       VARCHAR2(1000) not null
        references USERS,
    PRODUCT_ID  VARCHAR2(1000) not null
        references PRODUCTS,
    REVIEW_TEXT VARCHAR2(3000) not null,
    RATING_STAR NUMBER         not null,
    "DATE"      DATE           not null
)
/

