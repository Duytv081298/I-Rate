
function checkInfo() {
    var user = firebase.auth().currentUser;
    setTimeout(function () {user ? window.location.href = "Home.html" : window.location.href = "SignInScreen.html"}, 3000)
}
checkInfo()
