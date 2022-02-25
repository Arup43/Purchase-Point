let loader = document.querySelector('.loader')
let admin = JSON.parse(sessionStorage.admin || null);

const productListingElement = document.querySelector('.product-listing')


window.onload = () => {
    if (admin) {
        if (compareToken(admin.authToken, admin.email)) {
            loader.style.display = 'block'
            setupProducts()
        } else {
            location.replace('/admin-login')
        }
    } else {
        location.replace('/admin-login')
    }
}

const setupProducts = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({manageProducts: true})
    }).then(res => res.json())
    .then(data => {
        loader.style.display = null;
        productListingElement.classList.remove('hide')
        if(data === 'no products'){
            let emptySvg = document.querySelector('.no-product-image')
            emptySvg.classList.remove('hide')
        } else{
            data.forEach(product => createProduct(product));
        }
    })
}
