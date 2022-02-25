create table SELLERS
(
    BUSINESS_NAME VARCHAR2(1000) not null,
    ABOUT         VARCHAR2(1000) not null,
    ADDRESS       VARCHAR2(1000) not null,
    PHONE_NUMBER  NUMBER         not null,
    EMAIL         VARCHAR2(1000) not null
        primary key
        references USERS
)
/

INSERT INTO C##PURCHASE_POINT.SELLERS (BUSINESS_NAME, ABOUT, ADDRESS, PHONE_NUMBER, EMAIL) VALUES ('dgrthgrthtrh', 'rthtyjuyfuikyhtrg', '6trh67rjyfjyujyuju7y', 324343234322243423, 'debnatharupbzs@gmail.com');
INSERT INTO C##PURCHASE_POINT.SELLERS (BUSINESS_NAME, ABOUT, ADDRESS, PHONE_NUMBER, EMAIL) VALUES ('nhgnfnjmyu', 'ytjnuytjuyjmn', 'gnyumnjh', 657576567755, 'b@gmail.com');
INSERT INTO C##PURCHASE_POINT.SELLERS (BUSINESS_NAME, ABOUT, ADDRESS, PHONE_NUMBER, EMAIL) VALUES ('wefergfergegetr', 'h6tyh5hy56y65ehy65h56h5', 'hg5rth5hytrhytrhr', 554545545565655556, 'sajib73677@gmail.com');
INSERT INTO C##PURCHASE_POINT.SELLERS (BUSINESS_NAME, ABOUT, ADDRESS, PHONE_NUMBER, EMAIL) VALUES ('kugfs sujkgfsi', 'gtrhr h rhtrh hh hrhtrhr', 'sfdsrgvf grthgrthg', 434355435433, 'someone@gmail.com');