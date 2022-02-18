//importing all the packages
const express = require('express');
const bcrypt = require('bcrypt')
const path = require('path')
const queryDB = require('./dbcnt')
const fileupload = require('express-fileupload')

//declare static path
let staticPath = path.join(__dirname, 'public')

//inintialize
const app = express();

//middlewares
app.use(express.static(staticPath))
app.use(express.json())
app.use(fileupload())

//routes
//home route
app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"))
})

//signup route
app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, 'signup.html'))
})

app.post('/signup', async (req, res) => {
    let { name, email, password, number, tac, seller } = req.body;
    console.log(name, email, password, number, tac);

    //form validation
    if (name.length < 3) {
        return res.json({ 'alert': 'name must be 3 letters long' })
    } else if (!email.length) {
        return res.json({ 'alert': 'enter your email' })
    } else if (password.length < 8) {
        return res.json({ 'alert': 'password should be at least 8 letters long' })
    } else if (!Number(number) || number.length < 10) {
        return res.json({ 'alert': 'invalid number, please enter valid one' })
    } else if (!tac) {
        return res.json({ 'alert': 'you must agree to our terms and conditions' })
    } else {
        //save user in db
        const sql = `SELECT COUNT(*) FROM USERS WHERE EMAIL=:1`
        const result = await queryDB(sql, [email], false)
        if (result.rows[0][0] != 0) {
            return res.json({ 'alert': 'email already exists' });
        } else {
            let sqlToInsertUserIntoDB = `INSERT INTO USERS (NAME, EMAIL, PASSWORD, PHONE_NUMBER, SELLER) VALUES (:1, :2, :3, :4, :5)`
            await queryDB(sqlToInsertUserIntoDB, [name, email, password, number, seller.toString()], true)
            res.json({
                name,
                email,
                password,
                number,
                seller
            })
        }
    }
})

//login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"))
})

app.post('/login', async (req, res) => {
    let { email, password } = req.body
    if (!email.length || !password.length) {
        return res.json({ 'alert': 'Fill all the inputs' })
    }

    let sql = `SELECT COUNT(*) FROM USERS WHERE EMAIL=:1`
    let result = await queryDB(sql, [email], false)
    if (result.rows[0][0] == 0) {
        return res.json({ 'alert': `email doesn't exist` });
    } else {
        sql = `SELECT * FROM USERS WHERE EMAIL=:1`
        result = await queryDB(sql, [email], false)
        console.log(result.rows[0][2]);
        if (result.rows[0][2] === password) {
            return res.json({
                name: result.rows[0][0],
                email: result.rows[0][1],
                seller: result.rows[0][4]
            })
        } else {
            return res.json({ 'alert': 'password is incorrect' })
        }
    }
})

//seller route
app.get('/seller', (req, res) => {
    res.sendFile(path.join(staticPath, 'seller.html'))
})

app.post('/seller', async (req, res) => {
    let { name, about, address, number, tac, legit, email } = req.body;
    if (!name.length || !address.length || !about.length || number.length < 10 || !Number(number)) {
        return res.json({ 'alert': 'some information is invalid' })
    } else if (!tac) {
        return res.json({ 'alert': 'You have to agree to our terms and conditions' })
    } else if (!legit) {
        return res.json({ 'alert': 'You have to put legit information' })
    } else {
        //update users seller status here

        let sqlToUpdateUser = `update USERS
        SET SELLER = :1
        where EMAIL = :2`
        await queryDB(sqlToUpdateUser, ['true', email], true)

        let sqlToInsertSellerIntoDB = `INSERT INTO SELLERS (BUSINESS_NAME, ABOUT, ADDRESS, PHONE_NUMBER, EMAIL) VALUES (:1, :2, :3, :4, :5)`
        await queryDB(sqlToInsertSellerIntoDB, [name, about, address, number, email], true)
        return res.json(true)
    }
})
//add product
app.get('/add-product', (req, res) => {
    res.sendFile(path.join(staticPath, 'addProduct.html'))
})

