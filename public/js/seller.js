let loader = document.querySelector('.loader')
let user = JSON.parse(sessionStorage.user || null);
const becomeSellerElement = document.querySelector('.become-seller')
const applyForm = document.querySelector('.apply-form')
const showApplyFormBtn = document.querySelector('#apply-btn')

const productListingElement = document.querySelector('.product-listing')

window.onload = () => {
    if (user) {
        if (compareToken(user.authToken, user.email)) {
            if (!user.seller) {
                becomeSellerElement.classList.remove('hide')
            } else{
                loader.style.display = 'block'
                setupProducts()
            }
        } else {
            location.replace('/login')
        }
    } else {
        location.replace('/login')
    }
}

showApplyFormBtn.addEventListener('click', () => {
    becomeSellerElement.classList.add('hide')
    applyForm.classList.remove('hide')
})

//form submission
const applyFormButton = document.querySelector("#apply-form-btn")
const businessName = document.querySelector('#business-name')
const address = document.querySelector('#business-add')
const about = document.querySelector('#about')
const number = document.querySelector('#number')
const tac = document.querySelector('#terms-and-cond')
const legitInfo = document.querySelector('#legitInfo')

applyFormButton.addEventListener('click', () => {
    if (!businessName.value.length || !address.value.length || !about.value.length || !number.value.length) {
        showAlert('Fill all the inputs')
    } else if (!tac.checked) {
        showAlert('You have to agree to our terms and conditions')
    } else if (!legitInfo.checked) {
        showAlert('You have to put legit Information')
    } else {
        //making server req
        loader.style.display = 'block'
        sendData('/seller', {
            name: businessName.value,
            address: address.value,
            about: about.value,
            number: number.value,
            tac: tac.checked,
            legit: legitInfo.checked,
            email: JSON.parse(sessionStorage.user).email
        })
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
    } else if (data === true) {
        let user = JSON.parse(sessionStorage.user)
        user.seller = true
        sessionStorage.user = JSON.stringify(user)
        location.reload();
    }
}


const setupProducts = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({email: user.email})
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
