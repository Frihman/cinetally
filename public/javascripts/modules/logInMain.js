document.getElementById('switchLogInForm').addEventListener('click', function() {
    if (document.getElementById('confirmPasswordInput').className == 'hidden') {
        document.getElementById('confirmPasswordInput').className = 'visible';
        document.getElementById('pConfirmPassword').className = 'visible';
        document.getElementById('switchLogInForm').innerHTML = 'Already have an account?';
        document.getElementById('btnSubmit').innerHTML = 'Sign Up';
    } else {
        document.getElementById('confirmPasswordInput').className = 'hidden';
        document.getElementById('pConfirmPassword').className = 'hidden';
        document.getElementById('switchLogInForm').innerHTML = "Don't have an account?";
        document.getElementById('btnSubmit').innerHTML = 'Log In';
    }
    
});