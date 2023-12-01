const wrapper = document.querySelector('.wrapper');
const signUpLink = document.querySelector('.signUp-link');
const signInLink = document.querySelector('.signIn-link');

signUpLink.addEventListener('click', () => {
    wrapper.classList.add('animate-signIn');
    wrapper.classList.remove('animate-signUp');
});

signInLink.addEventListener('click', () => {
    wrapper.classList.add('animate-signUp');
    wrapper.classList.remove('animate-signIn');
});

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDH88-4n2R-AuVKT-R0rZiV2-oSIFpxLZE",
    authDomain: "employee-4db87.firebaseapp.com",
    databaseURL: "https://employee-4db87-default-rtdb.firebaseio.com",
    projectId: "employee-4db87",
    storageBucket: "employee-4db87.appspot.com",
    messagingSenderId: "864308202844",
    appId: "1:864308202844:web:ccc570980f62c66d914599"
};

firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Set up our register function
function register() {
    var email = document.querySelector('#signup_email').value;
    var password = document.querySelector('#signup_password').value;
    var username = document.querySelector('#signup_username').value;

    // Validate input fields (add your own validation logic)
    if (email && password && username) {
        auth.createUserWithEmailAndPassword(email, password)
            .then(function (userCredential) {
                var user = userCredential.user;
                var user_data = {
                    email: email,
                    username: username,
                };
                // Create User data in the database
                database.ref('users/' + user.uid).set(user_data);
                alert('User Created!!');
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
    } else {
        alert('Please fill in all the required fields.');
    }
}

// Set up our login function
function login() {
    var email = document.querySelector('#login_email').value;
    var password = document.querySelector('#login_password').value;

    // Validate input fields (add your own validation logic)
    if (email && password) {
        auth.signInWithEmailAndPassword(email, password)
            .then(function (userCredential) {
                alert('User Logged In!!');
                window.location.href = 'dashboard.html';
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
    } else {
        alert('Please fill in all the required fields.');
    }
}


// bar graph
document.addEventListener("DOMContentLoaded", function () {
    // Sample data (weekly targets achieved by employees)
    const employeeData = [80, 95, 60, 75, 90];

    // Chart configuration
    const ctx = document.getElementById('targetChart').getContext('2d');
    const targetChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Employee 1', 'Employee 2', 'Employee 3', 'Employee 4', 'Employee 5'],
            datasets: [{
                label: 'Weekly Target Achievement',
                data: employeeData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
});
