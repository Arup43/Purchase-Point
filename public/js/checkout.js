window.onload = () => {
    if (!sessionStorage.user) {
        location.replace('/login');
    }
}


const placeOrderBtn = document.querySelector('.place-order-btn')
let payment = document.querySelector('#payment').value;

document.querySelector('#payment').addEventListener('change', () => {
    
    payment = document.querySelector('#payment').value;
    console.log(payment);
})
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
                    total_cost: totalBill,
                    payment: payment
                })
            }).then(res => res.json())
                .then(data => {
                    if(data.payment == 'bkash'){
                        location.replace('/bkash-gateway');
                    } else if (data.alert == 'your order is placed' && data.payment == 'cash-on-delivery') {
                        showAlert(data.alert, 'success')
                        setTimeout(() => {
                            location.replace('/');
                        }, 3000)
                    }else if(data.warning){
                        showAlert(data.warning)
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

