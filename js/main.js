
window.onload = init;

var sec_inicio;
var sec_espacios;

var btsec_inicio;
var btsec_espacios;

function init(){
   inicializarVariables();
   inicializarEventos();
}

function inicializarVariables(){
    sec_inicio = document.getElementById("inicioCont");
    sec_espacios = document.getElementById("espaciosCont");

    btsec_inicio = document.getElementById("btsec_inicio");
    btsec_espacios = document.getElementById("btsec_espacios");
}

function inicializarEventos(){
    btsec_inicio.addEventListener("click",procesarClickInicio);
    btsec_espacios.addEventListener("click",procesarClickEspacios);
}

function procesarClickInicio(evt){
    sec_espacios.className = "hidden";
}

function procesarClickEspacios(evt){
    sec_inicio.className = "hidden";
}