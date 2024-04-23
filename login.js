const email = document.getElementById("email");
const password = document.getElementById("password");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password2 = document.getElementById("confirm-pass");
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).*$/;

let accounts = [];

function signin(event) {
    event.preventDefault();

    if(!passwordRegex.test(password.value)){
        alert('Password must contain at least one uppercase letter and one special character.');
    }else if(password.value !== password2.value){
        alert("Passwords Don't Match.");
    }else {
        let newAccount = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value
        }

        accounts.push(newAccount);

        alert("Signin Successful!")
        window.location.href='./login.html';
    }

    

}

function login(event) {
    event.preventDefault();
    let isEmail = false;
    let isPassword = false;

    for (let account of accounts) {
        if (account.email === email.value){
            isEmail = true;
            if (account.password === password.value){
                isPassword = true;
                break;
            }
        }
    }

    if (!isEmail || !isPassword) {
        if (!isEmail) {
            document.getElementById("email").classList.add("wrongInfo");
        }
        if (!isPassword) {
            document.getElementById("password").classList.add("wrongInfo");
        }
        setTimeout(function() {
            alert("Login failed: Email not recognized or password incorrect");
        }, 100);
    } else {
        alert("Login successful!");
    }

}