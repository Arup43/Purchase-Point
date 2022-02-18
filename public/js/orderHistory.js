const getHistory = () => {
    const modalNotification = document.querySelector('#modal-history')
    modalNotification.innerHTML = `
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Your order history!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <ul class="notification" id="history">
                
            </ul>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    </div>
</div>
`
    const history = document.querySelector('#history')
    if (!sessionStorage.user) {
        notification.innerHTML = `Login to see your order history!`
    } else {
        fetch('/history', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                email: JSON.parse(sessionStorage.user).email
            })
        }).then(res => res.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    history.innerHTML += `
                        <a>
                            <li>${data[i]}</li>
                        </a>
                        `
                }
            })
    }
}

getHistory()