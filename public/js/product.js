const productImages = document.querySelectorAll('.product-images img')
const productImageSlide = document.querySelector('.image-slider')

let activeImageSlide = 0

productImages.forEach((item, i) => {
    item.addEventListener('click', () => {
        productImages[activeImageSlide].classList.remove('active')
        item.classList.add('active')
        productImageSlide.style.backgroundImage = `url('${item.src}')`;
        activeImageSlide = i
    })
})


const setData = (data) => {
    let title = document.querySelector('title');
    title.innerHTML += data.name;

    //setup the images
    productImages.forEach((img, i) => {
        if (data.images[i]) {
            img.src = data.images[i];
        } else {
            img.style.display = 'none';
        }
    })
    productImages[0].click();

    //setting up texts 
    const name = document.querySelector('.product-brand')
    const shortDes = document.querySelector('.product-short-des')
    const des = document.querySelector('.des')

    name.innerHTML = data.name;
    shortDes.innerHTML = data.shortDes;
    des.innerHTML = data.des

    //pricing
    const sellPrice = document.querySelector('.product-price')
    const actualPrice = document.querySelector('.product-actual-price')
    const discount = document.querySelector('.product-discount')

    sellPrice.innerHTML = `$${data.sellPrice}`
    actualPrice.innerHTML = `$${data.actualPrice}`
    discount.innerHTML = `( $${data.discount}% off )`

    //wishlist and cart
    const wishlistBtn = document.querySelector('.wishlist-btn')
    wishlistBtn.addEventListener('click', () => {
        let user = JSON.parse(sessionStorage.getItem("user"))
        fetch('/addtocartorwishlist', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                productId: data.productId,
                type: 'wishlist',
                email: user.email
            })
        }).then(res => res.json())
            .then(data => {
                wishlistBtn.innerHTML = data;
            })
    })

    const cartBtn = document.querySelector('.cart-btn')
    cartBtn.addEventListener('click', () => {
        let user = JSON.parse(sessionStorage.getItem("user"))
        fetch('/addtocartorwishlist', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                productId: data.productId,
                type: 'cart',
                email: user.email
            })
        }).then(res => res.json())
            .then(data => {
                cartBtn.innerHTML = data;
            })
    })
}

const fetchProductData = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ productId })
    }).then(res => res.json())
        .then(data => {
            setData(data[0]);
            console.log(data[0].tags)
            getProducts(data[0].tags).then(data => {
                createProductSlider(data, '.container-for-card-slider')
            })
        })
        .catch(err => {
            location.replace('/404');
        })
}

let productId = null
if (location.pathname != '/products') {
    productId = decodeURI(location.pathname.split('/').pop())
    fetchProductData()
}
