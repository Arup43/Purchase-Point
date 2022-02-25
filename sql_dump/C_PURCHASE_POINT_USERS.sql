create table USERS
(
    NAME         VARCHAR2(500)  not null,
    EMAIL        VARCHAR2(1000) not null,
    PASSWORD     VARCHAR2(1000) not null,
    PHONE_NUMBER NUMBER         not null,
    SELLER       VARCHAR2(500)  not null
)
/

create unique index USERS_EMAIL_UINDEX
    on USERS (EMAIL)
/

alter table USERS
    add constraint USERS_PK
        primary key (EMAIL)
/

INSERT INTO C##PURCHASE_POINT.USERS (NAME, EMAIL, PASSWORD, PHONE_NUMBER, SELLER) VALUES ('Arup', 'debnatharupbzs@gmail.com', '500600700', 1733347793, 'true');
INSERT INTO C##PURCHASE_POINT.USERS (NAME, EMAIL, PASSWORD, PHONE_NUMBER, SELLER) VALUES ('someone', 'b@gmail.com', '123456789', 3232424234324, 'true');
INSERT INTO C##PURCHASE_POINT.USERS (NAME, EMAIL, PASSWORD, PHONE_NUMBER, SELLER) VALUES ('sajib', 'sajib73677@gmail.com', '12345678', 1234567890, 'true');
INSERT INTO C##PURCHASE_POINT.USERS (NAME, EMAIL, PASSWORD, PHONE_NUMBER, SELLER) VALUES ('someone', 'someone@gmail.com', '123456789', 7843437837, 'true');