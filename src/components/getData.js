import { changePresentation } from "../script.js";
import { paisesONU } from "./countries.js";
import { mobileOptions } from "./responsive.js";

let actual_layer;
let control = false;

const apiKey = "85b829803b65c076df4ed662788af52f";

export function getWeatherData(country, city, map, change){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric&lang=es`;

    fetch(url)
    .then(data => {
        return data.json()
    })
    .then(dataJson => {
        if(dataJson.cod === '404' || dataJson.cod === '401'){
            alert('País o ciudad equivocada, intente de nuevo por favor.');
        } else{
            changePresentation(change);
            console.log("anachi");
            localStorage.setItem("codeIso", country);
            localStorage.setItem("city", city);
            localStorage.setItem("lat", dataJson.coord.lat);
            localStorage.setItem("lon", dataJson.coord.lon);
            let nombrePais = buscarNombrePais(dataJson.sys.country);
            changePosition(dataJson.coord.lat, dataJson.coord.lon, map, dataJson.name, nombrePais);
            showData(dataJson);
            localStorage.setItem("change", "true");
            console.log(dataJson);
            getMapElection(map);

            if(window.innerWidth <= 768){
                mobileOptions();
            }
        }
    })
    .catch(error => {
        console.error(error);
    });
}

export function showData(data){
    const {main:{temp, feels_like, humidity, temp_max, temp_min}, weather:[arr], sys:{sunrise, sunset}, timezone} = data;
    
    let city_country_name = document.querySelector(".city_country_name");
    let country_name = buscarNombrePais(data.sys.country);
    let img_temp = document.querySelector(".img_temp");
    let actual_temp = document.querySelector(".actual_temp");
    let actual_sensation = document.querySelector(".actual_sensation");
    let max_temp = document.querySelector(".max_temp");
    let min_temp = document.querySelector(".min_temp");
    let humid = document.querySelector(".humidity");
    let sunr = document.querySelector(".sunrise");
    let suns = document.querySelector(".sunset");
    
    city_country_name.innerHTML = data.name +", " + country_name;

    img_temp.src = `https://openweathermap.org/img/wn/${arr.icon}@2x.png`;
    actual_temp.innerHTML = Math.round(temp) + "°c";
    actual_sensation.innerHTML = Math.round(feels_like) + "°c";
    max_temp.innerHTML = Math.round(temp_max) + "°c";
    min_temp.innerHTML = Math.round(temp_min) + "°c";
    humid.innerHTML = humidity + "%";
        
    let salida = convertirUnixAHorasMinutos(sunrise, timezone);
    let puesta = convertirUnixAHorasMinutos(sunset, timezone);
    sunr.innerHTML = salida.HHmm;
    suns.innerHTML = puesta.HHmm;
}


function convertirUnixAHorasMinutos(unixTime, timeZone) {
    let fecha = new Date(unixTime * 1000);
    let offsetMillisegundos = timeZone * 1000;
    let fechaLocal = new Date(fecha.getTime() + offsetMillisegundos);
    let horas = fechaLocal.getHours() + 3;
    let minutos = fechaLocal.getMinutes();
    let horasFormateadas = ("0" + horas).slice(-2);
    let minutosFormateados = ("0" + minutos).slice(-2);
    let soloMinutos = horas*60 + minutos;
    
    let retorno = { min: soloMinutos, HHmm: horasFormateadas + ":" + minutosFormateados };
    return retorno;
}


export function getMapData(map_container){
    map_container.setAttribute("id", "map");

    let map = L.map("map");

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    actual_layer = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
    });

    actual_layer.addTo(map);
    
    return map;
}

function getMapElection(map){
    let map_options = document.querySelectorAll("[map_layer]");
    let layer_names = ["temp_new", "clouds_new", "precipitation_new", "pressure_new", "wind_new"] ;
    let indice_anterior = 0;

    if(!control)
        map_options[indice_anterior].classList.add("actual_layer");
    
    map_options.forEach( (option, index) => {
        option.addEventListener("click", () => {
            if(!option.classList.contains("actual_layer")){

                actual_layer.remove();
                actual_layer = L.tileLayer(`https://tile.openweathermap.org/map/${layer_names[index]}/{z}/{x}/{y}.png?appid=${apiKey}`, {
                });
                actual_layer.addTo(map);

                option.classList.add("actual_layer");
                map_options[indice_anterior].classList.remove("actual_layer");
                indice_anterior = index;
            }
        });
    });

    control = true;
}


let bandera = true;

export function changePosition(lat, long, map, city, country){

    if(!bandera)
        map.flyTo([lat, long], 4);
    else{
        map.setView([lat, long], 4);
        bandera = false;
    }
    
    
    let marcador = L.marker([lat, long]).addTo(map).bindPopup((city + ", " + country));

    marcador.on("dblclick", () => {
        map.flyTo([lat, long], 12);
    })
    
}

export function weatherWatcher(codeIso, city, validation, map){
    if(codeIso === "" || codeIso === null && city === "" && !validation){
        alert("Seleccione un país de la lista o ingreselo correctamente, por favor.");
        localStorage.setItem("validation", "false");
    }else{
        localStorage.setItem("validation", "true");
        localStorage.setItem("change", "true");
        let change = JSON.parse(localStorage.getItem("change"));
        getWeatherData(codeIso, city, map, change);
    }

}

function buscarNombrePais(codigoPais){

    let posicion =  paisesONU.indexOf(codigoPais) - 1;

    return paisesONU[posicion];
}