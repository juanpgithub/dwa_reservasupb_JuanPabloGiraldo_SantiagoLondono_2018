
window.onload = init;

function init() {
    inicializarVariables();
    inicializarFunciones();
}

var config, crearCuenta, iniciarSesion, seccionRegistro, seccionLogin, formLogin, formRegister, usuario;

function inicializarVariables() {
    var config = {
        apiKey: "AIzaSyAki17Jt5KtqZD0qVRTe3E4-SYrq8IUOEA",
        authDomain: "reservasupb.firebaseapp.com",
        databaseURL: "https://reservasupb.firebaseio.com",
        projectId: "reservasupb",
        storageBucket: "reservasupb.appspot.com",
        messagingSenderId: "608631006074"
      };
    crearCuenta = document.getElementById("crearCuenta");
    iniciarSesion = document.getElementById("iniciarSesion");
    seccionRegistro = document.getElementById("registerCont");
    seccionLogin = document.getElementById("loginCont");
    formLogin = document.getElementById("frmLogin");
    formRegister = document.getElementById("frmRegister");
}

function inicializarFunciones() {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    crearCuenta.addEventListener("click", registrarCuenta);
    iniciarSesion.addEventListener("click", loginUsuario);
    formLogin.addEventListener("submit", logearUsuario);
    formRegister.addEventListener("submit", crearUsuario)
}

function logearUsuario() {
    let inputEmail = document.getElementById("emailLogin");
    let inputPassword = document.getElementById("passwordLogin");
    if (inputEmail.value != "" && inputPassword.value != "") {
        firebase.auth().signInWithEmailAndPassword(inputEmail.value, inputPassword.value).then(function (user) {
            if(user.emailVerified){
                usuario = user;
                alert("Usuario ingresado: "+user.email);
                formLogin.reset();
            }else{
                firebase.auth().signOut().then(function() {
                    alert("Correo electronico no verificado");
                  }).catch(function(error) {
                    // An error happened.
                  });
            }
        },function(error){
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ...
        });
    }
     return false;
}

function crearUsuario() {
    let inputEmail = document.getElementById("emailRegistro");
    let inputPassword = document.getElementById("passwordRegistro");
    if (inputEmail.value != "" && inputPassword.value != "") {
        firebase.auth().createUserWithEmailAndPassword(inputEmail.value, inputPassword.value).then(function (user) {
            var user = firebase.auth().currentUser;
            user.sendEmailVerification().then(function() {
                alert("Correo de verificación enviado");
                loginUsuario();
              }).catch(function(error) {
                // An error happened.
                alert("No se envió el correo de verificación");
              });
        },function(error){
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ...
        });
    }
    return false;
}

function registrarCuenta() {
    seccionRegistro.className = "userAuth";
    formLogin.reset();
    seccionLogin.className = "userAuth hidden";
}

function loginUsuario() {
    seccionLogin.className = "userAuth";
    formRegister.reset();
    seccionRegistro.className = "userAuth hidden";
}