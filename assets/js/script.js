var randomMealBox0 = document.querySelector(".random-meal-box0");
var randomMealBox1 = document.querySelector(".random-meal-box1");
var randomMealBox2 = document.querySelector(".random-meal-box2");
var randomMealBox3 = document.querySelector(".random-meal-box3");
var randomMealBox = [
  randomMealBox0,
  randomMealBox1,
  randomMealBox2,
  randomMealBox3,
];
getApi();

//This function will get the data from the Api
function getApi() {
  // TODO: Insert the API url to get a list of your repos
  var requestUrl =
    "https://www.themealdb.com//api/json/v2/9973533/randomselection.php";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(`Data`, data);
      for (var i = 0; i < 4; i++) {
        randomMealBox[i].src = data.meals[i].strMealThumb;
        console.log(data.meals[i].strMeal);
      }
    });
}
