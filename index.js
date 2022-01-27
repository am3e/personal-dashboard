const imageAuthor = document.getElementById('image-author')
const stocksDisplay = document.getElementById('stocks')
const timeDisplay = document.getElementById('time')
const weatherDisplay = document.getElementById('weather')
let time;


const updateClock = () => {
    time = new Date().toLocaleTimeString('en-US', {timeStyle: 'short'})

    timeDisplay.textContent = time
    setTimeout(updateClock, 1000)
}
updateClock()

fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=flowers')
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        imageAuthor.textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1490772888775-55fceea286b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDMyOTQ4MzE&ixlib=rb-1.2.1&q=80&w=1080)`

        console.log(err)
                //https://images.unsplash.com/photo-1527903624482-4186b06014b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDMyOTQ4NTQ&ixlib=rb-1.2.1&q=80&w=1080
    })


fetch('https://api.coingecko.com/api/v3/coins/cosmos')
    .then(res => {
        if (!res.ok) {
            stocksDisplay.innerHTML = `<img class="error-image" src="https://media3.giphy.com/media/VqPU8pfgHG79m/giphy.gif?cid=790b76115ffc3126685df847b678507aafff01fae79c64e5&rid=giphy.gif&ct=g" alt="pokemon eevee with a flower crown">`
            throw Error("Something went wrong");
        }
        return res.json()
        })
    .then(d => {
        stocksDisplay.innerHTML = `
        <img src="${d.image.small}" alt="${d.name} logo">
        <div id="stock-top">
            <h3><a href="${d.links.homepage[0]}">${d.name}</a></h3>
            <p> NOW     $${d.market_data.current_price.cad} CAD </p>
            <p> HIGH    $${d.market_data.high_24h.cad} CAD </p>
            <p> LOW     $${d.market_data.low_24h.cad} CAD </p>
        </div>
        `
    })
    .catch(err => 
        console.log(`Things went wrong:
        ${err}`))

    //https://api.coingecko.com/api/v3/coins/cosmos
    //https://api.coingecko.com/api/v3/coins/fantom
    //https://api.coingecko.com/api/v3/coins/metis

    //d.market_data.current_price.cad
    //d.links.homepage[0]
    //d.image.small
    //d.name





const getWeather = (lat, lon) => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`)
        .then(res => {
            if(!res.ok) {
                throw Error("Unknown Weather")
            }
            return res.json()
        })
        .then(weather => {
            console.log(weather)
            weatherDisplay.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="${weather.weather[0].main} logo">
            <div id="weather-top">
                <h3>${weather.name}</h3>
                <p>Feels like ${Math.round(weather.main.feels_like,0)}</p>
                <p>Temperature ${Math.round(weather.main.temp,0)}</p>
                <p>${weather.weather[0].description}</p>
            </div>

            `
        })
        .catch(err => {
            console.log(err)
        })
}

if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
    });
  } else {
    console.log('Where are you?!')
  }



