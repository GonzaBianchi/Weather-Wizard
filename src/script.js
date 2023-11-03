import { createLI } from "./components/countries.js";
import { getMapData, weatherWatcher } from "./components/getData.js";
import { crearCositas } from "./components/createWeatherDivs.js";
import { createBar } from "./components/responsive.js"

let input_country = document.querySelector("[input_country]");
let input_city = document.querySelector("[input_city]");
let form_block = document.querySelector("[main_container-form]");
let header_section = document.querySelector("[main_container]");
let main = document.querySelector("[main_content]");
let countryUl = document.querySelector(".main_container_form_inputs-ul");
let button = document.querySelector(".main_container_form-button");

let weather_map_select = document.createElement("div");
let weather_data = document.createElement("div");
let map_data = document.createElement("div");

let weather_map_section = document.createElement("section");
let weather_container = document.createElement("div");
let map_list = document.createElement("div");
let map_container = document.createElement("div");


createWeatherMapSection();


let mapa = getMapData(map_container);

let change = JSON.parse(localStorage.getItem("change")) || [];
console.log(change);



let codeIso = localStorage.getItem("codeIso");
let city = localStorage.getItem("city");
let validation = JSON.parse(localStorage.getItem("validation")) || [];



if(codeIso && city && change){
    changePresentation(change);
    // getWeatherData(city, codeIso, mapa);
    weatherWatcher(codeIso, city, validation, mapa);
}

createLI();

// Mostrar lista de paises
countryUl.style.display = "none";
input_country.addEventListener("click", () => {
    countryUl.style.display = "flex";
    countryUl.style.justifyContent = "start";
    countryUl.style.width = input_country.style.width;
    countryUl.style.minWidth = input_country.style.width;
});


// Filtrar por nombre la lista de paises
let countries = document.querySelectorAll(".countryLi");

input_country.addEventListener('input', function() {
    const searchTerm = input_country.value.toUpperCase();

    countries.forEach(countrie => {
        const text = countrie.textContent.toUpperCase();
        if (text.includes(searchTerm)) {
            countrie.style.display = 'block';
        } else {
            countrie.style.display = 'none';
        }
    });
});

// Esconder lista de paises
document.addEventListener("click", (event) => {
    if (!input_country.contains(event.target) && !countryUl.contains(event.target)) {
        countryUl.style.display = "none";
    }
})

// Evento para seleccionar un pais de la lista
countries.forEach(countrie => {
    countrie.addEventListener("click", () => {
        input_country.value = countrie.textContent;
        let codigoIso = countrie.getAttribute("value");
        input_country.setAttribute("codeIso", codigoIso);
        countryUl.style.display = "none";
    })
});


form_block.addEventListener('submit', (event) => {
    event.preventDefault();
    // localStorage.setItem("change", "true");
    // change = JSON.parse(localStorage.getItem("change"));
    // changePresentation(change);
    let validation = countryValidation(input_country.value);
    weatherWatcher(input_country.getAttribute("codeIso"), input_city.value, validation, mapa);
});

export function changePresentation(change){
    if(change){
        header_section.style.flexDirection = "row";
        header_section.style.height = "12%";
        header_section.style.width = "99%";
        header_section.style.borderRadius = ".6em"
        header_section.style.justifyContent = "space-around";
        main.style.justifyContent = "center";
        header_section.style.boxShadow = "0px 0px 15px 12px #ffffff10";
        form_block.style.flexDirection = "row";
        form_block.style.height = "auto";
        form_block.style.width = "35%";
        main.style.flexDirection = "column";
        // main.style.justifyContent = "space-between";
        // header_section.style.flexDirection = "column";
        weather_map_section.style.display = 'flex';

        button.innerHTML = " ";
        button.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
        button.style.fontSize = "1.2em";
        button.style.borderRadius = "40%";
    }else{
    }
}

