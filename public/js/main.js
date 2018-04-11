
window.onload = init;

var seccionInicio;
var seccionEspacios;
var seccionDeportes;
var seccionContacto;
var seccionActual;

var btsec_inicio;
var btsec_espacios;
var btsec_deportes;
var btsec_contacto;
var btsec_login_menu;

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

    seccionInicio = document.getElementById("inicioCont");
    seccionEspacios = document.getElementById("espaciosCont");
    seccionDeportes = document.getElementById("deportesCont");
    seccionContacto = document.getElementById("contactoCont");
    seccionActual = seccionInicio;

    btsec_inicio = document.getElementById("btsec_inicio");
    btsec_espacios = document.getElementById("btsec_espacios");
    btsec_deportes = document.getElementById("btsec_deportes");
    btsec_contacto = document.getElementById("btsec_contacto");
    btsec_login_menu = document.getElementById("btsec_login_menu");
}


function inicializarFunciones() {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    crearCuenta.addEventListener("click", registrarCuenta);
    iniciarSesion.addEventListener("click", loginUsuario);
    formLogin.addEventListener("submit", logearUsuario);
    formRegister.addEventListener("submit", crearUsuario);

    btsec_inicio.addEventListener("click",procesarClickInicio);
    btsec_espacios.addEventListener("click",procesarClickEspacios);
    btsec_deportes.addEventListener("click",procesarClickDeportes);
    btsec_contacto.addEventListener("click",procesarClickContacto);
    btsec_login_menu.addEventListener("click",procesarClickLogin);
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


function procesarClickInicio(evt){
    seccionActual.className = "hidden";
    seccionInicio.className = "";
    seccionActual = seccionInicio;
}

function procesarClickEspacios(evt){
    seccionActual.className = "hidden";
    seccionEspacios.className = "";
    seccionActual = seccionEspacios;
}

function procesarClickDeportes(evt){
    seccionActual.className = "hidden";
    seccionDeportes.className = "";
    seccionActual = seccionDeportes;
}

function procesarClickContacto(evt){
    seccionActual.className = "hidden";
    seccionContacto.className = "";
    seccionActual = seccionContacto;
    // seccionActual.className = "hidden";
    // seccionLogin.className = "";
    // seccionActual = seccionLogin;
}

function procesarClickLogin(evt){
    console.log("entre");
    seccionActual.className = "hidden";
    seccionLogin.className = "userAuth";
    seccionActual = seccionLogin;
}