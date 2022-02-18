const createNav = () => {
    let nav = document.querySelector('.nav-container')

    nav.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">
            <img src="../img/purchase-point-logo.png" />
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

            <div class="d-flex search-bar">
                <input type="text" class="form-control me-3 search search-box" placeholder="Search Products"
                    aria-label="Search">
                <button class="btn btn-outline-success search-btn">Search</button>
            </div>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 options">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#" data-bs-toggle="modal"
                        data-bs-target="#modal-notification">Notification <i class="fas fa-bell"></i></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#" data-bs-toggle="modal"
                        data-bs-target="#modal-history">Order history <i class="fa-solid fa-clock-rotate-left"></i></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/cart">Cart <i
                            class="fas fa-shopping-cart"></i></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link">
                        <div id="user-img">
                            Profile 
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="login-logout-popup hide">
                            <p class="account-info">Log in as, name</p>
                            <button class="btn btn-outline-success" id="user-btn">Log out</button>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
<nav class="category">
    <div class="d-flex justify-content-center">
        <div class="btn btn-outline-success category-item">
            <p>Home</p>
        </div>
        <div class="btn btn-outline-success category-item">
            <p>Men</p>
        </div>
        <div class="btn btn-outline-success category-item">
            <p>Women</p>
        </div>
        <div class="btn btn-outline-success category-item">
            <p>Accessories</p>
        </div>
    </div>
</nav>
    `
}

createNav();

//nav popup

const userImageButton = document.querySelector('#user-img')
const userPop = document.querySelector('.login-logout-popup')
const popuptext = document.querySelector('.account-info')
const actionBtn = document.querySelector('#user-btn')

userImageButton.addEventListener('click', () => {
    userPop.classList.toggle('hide')
})

window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null)
    if (user != null) {
        //means user is logged in
        popuptext.innerHTML = `Log in as, ${user.name}`
        actionBtn.innerHTML = 'Log out'
        actionBtn.addEventListener('click', () => {
            sessionStorage.clear()
            location.reload()
        })
    } else {
        popuptext.innerHTML = 'Log in to place order'
        actionBtn.innerHTML = 'Log in'
        actionBtn.addEventListener('click', () => {
            location.href = '/login'
        })
    }
}

//search box
const searchBtn = document.querySelector('.search-btn')
const searchBox = document.querySelector('.search-box')
searchBtn.addEventListener('click', () => {
    if (searchBox.value.length) {
        location.href = `/search/${searchBox.value}`
    }
})
