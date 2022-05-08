const weatherForecastEl = document.querySelector('.overflow');
const API_KEY = '49cea028f471944c9b27108b1f952ccf';
const input = document.querySelector('.text_box');

function fetchWeather(city){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid=49cea028f471944c9b27108b1f952ccf")
    .then((resp) => resp.json())
    .then((data) => displayOneDayWeather(data));
}

// Default location
fetchWeather('Tbilisi');

function displayOneDayWeather(data){
    getWeatherByCoords(data);
    console.log(data);

    document.querySelector('.city').textContent = data.name + ', ' +data.sys.country;
    document.querySelector('.windy h2').textContent = data.wind.speed + ' km/h';
    document.querySelector('.sun').textContent = data.weather[0].description;
    document.querySelector('.temperatue').textContent = Math.round(data.main.temp_min) + ' °C';
    document.querySelector('#temp').textContent =  Math.round(data.main.feels_like) + ' °C';
    document.querySelector('#humidity').textContent =  data.main.humidity + ' %';
    document.querySelector('#wind').textContent =  data.wind.deg + ' °';
    // document.querySelector('#date').textContent = window.moment(day.dt*1000).format('dddd') ;
}

// ENTER

input.addEventListener('keyup', function (e) {
    if(e.key == 'Enter'){
        search();
        console.log('if - Enter');
    }
});

function search(){
    fetchWeather(document.querySelector('input').value);
}

function getWeatherByCoords(data){
    // console.log(data,'11');
    let LAT = data.coord.lat;
    let LON = data.coord.lon;
    console.log(LAT);

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
    .then(resp => resp.json())
    .then(data =>{
        console.log('SECOND' ,data);
        displayForecast(data);
    });

}


function displayForecast(data){
    let otherDayForcast = '';
    data.daily.forEach((day, i) => {
        otherDayForcast += `
        <div class="space">
            <div class="cont">
                <div class="space_top">
                    <h2>${window.moment(day.dt*1000).format('dddd')}</h2>
                </div>
                <div class="space_mid">
                    <div class="first">
                        <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="">
                        <h3>${day.weather[0].description}</h3>
                    </div>
                    <div class="second">
                        <div class="week_temp">${Math.round(day.temp.day)} °C</div>
                    </div>
                </div>
            </div>
        </div>
        `;
    });

    weatherForecastEl.innerHTML = otherDayForcast;
}