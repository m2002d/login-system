let inputLoginEmail = document.getElementById('inputLoginEmail');
let inputLoginPassword = document.getElementById('inputLoginPassword');
let btnLogin = document.getElementById('login');
let alertLogin = document.getElementById('alertLogin');
let goToSignUp = document.getElementById('goToSignUp');


// Check If LocalStorage isNotEmpty
try {
    usersList = JSON.parse(localStorage.getItem('userInfo')) || [];
} catch (error) {
    console.error("Error parsing userInfo from localStorage:", error);
    usersList = [];
}

goToSignUp.addEventListener('click', function () {
    window.location.href = 'signup.html';
})

btnLogin.addEventListener('click', function () {
    if (inputLoginEmail.value.length != 0 && inputLoginPassword.value.length != 0) {

        //** check if User made sign up first or not 
        let userData = usersList.find(user => user.email === inputLoginEmail.value && user.password === inputLoginPassword.value);

        if (userData) {
            sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
            showAlert('success', 'Login successful');
            window.location.href = './home.html';
        } else {
            showAlert('danger', 'Incorrect Email or Password');
        }
    } else {
        showAlert('danger', 'Please enter your Email and Password');
    }
})




goToSignUp.addEventListener('click', function () {
    window.location = './signup.html';
})


function showAlert(type, message) {
    alertLogin.className = `alert alert-${type} d-block`;
    alertLogin.style.color = type === 'success' ? '#15682c' : '#721c24';
    alertLogin.innerHTML = message;

    setTimeout(() => {
        alertLogin.classList.replace('d-block', 'd-none');
    }, 5000);
}

