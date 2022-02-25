const star1 = document.querySelector('.star1')
const star2 = document.querySelector('.star2')
const star3 = document.querySelector('.star3')
const star4 = document.querySelector('.star4')
const star5 = document.querySelector('.star5')
star1.addEventListener('click', () => {
    star1.classList.add('checked')
    star2.classList.remove('checked')
    star3.classList.remove('checked')
    star4.classList.remove('checked')
    star5.classList.remove('checked')
})
star2.addEventListener('click', () => {
    star1.classList.add('checked')
    star2.classList.add('checked')
    star3.classList.remove('checked')
    star4.classList.remove('checked')
    star5.classList.remove('checked')
})
star3.addEventListener('click', () => {
    star1.classList.add('checked')
    star2.classList.add('checked')
    star3.classList.add('checked')
    star4.classList.remove('checked')
    star5.classList.remove('checked')
})
star4.addEventListener('click', () => {
    star1.classList.add('checked')
    star2.classList.add('checked')
    star3.classList.add('checked')
    star4.classList.add('checked')
    star5.classList.remove('checked')
})
star5.addEventListener('click', () => {
    star1.classList.add('checked')
    star2.classList.add('checked')
    star3.classList.add('checked')
    star4.classList.add('checked')
    star5.classList.add('checked')
})

const showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box')
    let alertMsg = document.querySelector('.alert-msg')
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show')
    setTimeout(() => {
        alertBox.classList.remove('show')
    }, 3000)
}


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
                if (data.warning) {
                    showAlert(data.warning);
                } else {
                    cartBtn.innerHTML = data;
                }

            })
    })


    //setup review
    fetch('/getReviews', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
            productId: data.productId
        })
    }).then(res => res.json())
        .then(data => {
            let productRatingSum = 0;
            let productReviewers = data.length;
            for (let i = 0; i < data.length; i++) {
                productRatingSum += data[i].star;
                //setup customer reviews
                let customerReview = document.querySelector('.others-review')
                customerReview.innerHTML += `
                <div class="customer-review">
                    <h4 style="font-weight: 600;">${data[i].userName}</h4>
                    <p style="font-weight: 600;">Given product rating: <span class="rating">${data[i].star}</span></p>
                    <p>${data[i].reviewText}</p>
                </div>
                `
            }
            let ratingForProduct = document.querySelector('.product-rating')
            if (data.length == 0) {
                ratingForProduct.innerHTML = `0.0`;
            } else {
                let productRating = productRatingSum / productReviewers;
                ratingForProduct.innerHTML = productRating;
            }

        })

    //submit review
    let submitReviewBtn = document.querySelector('.submit-review-btn')
    submitReviewBtn.addEventListener('click', () => {

        //from validation
        const reviewWriting = document.querySelector('#review');

        if (!sessionStorage.user) {
            showAlert('You have to login first to give a review');
        } else if ((!star1.classList.contains('checked') && !star2.classList.contains('checked') && !star3.classList.contains('checked') && !star4.classList.contains('checked') && !star5.classList.contains('checked')) || reviewWriting.value.length == 0) {
            showAlert('You have to give both rating and review to submit a review!')
        } else {
            //check if the user bought the product or not
            fetch('/checkIfTheUserCanGiveReview', {
                method: 'post',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({
                    productId: data.productId,
                    email: JSON.parse(sessionStorage.user).email,
                    star: starRating(),
                    reviewText: reviewWriting.value
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.alert) {
                        showAlert(data.alert);
                    } else {
                        if (data == 'success') {
                            location.reload();
                        }
                    }
                })
        }
    })
}

const starRating = () => {
    if (star1.classList.contains('checked') && star2.classList.contains('checked') && star3.classList.contains('checked') && star4.classList.contains('checked') && star5.classList.contains('checked')) {
        return 5;
    } else if (star1.classList.contains('checked') && star2.classList.contains('checked') && star3.classList.contains('checked') && star4.classList.contains('checked') && !star5.classList.contains('checked')) {
        return 4;
    } else if (star1.classList.contains('checked') && star2.classList.contains('checked') && star3.classList.contains('checked') && !star4.classList.contains('checked') && !star5.classList.contains('checked')) {
        return 3;
    } else if (star1.classList.contains('checked') && star2.classList.contains('checked') && !star3.classList.contains('checked') && !star4.classList.contains('checked') && !star5.classList.contains('checked')) {
        return 2;
    } else {
        return 1;
    }
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
