
window.onload = init;

function init() {
    inicializarVariables();
    inicializarFunciones();
}

var config, crearCuenta, iniciarSesion, seccionRegistro, seccionLogin;

function inicializarVariables() {
    config = {
        apiKey: "AIzaSyAki17Jt5KtqZD0qVRTe3E4-SYrq8IUOEA",
        authDomain: "reservasupb.firebaseapp.com",
        databaseURL: "https://reservasupb.firebaseio.com",
        projectId: "reservasupb",
        storageBucket: "",
        messagingSenderId: "608631006074"
    };
    crearCuenta = document.getElementById("crearCuenta");
    iniciarSesion = document.getElementById("iniciarSesion");
    seccionRegistro = document.getElementById("registerCont");
    seccionLogin = document.getElementById("loginCont");
}

function inicializarFunciones() {
    firebase.initializeApp(config);
    crearCuenta.addEventListener("click",registrarCuenta);
    iniciarSesion.addEventListener("click", loginUsuario);
}

function registrarCuenta() {
    seccionRegistro.className = "userAuth";
    seccionLogin.className = "userAuth hidden";
}

function loginUsuario() {
    seccionLogin.className = "userAuth";
    seccionRegistro.className = "userAuth hidden";
}