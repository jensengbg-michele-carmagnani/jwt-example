const buttonElem = document.querySelector('#submit');
const inputUser = document.querySelector('#username');
const inputPass = document.querySelector('#pass');

const lengthElem = document.querySelector('.length');
const lowercaseElem = document.querySelector('.lowercase');
const uppercaseElem = document.querySelector('.uppercase');
const numeberElem = document.querySelector('.number');
const specialCharacterElem = document.querySelector('.specialCharacter');



function saveToken(token) {
    sessionStorage.setItem('auth', token);
}

async function createAccount(username, password) {
    const url = 'http://localhost:8000/api/create';
    const body = {
        username: username,
        password: password
    }

    const response = await fetch(url, { 
        method: 'POST', 
        body: JSON.stringify(body), 
        headers: { 'Content-Type': 'application/json' }});
    const data = await response.json();

    if (data.success) {
        location.href = 'http://localhost:8000/loggedin.html';
        saveToken(data.token);
    }
}


function chechValidation(validation){
    console.log('checkValidation',validation);
    if( validation.length 
        &&validation.lowercase 
        && validation.uppercase
        && validation.number
        && validation.specialCharacter){
            return true;
        } else {
            return false;
        }
}

function validate(password){
    console.log('Password to validate: ', password);
    console.log('-------------------------');
    let validation = {
        length : false,
        lowercase : false,
        uppercase : false,
        number : false,
        specialCharacter: false
        
    }
    if (password.length >= 8) {
        console.log('Has length of at least 8 characters');
        validation.length = true;
        lengthElem.innerHTML = 'Längd: check!';
    }

    let lowercaseRegex = /[a-z]/;
    if(password.match(lowercaseRegex)){
        console.log('Has lowercase' );
        validation.lowercase = true;
        lowercaseElem.innerHTML = 'Has lowercase ';
        }
    let uppercaseRegex = /[A-Z]/;
    if (password.match(uppercaseRegex)){
        console.log('Has uppercase' );
        validation.uppercase = true;
        uppercaseElem.innerHTML = 'Has uppercase';
    }

    let numberRegex = /[0-9]/;
    if (password.match(numberRegex)){
        console.log('Has number' );
        validation.number = true;
        numeberElem.innerHTML = 'Has number ';
    }
    
    let specialCharacterRegex =/\W/;
    if (password.match(specialCharacterRegex)){
        console.log('Has special Character' );
        validation.specialCharacter = true;
        specialCharacterElem.innerHTML = 'Has Special Character';
    };
    return validation
}

inputPass.addEventListener('keyup', () => {
    validate(inputPass.value);
});

buttonElem.addEventListener('click', () => {
    const username = inputUser.value;
    const password = inputPass.value;

    let passwordValidate = validate(password);

    if (chechValidation(passwordValidate)){
        console.log('hello');
        createAccount(username, password);    
    }

    
});