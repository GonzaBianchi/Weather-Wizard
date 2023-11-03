
export function crearCositas(bloqueClima){
    

    let city_country_name = document.createElement("p");
    city_country_name.classList.add("city_country_name");

    let main_temp_container = document.createElement("div");
    main_temp_container.classList.add("main_temp_container");
    
    let temp_container = document.createElement("div");
    temp_container.classList.add("temp_container");

    let img_temp_container = document.createElement("div");
    img_temp_container.classList.add("img_temp_container");
    let img_temp = document.createElement("img");
    img_temp.classList.add("img_temp");

    let actual_temp_sensation_container = document.createElement("div");
    actual_temp_sensation_container.classList.add("actual_temp_sensation_container");

    let actual_temp_container = document.createElement("div");
    actual_temp_container.classList.add("actual_temp_container");
    let actual_temp_label = document.createElement("p");
    actual_temp_label.classList.add("actual_temp_label");
    let actual_temp = document.createElement("p");
    actual_temp.classList.add("actual_temp");

    let actual_sensation_container = document.createElement("div");
    actual_sensation_container.classList.add("actual_sensation_container");
    let actual_sensation_label = document.createElement("p");
    actual_sensation_label.classList.add("actual_sensation_label");
    let actual_sensation = document.createElement("p");
    actual_sensation.classList.add("actual_sensation");


    let min_max_temp_container = document.createElement("div");
    min_max_temp_container.classList.add("min_max_temp_container");

    let min_temp_container = document.createElement("div");
    min_temp_container.classList.add("min_temp_container");
    let min_temp_label = document.createElement("p");
    min_temp_label.classList.add("min_temp_label");
    let min_temp = document.createElement("p");
    min_temp.classList.add("min_temp");

    let max_temp_container = document.createElement("div");
    max_temp_container.classList.add("max_temp_container");
    let max_temp_label = document.createElement("p");
    max_temp_label.classList.add("max_temp_label");
    let max_temp = document.createElement("p");
    max_temp.classList.add("max_temp");


    let secundary_wheater_container = document.createElement("div");
    secundary_wheater_container.classList.add("secundary_wheater_container");
    
    let humidity_container = document.createElement("div");
    humidity_container.classList.add("humidity_container");
    let humidity_label = document.createElement("p");
    humidity_label.classList.add("humidity_label");
    let humidity = document.createElement("p");
    humidity.classList.add("humidity");

    let sunrise_sunset_container = document.createElement("div");
    sunrise_sunset_container.classList.add("sunrise_sunset_container");

    let sunrise_container = document.createElement("div");
    sunrise_container.classList.add("sunrise_container");
    let sunrise_label = document.createElement("p");
    sunrise_label.classList.add("sunrise_label");
    let sunrise = document.createElement("p");
    sunrise.classList.add("sunrise");

    let sunset_container = document.createElement("div");
    sunset_container.classList.add("sunset_container");
    let sunset_label = document.createElement("p");
    sunset_label.classList.add("sunset_label");
    let sunset = document.createElement("p");
    sunset.classList.add("sunset");


    actual_temp_label.innerHTML += "Temperatura";
    actual_sensation_label.innerHTML  += "Sensación térmica";
    min_temp_label.innerHTML += "Temperatura mínima";
    max_temp_label.innerHTML += "Temperatura máxima";
    humidity_label.innerHTML += "Humedad";
    sunrise_label.innerHTML += "Amanecer";
    sunset_label.innerHTML += "Anochecer";


    bloqueClima.appendChild(city_country_name);
    bloqueClima.appendChild(main_temp_container);

    main_temp_container.appendChild(temp_container);
    
    temp_container.appendChild(img_temp_container);
    img_temp_container.appendChild(img_temp);
    
    temp_container.appendChild(actual_temp_sensation_container);
    
    actual_temp_sensation_container.appendChild(actual_temp_container);
    
    actual_temp_container.appendChild(actual_temp_label);
    actual_temp_container.appendChild(actual_temp);
    
    actual_temp_sensation_container.appendChild(actual_sensation_container);
    
    actual_sensation_container.appendChild(actual_sensation_label);
    actual_sensation_container.appendChild(actual_sensation);
    
    main_temp_container.appendChild(min_max_temp_container);

    min_max_temp_container.appendChild(min_temp_container);

    min_temp_container.appendChild(min_temp_label);
    min_temp_container.appendChild(min_temp);

    min_max_temp_container.appendChild(max_temp_container);
    
    max_temp_container.appendChild(max_temp_label);
    max_temp_container.appendChild(max_temp);

    
    bloqueClima.appendChild(secundary_wheater_container);

    secundary_wheater_container.appendChild(humidity_container);

    humidity_container.appendChild(humidity_label);
    humidity_container.appendChild(humidity);

    secundary_wheater_container.appendChild(sunrise_sunset_container);

    sunrise_sunset_container.appendChild(sunrise_container);

    sunrise_container.appendChild(sunrise_label);
    sunrise_container.appendChild(sunrise);

    sunrise_sunset_container.appendChild(sunset_container);
    
    sunset_container.appendChild(sunset_label);
    sunset_container.appendChild(sunset);

}