let inputName = document.getElementById('inputName');
let inputSignUpEmail = document.getElementById('inputSignUpEmail');
let inputSignUpPassword = document.getElementById('inputSignUpPassword');
let alertSignUp = document.getElementById('alertSignup');
let btnSignUp = document.getElementById('signUp');
let goToLogin = document.getElementById('goToLogin');


//** Go To Login Page
goToLogin.addEventListener('click', function () {
    window.location.href = './index.html';
})


let usersList = [];
// Check If LocalStorage isNotEmpty
if (localStorage.getItem('userInfo') !== null) {
    usersList = JSON.parse(localStorage.getItem('userInfo'));
}

//** Validate User Name 
inputName.addEventListener('input', function () {
    validation(this);
});

//** Validate Email
inputSignUpEmail.addEventListener('input', function (e) {
    validation(this);
});

//** Validate Password
inputSignUpPassword.addEventListener('input', function (e) {
    validation(e.target);
});

//** Add New User (Sign Up)
btnSignUp.addEventListener('click', function () {
    if (validation(inputName) && validation(inputSignUpEmail) && validation(inputSignUpPassword)) {
        createUser();
    }
})



//**** Create User 
function createUser() {
    let obj = {
        name: inputName.value,
        email: inputSignUpEmail.value,
        password: inputSignUpPassword.value,
    };
    if (obj.name.length != 0 && obj.email.length != 0 && obj.password.length != 0) {
        // Check Email Is Sign Up Already Or Not 
        let emailExist = usersList.some(user => (user.email === inputSignUpEmail.value));
        if (emailExist) {
            showAlert('warning', 'This email already signup');
            return;
        }
        usersList.push(obj);
        localStorage.setItem('userInfo', JSON.stringify(usersList));
        clearForm();
        showAlert('success', 'Success Sign Up');
    } else {
        showAlert('danger', 'Please enter your Name, Email and Password');
    }
}

function showAlert(type, message) {


    alertSignUp.className = `alert alert-${type} d-block`;
    alertSignUp.style.color = type === 'success' ? '#15682c' : '#721c24';
    alertSignUp.innerHTML = message;

    setTimeout(() => {
        alertSignUp.classList.replace('d-block', 'd-none'); //** Hide Alert Automatic After 4.5s **/
    }, 5000);

}

function validation(ele) {
    let Regex = {
        inputName: /^(?=.{3,20}$)[a-zA-Z0-9._]+(?<![_.])$/g,
        inputSignUpEmail: /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/g,
        inputSignUpPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
    };

    if (Regex[ele.id].test(ele.value)) {
        ele.classList.add('is-valid');
        ele.classList.remove('is-invalid');
        ele.nextElementSibling.classList.replace('d-block', 'd-none');
        return true;
    } else {
        ele.classList.remove('is-valid');
        ele.classList.add('is-invalid');
        ele.nextElementSibling.classList.replace('d-none', 'd-block');
        return false;
    }



}
function clearForm() {
    inputName.value = null;
    inputSignUpEmail.value = null;
    inputSignUpPassword.value = null;
}


