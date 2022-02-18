window.onload = () => {
    if (!sessionStorage.user) {
        location.replace('/login');
    }
}


const placeOrderBtn = document.querySelector('.place-order-btn')

placeOrderBtn.addEventListener('click', () => {
    if (totalBill == 0) {
        showAlert('Your cart is empty. Please add some products to cart to place order!')
    } else {
        let address = getAddress();
        if (address) {
            fetch('/order', {
                method: 'post',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({
                    email: JSON.parse(sessionStorage.user).email,
                    add: address,
                    total_cost: totalBill
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.alert == 'your order is placed') {
                        delete localStorage.cart;
                        showAlert(data.alert, 'success')
                        setTimeout(() => {
                            location.replace('/');
                        }, 3000)
                    } else {
                        showAlert('Some error occurred! Try again!')
                    }
                })
        }
    }
})

const getAddress = () => {
    //validation
    let address = document.querySelector('#address').value;
    let street = document.querySelector('#street').value;
    let city = document.querySelector('#city').value;
    let state = document.querySelector('#state').value;
    let pincode = document.querySelector('#pincode').value;
    let landmark = document.querySelector('#landmark').value;
    if (!address.length || !street.length || !city.length || !state.length || !pincode.length || !landmark.length) {
        showAlert('Fill all the inputs')
        return false;
    } else {
        return { address, street, city, state, pincode, landmark };
    }
}

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