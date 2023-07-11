import { crearOptions } from "./data.js";
import { callApi} from "./resources.js";
import { weatherWatcher } from "./services.js";
import {crearCositas, mapLayer, weatherLayer} from "./resources.js"; 


let contenidoPrincipal = document.querySelector("[contenido-principal]");
let mainContainer = document.querySelector("[main-container]");
let formBlock= document.querySelector("[form-block]");
let codeIso3166 = document.querySelector("[code-iso]");
let cityElement = document.querySelector("[city-element]");
let btnSumbit = document.querySelector("[send-data]");

let bloqueInformacion  = document.createElement("section");

let bloqueClima = document.createElement("section");
let bloqueMapa = document.createElement("section");

let lupita = document.createElement("i");
let peruano = JSON.parse(localStorage.getItem("peruano"));

let map = crearBloqueMapa();
peruanizar(peruano);
crearOptions();
crearElementos();

let value1 = localStorage.getItem("codeIso");
let value2 = localStorage.getItem("city");


if(value1 && value2){
    callApi(value1, value2, peruano, map);
}

formBlock.addEventListener('submit', (event) => {
    event.preventDefault();


    const codeIso = codeIso3166.value;
    const city = cityElement.value;

    weatherWatcher(codeIso, city, map);


});

export function peruanizar(peruano){

    if(peruano){
        mainContainer.classList.add("peruano1");
        mainContainer.classList.remove("mainContainer")

        formBlock.classList.add("peruano2");
        formBlock.classList.remove("formBlock");

        contenidoPrincipal.appendChild(bloqueInformacion);

        btnSumbit.setAttribute("id", "lupita");
        btnSumbit.innerHTML = "";
        btnSumbit.appendChild(lupita);
    }

}

function crearElementos(){
    bloqueInformacion.classList.add("bloqueInformacion");
    bloqueClima.classList.add("bloqueClima");
    bloqueMapa.classList.add("bloqueMapa");
    
    bloqueInformacion.appendChild(bloqueClima);
    bloqueInformacion.appendChild(bloqueMapa);
    
    lupita.classList.add("fa-solid", "fa-magnifying-glass","fa-rotate-90");


    crearCositas(bloqueClima, bloqueMapa);
}

function crearBloqueMapa (){
    let mapa = document.createElement("div");
    mapa.setAttribute("id", "map");

    contenidoPrincipal.appendChild(mapa);

    let map = L.map("map");

    mapLayer(map);
    weatherLayer(map);

    return map;
}