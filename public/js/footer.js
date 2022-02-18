const createFooter = () => {
    let footer = document.querySelector('footer')
    footer.innerHTML = `
    <div class="container">
        <div class="d-flex">
            <div class="flex-item">
                <h5 class="mb-5">About Us</h5>
                <p>Head Office: 2/3 Dhanmondi, Dhaka-1200</p>
                <p>Hotline: +880173347793</p>
                <p>Email: purchasepoint@gmail.com</p>
            </div>
            <div class="flex-item copyright">
                <p>Copyright &copy; 2022. All rights are reserved.</p>
            </div>
        </div>
    </div>`
}

createFooter()