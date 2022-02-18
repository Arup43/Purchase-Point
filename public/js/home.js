const setupSlidingEffect = () => {
    const productContainer = [...document.querySelectorAll('.product-container')]
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')]
    const preBtn = [...document.querySelectorAll('.pre-btn')]

    productContainer.forEach((item, i) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;

        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })
        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })
    })
}

//fetch product cards
const getProducts = (tags) => {
    return fetch('/get-products', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ tags: tags })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data;
        })
}

//create product slider
const createProductSlider = (data, parent) => {
    let sliderContainer = document.querySelector(`${parent}`)

    sliderContainer.innerHTML += `
    <section class="product">
        <button class="pre-btn"><img src="../img/arrow.png" alt=""></button>
        <button class="nxt-btn"><img src="../img/arrow.png" alt=""></button>
        ${createProductCards(data)}
    </section>
    `

    setupSlidingEffect();
}

const createProductCards = (data, parent) => {
    //here parent is for search product
    let start = `<div class='product-container'>`;
    let middle = '';
    let end = '</div>';

    for (let i = 0; i < data.length; i++) {
        if (data[i].productId != decodeURI(location.pathname.split('/').pop())) {
            middle += `
        <div class="product-card">
            <div class="product-image">
                <span class="discount-tag">${data[i].discount}% off</span>
                <img src="${data[i].images[0]}" class="product-thumb"
                    alt="">
            </div>
            <div class="product-info" onclick="location.href='/products/${data[i].productId}'">
                <h2 class="product-brand">${data[i].name}</h2>
                <p class="product-short-des">${data[i].shortDes}</p>
                <span class="price">$${data[i].sellPrice} <span class="actual-price">$${data[i].actualPrice}</span> </span>
            </div>
        </div>
        `
        }
    }

    if (parent) {
        let cardContainer = document.querySelector(parent)
        cardContainer.innerHTML = start + middle + end;
    } else {
        return start + middle + end;
    }
}