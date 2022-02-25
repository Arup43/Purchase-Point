const phone = document.querySelector('#phone')
const pin = document.querySelector('#pin')



const submitBtn = document.querySelector('#submit-btn')
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()

    if(phone.value.length < 10){
        console.log(phone);
        showAlert('Give an accurate bkash number')
    } else if(pin.value.length < 4){
        showAlert('Pin is too short');
    } else{
        showAlert('Your bkash payment successful! You will be redirected to the purchase point website shortly', 'success');
        setTimeout(() => {
            location.replace('/')
        }, 2000);
    }
})

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
