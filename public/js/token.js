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