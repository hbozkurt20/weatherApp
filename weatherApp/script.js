//! Bismillahirrahmanirrahim

//kanal adı https://www.youtube.com/watch?v=krUdJ87uxXc&list=PL6KmAihonvDBmohCK752FyXHW1ORtAmL6&index=24
// adı codeArry

//* dom Elemanlar Seçimi

const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');

// sectionlar
const weatherInfoSection = document.querySelector(".weather-info");
const notFoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city");

const countryTxt = document.querySelector(".country-txt");
const tempTxt = document.querySelector(".temp-txt");
const conditionTxt = document.querySelector(".condition-txt");
const humidityValueTxt = document.querySelector(".humidity-value-txt");

const windValueTxt = document.querySelector(".wind-value-txt");

const weatherSummaryİmg = document.querySelector(".weather-summary-img");
const currentDateTxt = document.querySelector(".current-date-txt");



const apiKey = "d8daa1a89082a80f0831b02b74f0d63a"

searchBtn.addEventListener("click", () => {
    if(cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
        //! odağın kalkmasını sağlıyor
    }   
})

cityInput.addEventListener("keydown", (event) => {
    if(event.key == "Enter" && cityInput.value.trim() != ""){
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
        //! odağın kalkmasını sağlıyor
    }
})

/*      event değerini keyCode key ve dahasını böyle alırsın
?cityInput.addEventListener("keyup", (event) => {
?    console.log(event)
? });
*/


//-------------------------------------------------------------------- datayı aldığımız section

async function getFetchData(endPoint,city){
const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&lang=tr&units=metric`
const response = await fetch(apiUrl)
return response.json()
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData("weather",city)
    


    //* şehir bulunamadıysa
    if (weatherData.cod != 200 ){
        showDisplaySection(notFoundSection)
        return
    }else{
        console.log(weatherData);
        const {name : country,
        main : {temp  , humidity},
        weather : [{id , description}],
        wind : {speed}

    } = weatherData
        

        //! veri güncelleme

        countryTxt.textContent = country //!  öncesinde yani aldığımız json da verimizin ismi name di biz onu country olarak geri aldık ve değişkene yükledik
        tempTxt.textContent = Math.round(temp) + " °C"
        conditionTxt.textContent = description
        humidityValueTxt.textContent = humidity + "%"
        windValueTxt.textContent = Math.round(speed) + "M/S"
        weatherSummaryİmg.src = `assets/assets/weather/${getWeatherIcon(id)}`

        currentDateTxt.textContent = getCurrentDate()
        showDisplaySection(weatherInfoSection)
    }

}

//--------------------------------------------------------------------------


function showDisplaySection(section) {
    [weatherInfoSection , searchCitySection , notFoundSection].forEach((section) => {
        section.style.display= "none"
    })
    section.style.display = "flex"
}


function getWeatherIcon(id) {
    if(id <= 232){
        return `thunderstorm.svg`
    } else if ( id <= 321 && id > 232){
        return `drizzle.svg`   // çileyen yağmur
    }else if ( id <= 531 && id > 321){
        return `rain.svg`
    }else if ( id <= 622 && id > 531){
        return `snow.svg`
    }else if ( id <= 781 && id > 622){
        return `atmosphere.svg`  // Tornado demek
    }else if ( id <= 800 && id > 781){
        return `clear.svg`
    }else{
        return `clouds.svg`
    }
}

function getCurrentDate(){
    const currentDate = new Date()
    const options = {
        weekday: "short",
        day: "2-digit",
        month:"short"
    }
   return currentDate.toLocaleDateString("tr-TR", options)
}

