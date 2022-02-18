const getNotification = () => {
    const modalNotification = document.querySelector('#modal-notification')
    modalNotification.innerHTML = `
<div class="modal-dialog">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title">Notifications! Check out now!</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <ul class="notification" id="notification">
            
        </ul>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
</div>
</div>
`
    const notification = document.querySelector('#notification')
    if (!sessionStorage.user) {
        notification.innerHTML = `Login to see notifications!`
    } else {
        fetch('/notification', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                email: JSON.parse(sessionStorage.user).email
            })
        }).then(res => res.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    notification.innerHTML += `
                        <a>
                            <li>${data[i]}</li>
                        </a>
                        `
                }
            })
    }
}

getNotification()