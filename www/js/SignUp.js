

function handleSignUp() {
    var email = document.getElementById("email_field").value;
    var password = document.getElementById("password_field").value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {goToLogin()})
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
}

function goToLogin() {
    var user = firebase.auth().currentUser;
    if (user) {
        alert("Register successful");
        localStorage.setItem('email', user.email)
        firebase.auth().signOut();
        window.location.href = "SignInScreen.html";
    }
}