app.get('/add-product/:id', (req, res) => {
    res.sendFile(path.join(staticPath, 'addProduct.html'))
})



//upload link
app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    //image name
    let imageName = date.getDate() + date.getTime() + file.name;
    //image upload path
    let path = 'public/uploads/' + imageName;

    //create upload
    file.mv(path, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.json(`uploads/${imageName}`)
        }
    })
})


//add-product route
app.post('/add-product', async (req, res) => {
    let { name, shortDes, des, images, actualPrice, discount, sellPrice, stock, tags, tac, email, productId } = req.body;

    //validation
    if (!name.length) {
        return res.json({ 'alert': 'Enter product name' })
    } else if (shortDes.length > 100 || shortDes.length < 10) {
        return res.json({ 'alert': 'Short description must be between 10 to 100 letters long' })
    } else if (!des.length) {
        return res.json({ 'alert': 'Enter detail description about the produt' })
    } else if (!images.length) {
        return res.json({ 'alert': 'Upload at least one product image' })
    } else if (!actualPrice.length || !discount.length || !sellPrice.length) {
        return res.json({ 'alert': 'You have to add pricings' })
    } else if (stock < 20) {
        return res.json({ 'alert': 'You should have 20 items in stock' })
    } else if (!tags.length) {
        return res.json({ 'alert': 'Enter few tags to help ranking your product in the search result' })
    } else if (!tac) {
        return res.json({ 'alert': 'you must agree to our terms and conditions' })
    }

    tags = tags.toLowerCase();
    if (!productId) {
        productId = `${name.toLowerCase()}-${Math.floor(Math.random() * 5000)}`;

        let sqlToInsertProduct = `INSERT INTO PRODUCTS (PRODUCT_ID, PRODUCT_NAME, PRODUCT_DETAILS, ACTUAL_PRICE, DISCOUNT, SELLING_PRICE, STOCK, TAGS, EMAIL, SHORT_DES) VALUES (:1, :2, :3, :4, :5, :6, :7, :8, :9, :10)`
        await queryDB(sqlToInsertProduct, [productId, name, des, actualPrice, discount, sellPrice, stock, tags, email, shortDes], true)

        images.forEach(async (image, index) => {
            let imageId = `${image}-${Math.floor(Math.random() * 5000)}`
            let sqlToIsertImage = `INSERT INTO IMAGES (IMAGE_ID, IMAGE_URL, PRODUCT_ID) VALUES (:1, :2, :3)`
            await queryDB(sqlToIsertImage, [imageId, image, productId], true);
        })

        return res.json({ 'product': name })
    } else {
        let sqlToUpdateProduct = `UPDATE PRODUCTS SET PRODUCT_NAME=:1, PRODUCT_DETAILS=:2, ACTUAL_PRICE=:3, DISCOUNT=:4, SELLING_PRICE=:5, STOCK=:6, TAGS=:7, SHORT_DES=:8 WHERE PRODUCT_ID=:9`
        await queryDB(sqlToUpdateProduct, [name, des, actualPrice, discount, sellPrice, stock, tags, shortDes, productId], true);
        let sqlToDeleteImagesFirst = `DELETE FROM IMAGES WHERE PRODUCT_ID = :1`
        await queryDB(sqlToDeleteImagesFirst, [productId], true);
        images.forEach(async (image, index) => {
            let imageId = `${image}-${Math.floor(Math.random() * 5000)}`
            let sqlToIsertImage = `INSERT INTO IMAGES (IMAGE_ID, IMAGE_URL, PRODUCT_ID) VALUES (:1, :2, :3)`
            await queryDB(sqlToIsertImage, [imageId, image, productId], true);
        })

        return res.json({ 'product': name })
    }
})


