const email = document.getElementById("email");
const password = document.getElementById("password");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password2 = document.getElementById("confirm-pass");
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).*$/;

let accounts = JSON.parse(localStorage.getItem('accounts') || '[]');


function signin(event) {
    event.preventDefault();

    console.log("accounts: ");
    console.log(accounts);

    let foundEmail = accounts.find(account => account.email === email.value);

    if(foundEmail){
        document.getElementById("email").classList.add("wrongInfo");
        setTimeout(function() {
            alert("Signup Failed: Email already in use!");
        }, 100);
    }else if(!passwordRegex.test(password.value)){
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
        localStorage.setItem('accounts', JSON.stringify(accounts));

        alert("Signin Successful!")
        window.location.href='./login.html';
    }

    

}

function login(event) {
    event.preventDefault();

    console.log(accounts);

    let foundAccount = accounts.find(account => account.email === email.value && account.password === password.value);

    if (foundAccount) {
        localStorage.setItem('currentUser', JSON.stringify(foundAccount)); // Store the logged-in user
        alert("Login successful!");
        window.location.href = 'account.html';

        document.getElementById("firstName").textContent = foundAccount.firstName;

    } else {
        document.getElementById("email").classList.add("wrongInfo");
        document.getElementById("password").classList.add("wrongInfo");
        setTimeout(function() {
            alert("Login failed: Email not recognized or password incorrect");
        }, 100);
    }

}

