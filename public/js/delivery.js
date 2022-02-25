const userImageButton = document.querySelector('#user-img')
const userPop = document.querySelector('.login-logout-popup')
const popuptext = document.querySelector('.account-info')
const actionBtn = document.querySelector('#user-btn')

userImageButton.addEventListener('click', () => {
    userPop.classList.toggle('hide')
})

const ordersElement = document.querySelector('.orders')
window.onload = () => {
    if (sessionStorage.delivery) {
        delivery = JSON.parse(sessionStorage.delivery)
        if (compareToken(delivery.authToken, delivery.email)) {
            let delivery = JSON.parse(sessionStorage.delivery || null)
            if (delivery != null) {
                //means user is logged in
                popuptext.innerHTML = `Log in as, ${delivery.name}`
                actionBtn.innerHTML = 'Log out'
                actionBtn.addEventListener('click', () => {
                    sessionStorage.clear()
                    location.reload()
                })

                setupOrders(delivery.email)
            }
        } else {
            location.replace('/delivery-login')
        }
    } else {
        location.replace('/delivery-login')
    }
}


const setupOrders = (email) => {
    fetch('/getOrderByDeliveryEmail', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
            email
        })
    }).then(res => res.json())
        .then(data => {
            console.log(data)
            insertOrders(data);
        })
}


const insertOrders = (orders) => {
    for (let i = 0; i < orders.length; i++) {
        ordersElement.innerHTML += `
        <div class="order">
            <div class="orderId">Order id: ${orders[i].orderId}</div>
            <div class="totalCost">Total cost: ${orders[i].totalCost}</div>
            <div class="shipping-address">Shipping address: ${orders[i].address}</div>
            <div class="shipping-address">Street: ${orders[i].street}</div>
            <div class="shipping-address">City: ${orders[i].city}</div>
            <div class="delivery-status">Delivery Status: ${orders[i].deliveryStatus}</div>
            <div class="payment">Payment: ${orders[i].payment}</div>
            <button style="width: 15%;" class="delivered-btn" > Delivered? </button>
        </div>
        `
    }

    const deliveryBtn = document.querySelectorAll('.delivered-btn')

    deliveryBtn.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            item.innerHTML = `<div style="color: white; background: green; padding: 0"><i class="fa-solid fa-check"></i> completed delivery!</div>`
            fetch('/updateDeliveryStatus', {
                method: 'post',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({
                    orderId: orders[i].orderId,
                    customerEmail: orders[i].userEmail
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        })
    })
}

