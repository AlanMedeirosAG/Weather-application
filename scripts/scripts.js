//Variaveis e seletores de elementos
const apiKey = "678ce395a7cabdb0a245a93bc85daa29";
const unsplashKey = "DNDD7VJqZIeo3CYpNDr6ZOduX9WpyymielFgKI_yH-w";

const apiCountryURL = "https://flagsapi.com/BR/flat/64.png";

const cityInput = document.querySelector("#city-input");
const searchInput = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data")

const sugestContainer = document.querySelector("#sugestoes-container");
const sugestTitle = document.querySelector("#sugestoes-container-title");


//Funções

const showWeatherData = async (city) =>{
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src",`https://flagsapi.com/${data.sys.country}/flat/64.png`)
    humidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.wind.speed}km/h`

    weatherContainer.classList.remove("hide")
    sugestContainer.classList.add("hide")
    sugestTitle.classList.add("hide")

    setBackgroundImage(city)

};

const getWeatherData = async (city) => {

    const apiweatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiweatherURL);
    const data = await res.json();

    return data;
}

//Eventos
searchInput.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keyup",(e) =>{
    if(e.code === "Enter"){
        const city = e.target.value
        showWeatherData(city)
    }
})

// Função para buscar e definir imagem de fundo
const setBackgroundImage = async (city) => {
    const url = `https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashKey}&orientation=landscape`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        const imageUrl = data.urls.regular;

        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    } catch (error) {
        console.log("Erro ao buscar imagem de fundo:", error);
    }
};

// Lista de cidades

const listaCities = ["Paris", "Tóquio", "Nova York", "São Paulo", "Londres",
    "Roma", "Dubai", "Toronto", "Barcelona", "Sydney",
    "Cidade do México", "", "Berlim", "Bangkok", "Rio de Janeiro"]

// Função de escolha de 3 cidades aleatoriamente

function getCidadesRandon(lista,quantity = 3){

    const copia = [...lista];
    const sugestoes = []

    for (let i = 0; i < quantity; i++) {
        const index = Math.floor(Math.random() * copia.length);
        sugestoes.push(copia.splice(index, 1)[0]);
    }

    return sugestoes;

}

function mostrarSugest() {
    const cities = getCidadesRandon(listaCities);

    sugestContainer.innerHTML = "";
    sugestContainer.classList.remove("hide");
    sugestTitle.classList.remove("hide")

    cities.forEach(cidade => {
        if (cidade) {
            const btn = document.createElement("button");
            btn.innerText = cidade;
            btn.classList.add("suggestion-btn");
            btn.addEventListener("click", () => showWeatherData(cidade));
            sugestContainer.appendChild(btn);
        }
    });
}


mostrarSugest()
