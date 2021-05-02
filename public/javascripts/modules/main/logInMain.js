import request from '../functions/request.js';

var createUser = false;

document.getElementById('btnSubmit').addEventListener('click', function() {
    
    var emailInput = document.getElementById('emailInput');
    var passwordInput = document.getElementById('passwordInput');
    var user = {Email: emailInput.value, Password: passwordInput.value};

    if (createUser == true) {
        
        var confirmPasswordInput = document.getElementById('confirmPasswordInput');

        if(passwordInput.value == confirmPasswordInput.value) {

            request('/request/users', 'POST', JSON.stringify(user), function(result) {
                console.log(result);
            });

        } else {
            document.getElementById('error').innerHTML = "Passwords not matching";
            document.getElementById('error').className = 'visible';
        }
    } else {
        request('/request/login', 'POST', JSON.stringify(user), function(result) {
            console.log(result);
        });
    }
    
});

document.getElementById('switchLogInForm').addEventListener('click', function() {
    if (document.getElementById('confirmPasswordInput').className == 'hidden') {
        document.getElementById('confirmPasswordInput').className = 'visible';
        document.getElementById('pConfirmPassword').className = 'visible';
        document.getElementById('switchLogInForm').innerHTML = 'Already have an account?';
        document.getElementById('btnSubmit').innerHTML = 'Sign Up';
        createUser = true;
    } else {
        document.getElementById('confirmPasswordInput').className = 'hidden';
        document.getElementById('pConfirmPassword').className = 'hidden';
        document.getElementById('switchLogInForm').innerHTML = "Don't have an account?";
        document.getElementById('btnSubmit').innerHTML = 'Log In';
        createUser = false;
    }
    
});