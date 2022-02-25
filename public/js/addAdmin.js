
window.onload = () => {
    if (sessionStorage.admin) {
        admin = JSON.parse(sessionStorage.admin)
        if (compareToken(admin.authToken, admin.email)) {

        } else {
            location.replace('/admin-login')
        }
    } else {
        location.replace('/admin-login')
    }
}

const loader = document.querySelector('.loader')

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
    if (data == 'success') {
        showAlert('Admin added successfully!', 'success')
        setTimeout(() => {
            location.replace('/admin');
        }, 3000)
    } else {
        showAlert('Some error occurred! Please try again!')
    }
}


const submitBtn = document.querySelector('.submit-btn')
const name = document.querySelector('#name')
const address = document.querySelector('#address')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const phone = document.querySelector('#phone')

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (name.value.length < 3) {
        showAlert('Name must be 3 letters long')
    } else if (!email.value.length) {
        showAlert('Enter email')
    } else if (password.value.length < 8) {
        showAlert('password should be at least 8 letters long')
    } else if (!Number(phone.value) || phone.value.length < 10) {
        showAlert('Invalid number, please enter valid one')
    } else if (address.value.length < 0) {
        showAlert('Enter address')
    } else {
        // submit the form
        loader.style.display = 'block';
        sendData('/addAdmin', {
            name: name.value,
            email: email.value,
            password: password.value,
            phone: phone.value,
            address: address.value
        })
    }
})