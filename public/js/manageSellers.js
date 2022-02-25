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



const createSeller = (sellers) => {
    const sellersElement = document.querySelector('.sellers')
    for (let i = 0; i < sellers.length; i++) {
        sellersElement.innerHTML += `
        <div class="seller">
        <div>Bsuiness name: ${sellers[i].name}</div>
        <div style="margin-left: 50px;">Email: ${sellers[i].email}</div>
        <div style="margin-left: 50px;">Address: ${sellers[i].address}</div>
        <div style="margin-left: 50px;">Phone: ${sellers[i].phone}</div>
        <div style="margin-left: 50px;">Total Products: ${sellers[i].totalProducts}</div>
        <div style="margin-left: 50px;">Total product price: $${sellers[i].totalPrice}</div>
        <button id="remove-btn" onclick="mailtoCustomer('${sellers[i].email}')" style="margin-left: 50px; cursor: pointer;">Mail to the seller</button>
    </div>
        `
    }
}

const mailtoCustomer = (email) => {
    location.href=`mailto:${email}`;
}

fetch('/getSellers', {
    method: 'post',
    headers: new Headers({ 'Content-type': 'application/json' })
}).then(res => res.json())
    .then(response => {
        createSeller(response)
    })
