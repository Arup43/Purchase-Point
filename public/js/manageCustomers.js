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



const createCustomer = (customers) => {
    const customersElement = document.querySelector('.customers')
    for (let i = 0; i < customers.length; i++) {
        customersElement.innerHTML += `
        <div class="customer">
        <div>Name: ${customers[i].name}</div>
        <div style="margin-left: 50px;">Email: ${customers[i].email}</div>
        <div style="margin-left: 50px;">Total order: ${customers[i].totalOrder}</div>
        <div style="margin-left: 50px;">Total spent:$${customers[i].totalSpent}</div>
        <div style="margin-left: 50px;">Seller: ${customers[i].seller === 'true' ? 'yes' : 'no'}</div>
        <button id="remove-btn" onclick="mailtoCustomer('${customers[i].email}')" style="margin-left: 50px; cursor: pointer;">Mail to the customer</button>
    </div>
        `
    }
}

const mailtoCustomer = (email) => {
    location.href=`mailto:${email}`;
}

fetch('/getCustomers', {
    method: 'post',
    headers: new Headers({ 'Content-type': 'application/json' })
}).then(res => res.json())
    .then(response => {
        createCustomer(response)
    })