function createWeatherMapSection() {

    weather_map_section.classList.add("weather_map_container");
    map_list.classList.add("map_list_container");
    weather_container.classList.add("weather_container", "climateData", "opcionMostrada");
    map_container.classList.add("map_container", "climateData", "opcionOculta");

    let temp_layer = document.createElement("div");
    temp_layer.classList.add("temp_layer-div");
    temp_layer.setAttribute("map_layer", "");
    let temp_a = document.createElement("a");
    temp_a.setAttribute("title", "Temperatura");
    let temp_icon = document.createElement("i");
    temp_icon.classList.add("fa-solid", "fa-temperature-half");
    // temp_layer.innerHTML = "T";

    let cloud_layer = document.createElement("div");
    cloud_layer.classList.add("cloud_layer-div");
    cloud_layer.setAttribute("map_layer", "");
    let cloud_a  = document.createElement("a");
    cloud_a.setAttribute("title", "Nubes");
    let cloud_icon = document.createElement("i");
    cloud_icon.classList.add("fa-solid", "fa-cloud");
    // cloud_layer.innerHTML = "C";

    let precipitation_layer = document.createElement("div");
    precipitation_layer.classList.add("precipitation_layer-div");
    precipitation_layer.setAttribute("map_layer", "");
    let precipitation_a = document.createElement("a");
    precipitation_a.setAttribute("title", "Precipitationes");
    let precipitation_icon = document.createElement("i");
    precipitation_icon.classList.add("fa-solid", "fa-cloud-showers-heavy");
    // precipitation_layer.innerHTML = "PC";

    let pressure_layer = document.createElement("div");
    pressure_layer.classList.add("pressure_layer-div");
    pressure_layer.setAttribute("map_layer", "");
    let pressure_a = document.createElement("a");
    pressure_a.setAttribute("title", "Presion Atmosférica");
    let pressure_icon = document.createElement("i");
    pressure_icon.classList.add("fa-solid", "fa-arrow-down-short-wide");
    // pressure_layer.innerHTML = "PS";

    
    let wind_layer = document.createElement("div");
    wind_layer.classList.add("wind_layer-div");
    wind_layer.setAttribute("map_layer", "");
    let wind_a = document.createElement("a");
    wind_a.setAttribute("title", "Viento");
    let wind_icon = document.createElement("i");
    wind_icon.classList.add("fa-solid", "fa-wind");
    // wind_layer.innerHTML = "W";

    map_list.appendChild(temp_layer);
    temp_layer.appendChild(temp_a);
    temp_a.appendChild(temp_icon);
    // temp_layer.appendChild(temp_img);
    map_list.appendChild(cloud_layer);
    cloud_layer.appendChild(cloud_a);
    cloud_a.appendChild(cloud_icon);
    map_list.appendChild(precipitation_layer);
    precipitation_layer.appendChild(precipitation_a);
    precipitation_a.appendChild(precipitation_icon);
    map_list.appendChild(pressure_layer);
    pressure_layer.appendChild(pressure_a);
    pressure_a.appendChild(pressure_icon);
    map_list.appendChild(wind_layer);
    wind_layer.appendChild(wind_a);
    wind_a.appendChild(wind_icon);

    map_container.appendChild(map_list);

    if(window.innerWidth <= 768){
        let option_bar_mobile = createBar();
        weather_map_section.appendChild(option_bar_mobile);
    }
     
    weather_map_section.appendChild(weather_container);
    weather_map_section.appendChild(map_container);


    main.appendChild(weather_map_section);
    crearCositas(weather_container);
}

function countryValidation(countryValue){
    let country_entered = countryValue.toUpperCase();
    let validation = false;
    countries.forEach((countrie => {
        if (country_entered.includes(countrie.textContent.toUpperCase())) {
            input_country.setAttribute("codeIso", countrie.getAttribute("value"));
            validation = true;
            return validation;
        } else {
            return validation;
        }
    }));
}