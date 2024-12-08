document.getElementById('logout').addEventListener('click', function () {
    sessionStorage.removeItem('loggedInUser');
});

let user = JSON.parse(sessionStorage.getItem('loggedInUser'));
console.log(user.name);

document.getElementById('homeWelcome').innerHTML = `Welcome ${user.name}`