//get products
app.post('/get-products', async (req, res) => {
    let { email, productId, tags } = req.body;
    let result;
    if (productId) {
        let sqlToGetProductById = `SELECT * FROM PRODUCTS WHERE PRODUCT_ID = :1`;
        result = await queryDB(sqlToGetProductById, [productId], false);
    } else if (email) {
        let sqlToGetProducts = `SELECT * FROM PRODUCTS WHERE EMAIL = :1`
        result = await queryDB(sqlToGetProducts, [email], false)
    } else if (tags) {
        console.log(tags)
        let tagArr = tags.split(',')
        for (let i = 0; i < tagArr.length; i++) {
            let str = `%${tagArr[i].trim().toLowerCase()}%`
            tagArr[i] = str;
        }
        console.log('Follow This: ', tagArr)
        let sqlToGetProductByTags = `SELECT * FROM PRODUCTS WHERE TAGS LIKE :1`;
        for (let i = 2; i <= tagArr.length; i++) {
            sqlToGetProductByTags += ` OR TAGS LIKE :${i}`;
        }
        console.log(sqlToGetProductByTags)
        result = await queryDB(sqlToGetProductByTags, [...tagArr], false);
        //console.log(result);
    }
    let products = [];
    //console.log(result.rows);
    for (let i = 0; i < result.rows.length; i++) {
        let product = {
            productId: result.rows[i][0],
            name: result.rows[i][1],
            des: result.rows[i][2],
            actualPrice: result.rows[i][3],
            discount: result.rows[i][4],
            sellPrice: result.rows[i][5],
            stock: result.rows[i][6],
            tags: result.rows[i][7],
            shortDes: result.rows[i][9]
        }
        let sqlToGetImage = `SELECT * FROM IMAGES WHERE PRODUCT_ID = :1`
        let resultForImages = await queryDB(sqlToGetImage, [product.productId], false);
        let images = [];
        for (let i = 0; i < resultForImages.rows.length; i++) {
            images.push(resultForImages.rows[i][1])
        }
        product.images = images;
        products.push(product);
    }
    if (products.length === 0) {
        return res.json('no products')
    } else {
        return res.json(products)
    }
})

app.post('/delete-product', async (req, res) => {
    let { productId } = req.body;
    let sqlToDeleteImagesFirst = `DELETE FROM IMAGES WHERE PRODUCT_ID = :1`
    await queryDB(sqlToDeleteImagesFirst, [productId], true);
    let sqlToDeleteProduct = `DELETE FROM PRODUCTS WHERE PRODUCT_ID = :1`
    await queryDB(sqlToDeleteProduct, [productId], true);
    res.json('success')
})

app.get('/products/:id', (req, res) => {
    res.sendFile(path.join(staticPath, 'product.html'))
})

app.get('/search/:key', (req, res) => {
    res.sendFile(path.join(staticPath, 'search.html'))
})

app.get('/cart', (req, res) => {
    res.sendFile(path.join(staticPath, 'cart.html'))
})

