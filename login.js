const email = document.getElementById("email");
const password = document.getElementById("password");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password2 = document.getElementById("confirm-pass");
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).*$/;

let accounts = JSON.parse(localStorage.getItem('accounts') || '[]');

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
        localStorage.setItem('accounts', JSON.stringify(accounts));

        alert("Signin Successful!")
        window.location.href='./login.html';
    }

    

}

function login(event) {
    event.preventDefault();
    let accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    let foundAccount = accounts.find(account => account.email === email.value && account.password === password.value);

    if (foundAccount) {
        localStorage.setItem('currentUser', JSON.stringify(foundAccount)); // Store the logged-in user
        alert("Login successful!");
        window.location.href = 'account.html';
    } else {
        document.getElementById("email").classList.add("wrongInfo");
        document.getElementById("password").classList.add("wrongInfo");
        setTimeout(function() {
            alert("Login failed: Email not recognized or password incorrect");
        }, 100);
    }

}

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the accounts from localStorage
    let accounts = JSON.parse(localStorage.getItem('accounts'));

    // Check if there are any accounts saved
    if (accounts && accounts.length > 0) {
        // Assuming you want to display the last account added
        let lastAccount = accounts[accounts.length - 1];

        // Assign the values to HTML elements
        document.getElementById('firstName').textContent = lastAccount.firstName;
        document.getElementById('lastName').textContent = lastAccount.lastName;
        document.getElementById('email').textContent = lastAccount.email;
    } else {
        console.log('No accounts data available');
    }
});