//create small product cards
const createSmallCards = (data) => {
    return `
    <div class="sm-product">
        <p class="product-id hidden">${data.productId}</p>
        <img src="${data.image}" class="sm-product-img" alt="">
        <div class="sm-text">
            <p class="sm-product-name">${data.name}</p>
            <p class="sm-des">${data.shortDes}</p>
        </div>
        <div class="item-counter">
            <button class="counter-btn decrement">-</button>
            <p class="item-count">${data.item}</p>
            <button class="counter-btn increment">+</button>
        </div>
        <p class="sm-price" data-price=${data.sellPrice}>$${data.sellPrice * data.item}</p>
        <button class="sm-delete-btn"><i class="fa-solid fa-xmark"></i></button>
    </div>  
    `
}

let totalBill = 0;

const setProducts = (name) => {
    const element = document.querySelector(`.${name}`)

    if (name === 'cart') {
        let user = JSON.parse(sessionStorage.getItem("user"))

        fetch('/getCartOrWishlistProducts', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                type: 'cart',
                email: user.email
            })
        }).then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    element.innerHTML = `<img src="https://i0.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?resize=603%2C288&ssl=1" class="empty-img" alt="">`
                } else {
                    for (let i = 0; i < data.length; i++) {
                        element.innerHTML += createSmallCards(data[i])
                        totalBill += Number(data[i].sellPrice * data[i].item)
                        updateBill()
                    }
                }
                setupEvents(name);
            })
    } else {
        let user = JSON.parse(sessionStorage.getItem("user"))
        fetch('/getCartOrWishlistProducts', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                type: 'wishlist',
                email: user.email
            })
        }).then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    element.innerHTML = `<img src="https://i0.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?resize=603%2C288&ssl=1" class="empty-img" alt="">`
                } else {
                    for (let i = 0; i < data.length; i++) {
                        element.innerHTML += createSmallCards(data[i])
                        updateBill()
                    }
                }
                setupEvents(name);
            })
    }

    // let data = JSON.parse(localStorage.getItem(name))
    // if (data == null) {
    //     element.innerHTML = `
    //     <img src="https://i0.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?resize=603%2C288&ssl=1" class="empty-img" alt="">`
    // } else {
    //     for (let i = 0; i < data.length; i++) {
    //         element.innerHTML += createSmallCards(data[i])
    //         if (name == 'cart') {
    //             totalBill += Number(data[i].sellPrice * data[i].item)
    //         }
    //         updateBill()
    //     }
    // }
}

const updateBill = () => {
    let billPrice = document.querySelector('.bill')
    billPrice.innerHTML = `$${totalBill}`
}

const setupEvents = (name) => {
    //setup counter event
    const counterMinus = document.querySelectorAll(`.${name} .decrement`)
    const counterPlus = document.querySelectorAll(`.${name} .increment`)
    const counts = document.querySelectorAll(`.${name} .item-count`)
    const price = document.querySelectorAll(`.${name} .sm-price`)
    const deleteBtn = document.querySelectorAll(`.${name} .sm-delete-btn`)
    let productIdElements = document.querySelectorAll(`.${name} .product-id`)
    let user = JSON.parse(sessionStorage.getItem("user"))


    counts.forEach((item, i) => {
        let cost = Number(price[i].getAttribute('data-price'))

        counterMinus[i].addEventListener('click', () => {
            if (Number(item.innerHTML) > 1) {
                item.innerHTML--;

                price[i].innerHTML = `$${item.innerHTML * cost}`
                if (name == 'cart') {
                    totalBill -= cost;
                    updateBill()
                }
                fetch('/updateCartOrWishlist', {
                    method: 'put',
                    headers: new Headers({ 'Content-Type': 'application/json' }),
                    body: JSON.stringify({
                        type: name,
                        email: user.email,
                        productId: productIdElements[i].innerHTML,
                        item: Number(item.innerHTML)
                    })
                }).then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
                // product[i].item = item.innerHTML;
                // localStorage.setItem(name, JSON.stringify(product))
            }
        })

        counterPlus[i].addEventListener('click', () => {
            if (Number(item.innerHTML) < 9) {
                item.innerHTML++;

                price[i].innerHTML = `$${item.innerHTML * cost}`
                if (name == 'cart') {
                    totalBill += cost;
                    updateBill()
                }
                fetch('/updateCartOrWishlist', {
                    method: 'put',
                    headers: new Headers({ 'Content-Type': 'application/json' }),
                    body: JSON.stringify({
                        type: name,
                        email: user.email,
                        productId: productIdElements[i].innerHTML,
                        item: Number(item.innerHTML)
                    })
                }).then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
            }
        })
    })

    deleteBtn.forEach((item, i) => {
        item.addEventListener('click', () => {
            productId = productIdElements[i].innerHTML;
            fetch('/deleteFromCartOrWishlist', {
                method: 'delete',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({
                    type: name,
                    email: user.email,
                    productId: productId
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    location.reload();
                })
        })
    })
}

setProducts('cart')
setProducts('wishlist')
