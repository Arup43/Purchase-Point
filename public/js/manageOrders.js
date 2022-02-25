window.onload = () => {
    if (sessionStorage.admin) {
        admin = JSON.parse(sessionStorage.admin)
        if (compareToken(admin.authToken, admin.email)) {

        } else {
            location.replace('/admin-login')
        }
    } else {
        location.replace('/admin-login')
    }
}



const createOrder = (orders) => {
    const ordersElement = document.querySelector('.orders')
    for (let i = 0; i < orders.length; i++) {
        ordersElement.innerHTML += `
        <div class='order'>
        <div class="order-id">Order id: ${orders[i].orderId}</div>
            <div class="customer-email">Customer Email: ${orders[i].email}</div>
            <div class="cost">Total cost: ${orders[i].totalCost}</div>
            <div class="delivery-address">Delivery address: ${orders[i].address}</div>
            <div>City: ${orders[i].city}</div>
            <div>State: ${orders[i].state}</div>
            <div class="delivery-status">Delivery status: ${orders[i].deliveryStatus}</div>
            <div class="payment">Payment: ${orders[i].payment}</div>
            <br>
            <p>Select a delivery sysytem: </p>
            <select name="delivery" class="delivery" style="width: 20%;">
                
            </select> <br>
            <button style="width: 20%;" class="btn btn-outline-success assign-btn">Assign</button><br>
            <button style="width: 20%;" class="btn btn-danger" onclick="cancelOrder('${orders[i].orderId}', '${orders[i].email}')">Cancel order</button>
            </div>
            `
    }
    const assignBtn = document.querySelectorAll('.assign-btn')
    assignBtn.forEach((item, i) => {
        item.addEventListener('click', () => {
            let selectedOption = item.previousElementSibling.previousElementSibling;
            console.log(selectedOption.value, orders[i].orderId);
            fetch('/assignOrderToDelivery', {
                method: 'post',
                headers: new Headers({ 'Content-type': 'application/json' }),
                body: JSON.stringify({
                    orderId: orders[i].orderId,
                    delivery: selectedOption.value
                })
            }).then(res => res.json())
                .then(response => {
                    if (response == 'success') {
                        showAlert('Order assigned to delivery System successfully!', 'success')
                        setTimeout(() => {
                            location.reload()
                        }, 2000)
                    }
                })
        })
    })
}



const cancelOrder = (orderId, email) => {
    console.log(orderId, email);
    fetch('/cancelOrder', {
        method: 'post',
        headers: new Headers({ 'Content-type': 'application/json' }),
        body: JSON.stringify({
            orderId,
            email
        })
    }).then(res => res.json())
        .then(response => {
            if (response == 'success') {
                showAlert('Order cancelled successfully!', 'success')
                setTimeout(() => {
                    location.reload();
                }, 2000)
            }
        })
}

fetch('/get-orders', {
    method: 'post',
    headers: new Headers({ 'Content-type': 'application/json' })
}).then(res => res.json())
    .then(response => {
        createOrder(response)
        fetch('/getDeliverySystem', {
            method: 'post',
            headers: new Headers({ 'Content-type': 'application/json' })
        }).then(res => res.json())
            .then(response => {
                let delivery = document.querySelectorAll('.delivery')
                for (let i = 0; i < response.length; i++) {
                    for (let j = 0; j < delivery.length; j++) {
                        delivery[j].innerHTML += `<option value="${response[i].name}">${response[i].name}</option>`
                    }
                }
            })

    })



const showAlert = (msg, type) => {
    let alertBox = document.querySelector('.alert-box')
    let alertMsg = document.querySelector('.alert-msg')
    let alertImg = document.querySelector('.alert-img')
    alertMsg.innerHTML = msg;

    if (type == 'success') {
        alertImg.src = `img/success.png`;
        alertMsg.style.color = `0ab50a`
    } else {
        alertImg.src = `img/error.png`
        alertMsg.style.color = null;
    }

    alertBox.classList.add('show')
    setTimeout(() => {
        alertBox.classList.remove('show')
    }, 3000)
}