const userImageButton = document.querySelector('#user-img')
const userPop = document.querySelector('.login-logout-popup')
const popuptext = document.querySelector('.account-info')
const actionBtn = document.querySelector('#user-btn')

userImageButton.addEventListener('click', () => {
    userPop.classList.toggle('hide')
})


window.onload = () => {
    if (sessionStorage.admin) {
        admin = JSON.parse(sessionStorage.admin)
        if (compareToken(admin.authToken, admin.email)) {
            let admin = JSON.parse(sessionStorage.admin || null)
            if (admin != null) {
                //means user is logged in
                popuptext.innerHTML = `Log in as, ${admin.name}`
                actionBtn.innerHTML = 'Log out'
                actionBtn.addEventListener('click', () => {
                    sessionStorage.clear()
                    location.reload()
                })
            }
        } else {
            location.replace('/admin-login')
        }
    } else {
        location.replace('/admin-login')
    }
}


const newOrder = document.querySelector("#new-orders-num")
const customers = document.querySelector('#customers-num')
const products = document.querySelector('#products-num')
const sellers = document.querySelector('#sellers-num')
fetch('/new-order', {
    method: 'post',
    headers: new Headers({ 'Content-type': 'application/json' }),
}).then(res => res.json())
    .then(data => {
        newOrder.innerHTML = data;
    })



fetch('/customer-num', {
    method: 'post',
    headers: new Headers({ 'Content-type': 'application/json' }),
}).then(res => res.json())
    .then(data => {
        console.log(data);
        customers.innerHTML = data;
    })

fetch('/product-num', {
    method: 'post',
    headers: new Headers({ 'Content-type': 'application/json' }),
}).then(res => res.json())
    .then(data => {
        console.log(data);
        products.innerHTML = data;
    })

fetch('/seller-num', {
    method: 'post',
    headers: new Headers({ 'Content-type': 'application/json' }),
}).then(res => res.json())
    .then(data => {
        console.log(data);
        sellers.innerHTML = data;
    })