let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector('.loader')

window.onload = () => {
    if (user) {
        if (!compareToken(user.authToken, user.email)) {
            location.replace('/login')
        } else {

        }
    } else {
        location.replace('/login')
    }
}

//price inputs
const actualPrice = document.querySelector('#actual-price')
const discountPercentage = document.querySelector('#discount')
const sellingPrice = document.querySelector('#sell-price')

discountPercentage.addEventListener('input', () => {
    if (discountPercentage.value > 100) {
        discountPercentage.value = 90
    } else {
        let discount = actualPrice.value * discountPercentage.value / 100;
        sellingPrice.value = actualPrice.value - discount
    }
})

sellingPrice.addEventListener('input', () => {
    let discount = 100 - (sellingPrice.value / actualPrice.value) * 100;
    discountPercentage.value = discount;
})

//upload image handle
let uploadImages = document.querySelectorAll('.fileupload')
let imagePaths = []; // will store all uploaded images

uploadImages.forEach((image, index) => {
    image.addEventListener('change', () => {
        uploadImage(image, index)
    })
})

const uploadImage = (uploadFile, index) => {
    const [file] = uploadFile.files
    if (file && file.type.includes('image')) {
        const formdata = new FormData();
        formdata.append('image', file);

        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
            .then(data => {
                let imagePath = `${location.origin}/${data}`;
                imagePaths[index] = imagePath;
                let label = document.querySelector(`label[for=${uploadFile.id}]`)
                label.style.backgroundImage = `url(${imagePath})`
                let productImage = document.querySelector('.product-image')
                productImage.style.backgroundImage = `url(${imagePath})`
            })
    }
}

//form submission
const productName = document.querySelector('#product-name')
const shortLine = document.querySelector('#short-des')
const des = document.querySelector('#des')

const stock = document.querySelector('#stock')
const tags = document.querySelector('#tags')
const tac = document.querySelector('#tac')

//buttons
const addProductBtn = document.querySelector('#add-btn')


const validateForm = () => {
    if (!productName.value.length) {
        return showAlert('Enter product name')
    } else if (shortLine.value.length > 100 || shortLine.value.length < 10) {
        return showAlert('Short description must be between 10 to 100 letters long')
    } else if (!des.value.length) {
        return showAlert('Enter detail description about the produt')
    } else if (!imagePaths.length) {
        return showAlert('Upload at least one product image')
    } else if (!actualPrice.value.length || !discount.value.length || !sellingPrice.value.length) {
        return showAlert('You have to add pricings')
    } else if (stock.value < 20) {
        return showAlert('You should have 20 items in stock')
    } else if (!tags.value.length) {
        return showAlert('Enter few tags to help ranking your product in the search result')
    } else if (!tac.checked) {
        return showAlert('you must agree to our terms and conditions')
    }
    return true;
}


const productData = () => {
    return data = {
        name: productName.value,
        shortDes: shortLine.value,
        des: des.value,
        images: imagePaths,
        actualPrice: actualPrice.value,
        discount: discountPercentage.value,
        sellPrice: sellingPrice.value,
        stock: stock.value,
        tags: tags.value,
        tac: tac.checked,
        email: user.email
    }
}

addProductBtn.addEventListener('click', () => {
    //validate form 
    if (validateForm()) {
        loader.style.display = 'block';
        let data = productData()
        if (productId) {
            data.productId = productId;
        }
        sendData('/add-product', data);
    }
})

const showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box')
    let alertMsg = document.querySelector('.alert-msg')
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show')
    setTimeout(() => {
        alertBox.classList.remove('show')
    }, 3000)
    return false;
}


//send data function
const sendData = (path, data) => {
    fetch(path, {
        method: 'post',
        headers: new Headers({ 'Content-type': 'application/json' }),
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(response => {
            processData(response)
        })
}

const processData = (data) => {
    loader.style.display = null;
    if (data.alert) {
        showAlert(data.alert)
    } else if (data.name) {
        data.authToken = generateToken(data.email)
        sessionStorage.user = JSON.stringify(data)
        location.replace('/')
    } else if (data.product) {
        location.href = '/seller';
    }
}


const setFormsData = data => {
    productName.value = data.name;
    shortLine.value = data.shortDes;
    des.value = data.des;
    actualPrice.value = data.actualPrice;
    discountPercentage.value = data.discount;
    stock.value = data.stock;
    sellingPrice.value = data.sellPrice;
    tags.value = data.tags;

    //setup images
    data.images.forEach((url, index) => {
        imagePaths[index] = url;
        let label = document.querySelector(`label[for=${uploadImages[index].id}]`)
        label.style.backgroundImage = `url(${url})`
        let productImage = document.querySelector('.product-image')
        productImage.style.backgroundImage = `url(${url})`
    })
}

const fetchProductData = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ email: user.email, productId: productId })
    }).then(res => res.json())
        .then(data => {
            console.log(data[0])
            setFormsData(data[0])
        })
        .catch(err => {
            location.replace('/seller');
            console.log(err);
        })
}

//existing product detail handle
let productId = null;
if (location.pathname != '/add-product') {
    productId = decodeURI(location.pathname.split('/').pop());
    console.log(productId);
    fetchProductData();
}
