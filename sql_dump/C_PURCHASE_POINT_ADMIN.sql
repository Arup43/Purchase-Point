create table ADMIN
(
    NAME     VARCHAR2(1000) not null,
    EMAIL    VARCHAR2(1000) not null
        primary key,
    PASSWORD VARCHAR2(2000) not null,
    ADDRESS  VARCHAR2(2000) not null,
    PHONE    NUMBER         not null
)
/

INSERT INTO C##PURCHASE_POINT.ADMIN (NAME, EMAIL, PASSWORD, ADDRESS, PHONE) VALUES ('HM nayem', 'hmnayem@gmail.com', 'helloworld', 'Palashi, Ahsanullah hall,Buet', 1773275870);
INSERT INTO C##PURCHASE_POINT.ADMIN (NAME, EMAIL, PASSWORD, ADDRESS, PHONE) VALUES ('Web Developer', 'bdffgb@ygvfdu.isug', 'ereronieg', 'vfgbtbgb', 84983473987);
INSERT INTO C##PURCHASE_POINT.ADMIN (NAME, EMAIL, PASSWORD, ADDRESS, PHONE) VALUES ('67u67u67uj', 'uyjuyjuy', '675577uj juy', '7j7jyufj', 67667766578787);