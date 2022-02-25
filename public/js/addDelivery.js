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

window.onload = () => {
    if(sessionStorage.admin){
        admin = JSON.parse(sessionStorage.admin)
        if(compareToken(admin.authToken, admin.email)){
            
        } else{
            location.replace('/admin-login')
        }
    } else{
        location.replace('/admin-login')
    }
}


const name = document.querySelector('#name')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const password = document.querySelector('#password')
const area = document.querySelector('#area')

const submitBtn = document.querySelector('.submit-btn')

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(!name.value || !email.value || !phone.value || !password.value || !area.value){
        showAlert('Please enter all the fields')
    } else{
        fetch('/add-delivery', {
            method: 'post',
            headers: new Headers({ 'Content-type': 'application/json' }),
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                phone: phone.value,
                password: password.value,
                area: area.value
            })
        }).then(res => res.json())
            .then(response => {
                if(response=='success'){
                    showAlert('Delivery system added successfully!', 'success')
                    setTimeout(() => {
                        location.replace('/manage-delivery')
                    }, 2000)
                }
            })
    }
})