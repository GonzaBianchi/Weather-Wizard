

export function createBar(){

    let divBar = document.createElement("div");
    divBar.classList.add("bar_container");

    let wData = document.createElement("div");
    wData.classList.add ("bar_content-data", "option");
    wData.innerHTML = "Datos del tiempo";

    let wMap = document.createElement("div");
    wMap.classList.add("bar_content-map", "option");
    wMap.innerHTML = "Mapa climático";

    divBar.appendChild(wData);
    divBar.appendChild(wMap);

    return divBar;
}

export function mobileOptions(){
    let weather_data = document.querySelectorAll(".climateData");
    let weather_options = document.querySelectorAll(".option");

    console.log(weather_options);
    let indice_anterior = 0;


    weather_options.forEach(elemento => {
      elemento.addEventListener('click', () => {
        weather_options.forEach(e => e.classList.remove('actual_option'));
        elemento.classList.add('actual_option');
      });
    });
  
    weather_options[0].classList.add('actual_option');
    
    weather_options.forEach((option, index) => {
        option.addEventListener("click", () => {
            if(index != indice_anterior){
                weather_data[indice_anterior].classList.remove("opcionMostrada");
                weather_data[indice_anterior].classList.add("opcionOculta");

                weather_data[index].classList.remove("opcionOculta");
                weather_data[index].classList.add("opcionMostrada");
                indice_anterior = index;

                console.log("anachi");
                console.log(index);
            }
            
            
        })
    })
}
