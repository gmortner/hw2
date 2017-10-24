
let getWeather = function(info) {
  console.debug("Your device's current latitude is: ");
  console.debug(info.coords.latitude.toFixed(4));
  console.debug("Your device's current longitude is: ");
  console.debug(info.coords.longitude.toFixed(4));

  let lat = info.coords.latitude.toFixed(4); //'41.8781'
  let lon = info.coords.longitude.toFixed(4); //'-87.6298'
  let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
  openweathermap_api_url += 'lat=' + lat
  openweathermap_api_url += '&lon=' + lon
  openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'

  fetch(openweathermap_api_url).then(convertToJSON).then(updateWeather).catch(displayError);
}

// Convert the weather service's raw response into JSON
let convertToJSON = function(response) {
  return response.json();
}

//Run update
let updateWeather = function(dataFromService) {

  city = dataFromService;
  city_Weather=dataFromService.weather[0];

  let updatePic = document.getElementById("weather_pic");
  updatePic.src = "http://openweathermap.org/img/w/" + city_Weather.icon + ".png";

  let update_Location = document.getElementById("loc");
  update_Location.innerHTML = city.name;

  let updateTemp = document.getElementById("temp");
  updateTemp.innerHTML = "It is "+ city.main.temp.toFixed(0) +" degrees outside. The current weather is " + city_Weather.description;
}


//Get computer location
let link = document.getElementById("get_forecast")
link.addEventListener("click", function(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeather);
})


let displayError = function(error) {
  console.debug(error);
  window.alert("Sorry, something went wrong.");
}
