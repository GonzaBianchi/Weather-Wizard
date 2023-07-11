import { callApi } from "./resources.js";

export function weatherWatcher(codeIso, city, map){

    if(codeIso === "default" || city === ""){
        alert("Seleccione un país de la lista, por favor.");
    }else{
        localStorage.setItem("peruano", "true");
        let peruano = JSON.parse(localStorage.getItem("peruano"));
        callApi(codeIso, city, peruano, map);
    }

}