app.post('/addtocartorwishlist', async (req, res) => {
    let { productId, type, email } = req.body;
    let date = new Date();
    let actualDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let dateFormat = 'yyyy/mm/dd hh24:mi:ss'
    if (type === 'cart') {
        let sqlToCheckCart = `SELECT * FROM CART WHERE PRODUCT_ID=:1 AND EMAIL=:2`
        let result = await queryDB(sqlToCheckCart, [productId, email], false);
        if (result.rows.length === 0) {
            let sqlToInsertToCart = `INSERT INTO CART VALUES(:1, :2, :3)`
            await queryDB(sqlToInsertToCart, [email, productId, 1], true);

            //notification
            let sqlToGetProductName = `SELECT product_name FROM products WHERE product_id=:1`
            let resultForProductName = await queryDB(sqlToGetProductName, [productId], false);
            let notification_text = `${resultForProductName.rows[0][0]} has been added to your cart!`
            let sqlToInsertIntoNotification = `INSERT INTO NOTIFICATION VALUES (:1, :2, TO_DATE(:3, :4))`
            await queryDB(sqlToInsertIntoNotification, [notification_text, email, actualDate, dateFormat], true);

            return res.json('Added!')
        } else if (result.rows[0][2] === 0) {
            let sqlToModifyCart = `UPDATE CART SET ITEM=1 WHERE PRODUCT_ID=:1 AND EMAIL=:2`
            await queryDB(sqlToModifyCart, [productId, email], true);
            //notification
            let sqlToGetProductName = `SELECT product_name FROM products WHERE product_id=:1`
            let resultForProductName = await queryDB(sqlToGetProductName, [productId], false);
            let notification_text = `${resultForProductName.rows[0][0]} has been added to your cart!`
            let sqlToInsertIntoNotification = `INSERT INTO NOTIFICATION VALUES (:1, :2, TO_DATE(:3, :4))`
            await queryDB(sqlToInsertIntoNotification, [notification_text, email, actualDate, dateFormat], true);

            return res.json('Added!')
        }
        else {
            return res.json('Already added!')
        }
    } else if (type === 'wishlist') {
        let sqlToCheckWishlist = `SELECT * FROM WISHLIST WHERE PRODUCT_ID=:1 AND EMAIL=:2`
        let result = await queryDB(sqlToCheckWishlist, [productId, email], false);
        if (result.rows.length === 0) {
            let sqlToInsertToWishlist = `INSERT INTO WISHLIST VALUES(:1, :2, :3)`
            await queryDB(sqlToInsertToWishlist, [email, productId, 1], true);

            //notification
            let sqlToGetProductName = `SELECT product_name FROM products WHERE product_id=:1`
            let resultForProductName = await queryDB(sqlToGetProductName, [productId], false);
            let notification_text = `${resultForProductName.rows[0][0]} has been added to your wishlist!`
            let sqlToInsertIntoNotification = `INSERT INTO NOTIFICATION VALUES (:1, :2, TO_DATE(:3, :4))`
            await queryDB(sqlToInsertIntoNotification, [notification_text, email, actualDate, dateFormat], true);

            return res.json('Added!')
        } else if (result.rows[0][2] === 0) {
            let sqlToModifyWishlist = `UPDATE WISHLIST SET ITEM=1 WHERE PRODUCT_ID=:1 AND EMAIL=:2`
            await queryDB(sqlToModifyWishlist, [productId, email], true);

            //notification
            let sqlToGetProductName = `SELECT product_name FROM products WHERE product_id=:1`
            let resultForProductName = await queryDB(sqlToGetProductName, [productId], false);
            let notification_text = `${resultForProductName.rows[0][0]} has been added to your wishlist!`
            let sqlToInsertIntoNotification = `INSERT INTO NOTIFICATION VALUES (:1, :2, TO_DATE(:3, :4))`
            await queryDB(sqlToInsertIntoNotification, [notification_text, email, actualDate, dateFormat], true);

            return res.json('Added!')
        }
        else {
            return res.json('Already added!')
        }
    }
})

