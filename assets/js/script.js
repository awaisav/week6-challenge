var fetchButton = document.getElementById("cityName");
var weathermain = document.querySelector(".weather-main");
var weatherBlockEl0 = document.querySelector(".small-block0");
var weatherBlockEl1 = document.querySelector(".small-block1");
var weatherBlockEl2 = document.querySelector(".small-block2");
var weatherBlockEl3 = document.querySelector(".small-block3");
var weatherBlockEl4 = document.querySelector(".small-block4");
var weatherBlockEl = [
  weatherBlockEl0,
  weatherBlockEl1,
  weatherBlockEl2,
  weatherBlockEl3,
];

var cityNameEl = document.createElement("h4");
var dateEl = document.createElement("h4");
var imgEl = document.createElement("img");
var tempEl = document.createElement("p");
var windEl = document.createElement("p");
var humidityEl = document.createElement("p");

function buttonPress(e) {
  if (e.key === "Enter") {
    var city = fetchButton.value;
    getApi(city);
  }
}
fetchButton.addEventListener("keypress", buttonPress);

//This function will get the data from the Api
function getApi(city) {
  // TODO: Insert the API url to get a list of your repos
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=metric&appid=5c65bc28cf7cfa4a07b5a8db4b531cac";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var todayDate = data.list[0].dt_txt;
      todayDate = todayDate.split(" ");
      todayDate = todayDate[0];
      var nextDate;
      var x = 0;
      setEl(data, x, todayDate);
      // Looping over the fetch response and inserting the URL of your repos into a list
      for (var i = 0; i < data.list.length; i++) {
        // Create a list element
        //  console.log(`Today Date`, todayDate);
        nextDate = data.list[i].dt_txt;
        nextDate = nextDate.split(" ");
        nextDate = nextDate[0];

        if (todayDate != nextDate && x < 4) {
          todayDate = nextDate;
          weatherBlockEl0.setAttribute("style", "display:block");
          weatherBlockEl1.setAttribute("style", "display:block");
          weatherBlockEl2.setAttribute("style", "display:block");
          weatherBlockEl3.setAttribute("style", "display:block");
          var nextDayDateEl = document.createElement("p");
          var nextDayTempEl = document.createElement("p");
          var nextDaywind = document.createElement("p");
          var nextDayHumidity = document.createElement("p");
          nextDayDateEl.textContent = nextDate;
          var temp = data.list[i].main.temp;
          temp = temp.toString().split(".");
          nextDayTempEl.textContent = "Temp: " + temp[0] + "°C";
          nextDaywind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
          nextDayHumidity.textContent =
            "Humidity: " + data.list[i].main.humidity + "%";
          weatherBlockEl[x].appendChild(nextDayDateEl);
          weatherBlockEl[x].appendChild(nextDayTempEl);
          weatherBlockEl[x].appendChild(nextDaywind);
          weatherBlockEl[x].appendChild(nextDayHumidity);
          x++;
        }
      }
    });
}

function setEl(data, i, todayDate) {
  cityNameEl.textContent = data.city.name;
  dateEl.textContent = todayDate;
  var temp = data.list[i].main.temp;
  temp = temp.toString();
  temp = temp.split(".");
  tempEl.textContent = "Temp: " + temp[0] + "°C";
  windEl.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
  humidityEl.textContent = "Humidity: " + data.list[i].main.humidity + "%";
  imgEl.src = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
  weathermain.setAttribute("style", "border: 1px solid black");
  weathermain.appendChild(dateEl);
  weathermain.appendChild(cityNameEl);
  cityNameEl.appendChild(imgEl);
  weathermain.appendChild(tempEl);
  weathermain.appendChild(windEl);
  weathermain.appendChild(humidityEl);
}
