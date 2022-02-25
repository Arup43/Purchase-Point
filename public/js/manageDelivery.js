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
const addBtn = document.querySelector('.add-delivery')
addBtn.addEventListener('click', ()=> {
    location.replace('/add-delivery')
})


const createDelivery = (deliverySystem) => {
    const deliveryElement = document.querySelector('.delivery-system')
    for (let i = 0; i < deliverySystem.length; i++) {
        deliveryElement.innerHTML += `
        <div class="delivery">
        <div>Delivery system name: ${deliverySystem[i].name}</div>
        <div style="margin-left: 50px;">Email: ${deliverySystem[i].email}</div>
        <div style="margin-left: 50px;">Area: ${deliverySystem[i].area}</div>
        <div style="margin-left: 50px;">Phone: ${deliverySystem[i].phone}</div>
        <button id="remove-btn" class="btn btn-danger" onclick="remove('${deliverySystem[i].email}')" style="margin-left: 50px; cursor: pointer;">Remove Delivery system</button>
    </div>
        `
    }
}

const remove = (email) => {
    fetch('/deleteDelivery', {
        method: 'post',
        headers: new Headers({ 'Content-type': 'application/json' }),
        body: JSON.stringify({
            email
        })
    }).then(res => res.json())
        .then(response => {
            if(response == 'success'){
                showAlert('Delivery system deleted successfully!', 'success')
            }
        })
}

fetch('/getDeliverySystem', {
    method: 'post',
    headers: new Headers({ 'Content-type': 'application/json' })
}).then(res => res.json())
    .then(response => {
        createDelivery(response)
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