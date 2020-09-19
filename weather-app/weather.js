const apiKey = '62c55d8d4fe3bed1e6ce37701d4aa9f6'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

const url = (location) => 
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`

async function getWeatherByLocation(location) {
    const resp = await fetch(url(location), {origin:"cors"})
    const respData = await resp.json();
    
    addWeatherToPage(respData)
}
console.log(location)

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp)

    const weather = document.createElement('div')
    weather.classList.add('weather')
    console.log(data.weather[0].icon)
    weather.innerHTML = `
        <small>There are </small>
        <h2>
        <img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png"/>
        ${temp} C
        <img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png"/>
        </h2>
        <small>${data.weather[0].main}</small>
        <p> in ${search.value}</p>
    `
    
    // cleanup
    main.innerHTML = ""

    main.appendChild(weather)
}

function KtoC(K) {
    return Math.floor(K - 273.150)
}



form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    if(location) 
        getWeatherByLocation(location)
    
})