app.post('/getCartOrWishlistProducts', async (req, res) => {
    let { email, type } = req.body;
    if (type === 'cart') {
        let sql = `SELECT * FROM CART C JOIN PRODUCTS P ON C.PRODUCT_ID = P.PRODUCT_ID
    WHERE C.EMAIL = :1`
        let result = await queryDB(sql, [email], false);
        let products = [];
        for (let i = 0; i < result.rows.length; i++) {
            let product = {
                email: result.rows[i][0],
                productId: result.rows[i][1],
                item: result.rows[i][2],
                name: result.rows[i][4],
                productDetails: result.rows[i][5],
                actualPrice: result.rows[i][6],
                discount: result.rows[i][7],
                sellPrice: result.rows[i][8],
                stock: result.rows[i][9],
                tags: result.rows[i][10],
                email: result.rows[i][11],
                shortDes: result.rows[i][12]
            }
            let sqlToGetImage = `SELECT * FROM IMAGES WHERE PRODUCT_ID = :1`
            let resultForImages = await queryDB(sqlToGetImage, [product.productId], false);
            let images = [];
            for (let i = 0; i < resultForImages.rows.length; i++) {
                images.push(resultForImages.rows[i][1])
            }
            product.image = images[0];
            products.push(product);
        }
        return res.json(products);
    } else if (type === 'wishlist') {
        let sql = `SELECT * FROM WISHLIST W JOIN PRODUCTS P ON W.PRODUCT_ID = P.PRODUCT_ID
    WHERE W.EMAIL = :1`
        let result = await queryDB(sql, [email], false);
        let products = [];
        for (let i = 0; i < result.rows.length; i++) {
            let product = {
                email: result.rows[i][0],
                productId: result.rows[i][1],
                item: result.rows[i][2],
                name: result.rows[i][4],
                productDetails: result.rows[i][5],
                actualPrice: result.rows[i][6],
                discount: result.rows[i][7],
                sellPrice: result.rows[i][8],
                stock: result.rows[i][9],
                tags: result.rows[i][10],
                email: result.rows[i][11],
                shortDes: result.rows[i][12]
            }
            let sqlToGetImage = `SELECT * FROM IMAGES WHERE PRODUCT_ID = :1`
            let resultForImages = await queryDB(sqlToGetImage, [product.productId], false);
            let images = [];
            for (let i = 0; i < resultForImages.rows.length; i++) {
                images.push(resultForImages.rows[i][1])
            }
            product.image = images[0];
            products.push(product);
        }
        return res.json(products);
    }
})

app.put('/updateCartOrWishlist', async(req, res) => {
    let {type, email, productId, item} = req.body;
    console.log(req.body);
    if(type === 'cart'){
        let sql =  `UPDATE CART SET ITEM=:1 WHERE EMAIL=:2 AND PRODUCT_ID=:3`
        await queryDB(sql, [item, email, productId], true);
        return res.json(`updated ${productId}`)
    } else{
        let sql =  `UPDATE WISHLIST SET ITEM=:1 WHERE EMAIL=:2 AND PRODUCT_ID=:3`
        await queryDB(sql, [item, email, productId], true);
        return res.json(`updated ${productId}`)
    }
})

app.delete('/deleteFromCartOrWishlist', async(req, res) => {
    let {type, email, productId} = req.body;
    if(type==='cart'){
        let sql = `DELETE FROM CART WHERE EMAIL=:1 AND PRODUCT_ID=:2`
        await queryDB(sql, [email, productId], true);

        //notification
        let sqlToGetProductName = `SELECT product_name FROM products WHERE product_id=:1`
        let resultForProductName = await queryDB(sqlToGetProductName, [productId], false);
        let notification_text = `${resultForProductName.rows[0][0]} has been removed from your cart!`
        let sqlToInsertIntoNotification = `INSERT INTO NOTIFICATION VALUES (:1, :2)`
        await queryDB(sqlToInsertIntoNotification, [notification_text, email], true)

        return res.json('deleted');
    } else{
        let sql = `DELETE FROM WISHLIST WHERE EMAIL=:1 AND PRODUCT_ID=:2`
        await queryDB(sql, [email, productId], true);

        //notification
        let sqlToGetProductName = `SELECT product_name FROM products WHERE product_id=:1`
        let resultForProductName = await queryDB(sqlToGetProductName, [productId], false);
        let notification_text = `${resultForProductName.rows[0][0]} has been removed from your wishlist!`
        let sqlToInsertIntoNotification = `INSERT INTO NOTIFICATION VALUES (:1, :2)`
        await queryDB(sqlToInsertIntoNotification, [notification_text, email], true)

        return res.json('deleted');
    }
})

app.get('/checkout', (req, res) => {
    res.sendFile(path.join(staticPath, 'checkout.html'))
})

