const queryDB = require("../../dbcnt");

async function test() {
    let email = 'debnatharupbzs@gmail.com'
    let sqlToGetOrder = `SELECT ORDER_ID, TOTAL_COST, ADDRESS, DELIVERY_STATUS FROM ORDERS WHERE EMAIL=:1 ORDER BY "DATE" DESC`
    let result = await queryDB(sqlToGetOrder, [email], false)
    //console.log(result.rows)

    let orderHistory = [];
    for(let i = 0; i<result.rows.length; i++){
        let orderId = result.rows[i][0]
        let totalCost = result.rows[i][1]
        let address = result.rows[i][2]
        let deliveryStatus = result.rows[i][3]

        let order = `Order No: ${orderId}<br>Total Cost: ${totalCost}<br>Products: <br>`

        let sqlToGetOrderProduct = `SELECT O.PRODUCT_ID, P.PRODUCT_NAME, O.ITEM
        FROM ORDER_PRODUCT O JOIN PRODUCTS P on P.PRODUCT_ID = O.PRODUCT_ID
        WHERE O.ORDER_ID=:1`
        let resultForProducts = await queryDB(sqlToGetOrderProduct, [orderId], false)
        for(let j=0; j<resultForProducts.rows.length; j++){
            order += `Product Name: ${resultForProducts.rows[j][1]} Quantity: ${resultForProducts.rows[j][2]}<br>`
        }
        order += `Address: ${address}<br>Delivery status: ${deliveryStatus}`
        orderHistory.push(order)
    }
    console.log(orderHistory)
}

test()