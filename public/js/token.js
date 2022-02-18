let char = `123abcde.fmnopqlABCDE@FJKLMNOPQRSTUVWXYZ456789stuvwxyz0!#$%&ijkrgh'*+-/=?^_${'`'}{|}~`;

const generateToken = (key) => {
    let token = '';
    for(let i = 0; i <key.length; i++){
        let index = char.indexOf(key[i] || char.length / 2);
        let randomIndex = Math.floor(Math.random() * index);
        token += char[randomIndex] + char[index - randomIndex];
    }

    return token
}

const compareToken = (token, key) => {
    let str = ''
    for(let i = 0; i < token.length; i+=2){
        let index1 = char.indexOf(token[i])
        let index2 = char.indexOf(token[i+1])
        str += char[index1 + index2];
    }

    if(str === key){
        return true
    }
    return false
}


//common functions

// const showAlert = (msg) => {
//     let alertBox = document.querySelector('.alert-box')
//     let alertMsg = document.querySelector('.alert-msg')
//     alertMsg.innerHTML = msg;
//     alertBox.classList.add('show')
//     setTimeout(() => {
//         alertBox.classList.remove('show')
//     }, 3000)
// }

// //send data function
// const sendData = (path, data) => {
//     fetch(path, {
//         method: 'post',
//         headers: new Headers({'Content-type': 'application/json'}),
//         body: JSON.stringify(data)
//     }).then(res => res.json())
//     .then(response => {
//         processData(response)
//     })
// }

// const processData = (data) => {
//     loader.style.display = null;
//     if(data.alert){
//         showAlert(data.alert)
//     } else{
//         data.authToken = generateToken(data.email)
//         sessionStorage.user = JSON.stringify(data)
//         location.replace('/')
//     }
// }