app.post('/order', async(req, res) => {
    const {email, add, total_cost} = req.body;
    let date = new Date()
    //console.log(email, add, total_cost);
    let sqlToInsertIntoOrders = `INSERT INTO ORDERS VALUES (:1, :2, to_date(:3, :4), :5, :6, :7, :8, :9, :10, :11, :12)`
    let orderId = date.toISOString();
    let actualDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let dateFormat = 'yyyy/mm/dd hh24:mi:ss'
    await queryDB(sqlToInsertIntoOrders, [orderId, email, actualDate, dateFormat, total_cost, add.address, add.street, add.city, add.state, add.pincode, add.landmark, 'not delivered'], true)
    
    let sqlToGetCartInfo = `SELECT * FROM CART WHERE EMAIL=:1`
    let result = await queryDB(sqlToGetCartInfo, [email], false)

    let sqlToInsertIntoOrderProduct = `INSERT INTO ORDER_PRODUCT VALUES (:1, :2, :3)`
    for(let i=0; i<result.rows.length; i++){
        await queryDB(sqlToInsertIntoOrderProduct, [orderId, result.rows[i][1], result.rows[i][2]], true);
    }

    let sqlToDeleteFromCart = `DELETE FROM CART WHERE EMAIL=:1`
    await queryDB(sqlToDeleteFromCart, [email], true);

    
    //notification
    let notification_text = `Your order has been successfully placed! Order id: ${orderId}`
    let sqlToInsertIntoNotification = `INSERT INTO NOTIFICATION VALUES (:1, :2, TO_DATE(:3, :4))`
    await queryDB(sqlToInsertIntoNotification, [notification_text, email, actualDate, dateFormat], true)


    return res.json({'alert': 'your order is placed'})
})

app.post('/notification', async(req, res) => {
    let {email} = req.body;
    let sqlToGetNotification = `SELECT NOTIFICATION_TEXT FROM NOTIFICATION WHERE EMAIL=:1 ORDER BY "DATE" DESC`
    let result = await queryDB(sqlToGetNotification, [email], false);
    let notifications = []
    for(let i =0; i< result.rows.length; i++){
        notifications.push(result.rows[i][0])
    }
    return res.json(notifications);
})

app.post('/history', async(req, res) => {
    let {email} = req.body;
    let sqlToGetOrder = `SELECT ORDER_ID, TOTAL_COST, ADDRESS, DELIVERY_STATUS FROM ORDERS WHERE EMAIL=:1 ORDER BY "DATE" DESC`
    let result = await queryDB(sqlToGetOrder, [email], false)

    let orderHistory = [];
    for(let i = 0; i<result.rows.length; i++){
        let orderId = result.rows[i][0]
        let totalCost = result.rows[i][1]
        let address = result.rows[i][2]
        let deliveryStatus = result.rows[i][3]

        let order = `<b>Order No:</b> ${orderId}<br><b>Total Cost:</b> $${totalCost}<br><b>Products: </b><br>`

        let sqlToGetOrderProduct = `SELECT O.PRODUCT_ID, P.PRODUCT_NAME, O.ITEM
        FROM ORDER_PRODUCT O JOIN PRODUCTS P on P.PRODUCT_ID = O.PRODUCT_ID
        WHERE O.ORDER_ID=:1`
        let resultForProducts = await queryDB(sqlToGetOrderProduct, [orderId], false)
        for(let j=0; j<resultForProducts.rows.length; j++){
            order += `<b>Product Name:</b> ${resultForProducts.rows[j][1]} <b>Quantity:</b> ${resultForProducts.rows[j][2]}<br>`
        }
        order += `<b>Address:</b> ${address}<br><b>Delivery status:</b> ${deliveryStatus}`
        orderHistory.push(order)
    }

    return res.json(orderHistory);
})

//404 route
app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath, '404.html'))
})
app.use((req, res) => {
    res.redirect('/404')
})


//server listen
app.listen(8080, () => {
    console.log('listening on port 8080');
})