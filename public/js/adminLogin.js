window.onload = () => {
    if(sessionStorage.admin){
        admin = JSON.parse(sessionStorage.admin)
        if(compareToken(admin.authToken, admin.email)){
            location.replace('/')
        }
    } else if(sessionStorage.user){
        sessionStorage.clear();
    }
}

const loader = document.querySelector('.loader')

const submitBtn = document.querySelector('.submit-btn')
const email = document.querySelector('#email')
const password = document.querySelector('#password')

submitBtn.addEventListener('click', () => {
    if(!email.value.length || !password.value.length){
        showAlert('Fill all the inputs')
    } else{
        loader.style.display = 'block';
        sendData('/admin-login', {
            email: email.value,
            password: password.value
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
        headers: new Headers({'Content-type': 'application/json'}),
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(response => {
        processData(response)
    })
}

const processData = (data) => {
    loader.style.display = null;
    if(data.alert){
        showAlert(data.alert)
    } else if(data.name){
        data.authToken = generateToken(data.email)
        sessionStorage.admin = JSON.stringify(data)
        location.replace('/admin')
    } else{
        
    }
}