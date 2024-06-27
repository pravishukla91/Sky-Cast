// // variable declar

// let latitude 
// let longitude 

// // API url and API Key
// const ApiURL = `https://api.openweathermap.org/data/2.5/weather?`
// const APIKey = "37cfd7856512e9fa7b590e539e5f5aa8";

// // select html elements
// let city =document.getElementById("city")
// let country = document.getElementById("country")


// async function getData(URL, lat, lon, Key){
//   try{
//   const responce = await fetch(`${URL}lat=${lat}&lon=${lon}&appid=${Key} `)
//   const result = await responce.json();
  
//   console.log(result);
//   console.log(responce);
//   let APIcity = `${result.name}`;
  
  
  
  
//   city.innerHTML = APIcity
//   console.log(APIcity)
//   }
//   catch(e){
//     console.log(e);
//   }
// }
// // getData(ApiURL, latitude, longitude, APIKey)















// // ------main page button click function ------
// let button = document.getElementById("button")

// button.addEventListener("click", (e)=>{
//   console.log("click")
//   // e.preventDefault()
//   if(navigator.geolocation){

//    navigator.geolocation.getCurrentPosition((position) => {
//     latitude = position.coords.latitude;
//     longitude = position.coords.longitude;
//     getData(ApiURL, latitude, longitude, APIKey)
//     // window.location.href = "main.html";
//     // return latitude , longitude
//     });
    
//   }  else {
//     console.log("Geolocation is not supported by this browser.");
// }
// })



  // Variable declaration
  let latitude;
  let longitude;

  // API URL and API Key
  const ApiURL = `https://api.openweathermap.org/data/2.5/weather?`;
  const APIKey = "37cfd7856512e9fa7b590e539e5f5aa8";

  // Select HTML elements
  let c_display = document.getElementById("c_display")
  let first = document.getElementById("1st")
//   ----
  let city = document.getElementById("city");
  let country = document.getElementById("country");
  let clock = document.getElementById("clock")
  let dateString = document.getElementById("dateString")
  let currentTemp = document.getElementById("c-l-temp")
  let weather = document.getElementById("current-location-weather")
  let weatherImage = document.getElementById("weather-image")
  let searchBtn = document.getElementById("s-btn");
  let searchBar = document.getElementById("search");
  let detailBoxTemp = document.getElementById("temperature-data")
  let windSpeed = document.getElementById("wind-speed-data")
  let humidity = document.getElementById("humidity-data")
  let visibility = document.getElementById("visibility-data")


  async function getData(URL, lat, lon, Key) {
      try {
          const response = await fetch(`${URL}lat=${lat}&lon=${lon}&appid=${Key}`);
          const result = await response.json();
         console.log(response)
          console.log(result);
          let APIcity = `${result.name}`;
          let APICountry = result.sys.country
          let APIWeather = result.weather[0].main;
          let APIWeatherDescription = result.weather[0].description
          let APICurrentTemp = `${Math.round(result.main.temp - 273.15)}°C`
          let APiWindSpeed = `${result.wind.speed} Km/h`
          let APIHumidity = `${result.main.humidity}%`
          let APIVisibility = `${result.visibility} ml`

          // Update city element with the fetched city name
          getCurrentLocValue(APIcity, APICountry, APICurrentTemp, APIWeatherDescription , APiWindSpeed , APIHumidity, APIVisibility)
          // showing weather image function
          showImage(APIWeather)

          // console.log(APIcity); 
        } catch (e) {
            console.log(e);
      }

    }
    //   Date time function

setInterval(function(){
  let date = new Date();
  clock.innerText =  date.toLocaleTimeString();
  dateString.innerText = date.toLocaleDateString()
},1000)
    
    // Main page button click function
    let button = document.getElementById("button");

  button.addEventListener("click", () => {
      console.log("click");
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
              // Set latitude and longitude with the current position
              latitude = position.coords.latitude;
              longitude = position.coords.longitude;
              // Call getData function with the updated latitude and longitude
              getData(ApiURL, latitude, longitude, APIKey);
              c_display.style = "display:block"
              first.style = "display:none"
          });
      } else {
          console.log("Geolocation is not supported by this browser.");
      }
  });




   
   searchBtn.addEventListener("click", () => {
    let searchReasult = searchBar.value;
    console.log(searchReasult);
   })

  // function which get the api values and add that into html elements innerText
function getCurrentLocValue(APIcity, APICountry, APICurrentTemp, APIWeatherDescription ,APiWindSpeed, APIHumidity, APIVisibility){
  city.innerText = APIcity;
  country.innerText = APICountry;
  currentTemp.innerText = APICurrentTemp;
  weather.innerText = APIWeatherDescription
  detailBoxTemp.innerText = APICurrentTemp;
  windSpeed.innerText = APiWindSpeed;
  humidity.innerText = APIHumidity;
  visibility.innerText = APIVisibility;
}

// showImage function

function showImage(APIWeather){
    if(APIWeather.toLowerCase() === "rain")  weatherImage.src = "./img/rain.png"
    else if(APIWeather.toLowerCase() === "cloud" ) weatherImage.src ="./img/cloud.png"
}