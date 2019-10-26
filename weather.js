

$(document).ready(function () {



    var m = moment();
    var currentDate = m.format("MM/DD/YY");

    //date math
    var dayOneForecast = m.add(1, 'day').format('MM/DD/YY');
    var dayTwoForecast = m.add(1, 'days').format('MM/DD/YY');
    var dayThreeForecast = m.add(1, 'days').format('MM/DD/YY');
    var dayFourForecast = m.add(1, 'days').format('MM/DD/YY');
    var dayFiveForecast = m.add(1, 'days').format('MM/DD/YY');


    //current date header
    $("#todays-date").text(currentDate);

    //add 5 day forecast dates
    $("#day-1").text(dayOneForecast);
    $("#day-2").text(dayTwoForecast);
    $("#day-3").text(dayThreeForecast);
    $("#day-4").text(dayFourForecast);
    $("#day-5").text(dayFiveForecast);



    $("#search").on('click', function () {
        event.preventDefault();


        //get search input
        var citySearch = $('#search-bar').val();

        

        //display city searched in current weather display
        $("#pick-a-city").text(citySearch + " |  ");

        //create urls for openweather api
        var APIKey = "bad6babac49f266c5623e1efff489731";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=" + APIKey;
        var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&cnt=5&units=imperial&appid=" + APIKey;


        //current weather ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // var responseString = JSON.stringify(response);

            var cityLong = response.coord.lon;
            var cityLat = response.coord.lat;

            console.log("city lat: " + cityLat);
            console.log("city lon: " + cityLong);

            var UVIndexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + cityLat + "&lon=" + cityLong;
            $.ajax({
                url: UVIndexURL,
                method: "GET"
            }).then(function (response) {


                $(".uv-index").text("UV Index: " + response.value);


            });



            //transfer content to html
            $(".temp").text("Temperature: " + response.main.temp);
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);
            $(".uv-index").text("UV Index: " + response.value);

            //   get weather icon
            var weatherIcon = response.weather[0].icon;
            var weatherImgSrc = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
            var weatherImg = $('<img>');
            weatherImg.attr('src', weatherImgSrc);
            $('#weather-image').html(weatherImg);
            $("#weather-img img").attr("src", weatherImgSrc);
            //   $("#weather-image").empty();

            //set item to local storage
            localStorage.setItem("city search", citySearch);
            var citySearchStore = localStorage.getItem("city search");

            //append city search to history list under search bar
            var citySearchHistory = "<button id='stored-search'>" + citySearchStore + "</button>";
            $(".list-group").append("<li class= 'list-group-item'>" + citySearchHistory + "</li>");

        });

        //5 day forecast ajax call
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {


            //transfer content to html
            $(".tempday-1").text("Temp: " + response.list[0].main.temp);
            $(".humidityday-1").text("Humidity: " + response.list[0].main.humidity);
            $(".tempday-2").text("Temp: " + response.list[1].main.temp);
            $(".humidityday-2").text("Humidity: " + response.list[1].main.humidity);
            $(".tempday-3").text("Temp: " + response.list[2].main.temp);
            $(".humidityday-3").text("Humidity: " + response.list[2].main.humidity);
            $(".tempday-4").text("Temp: " + response.list[3].main.temp);
            $(".humidityday-4").text("Humidity: " + response.list[3].main.humidity);
            $(".tempday-5").text("Temp: " + response.list[4].main.temp);
            $(".humidityday-5").text("Humidity: " + response.list[4].main.humidity);
            console.log(response)

            //   get weather icon
            var weatherIcon51 = response.list[0].weather[0].icon;
            var weatherImgSrc51 = "http://openweathermap.org/img/wn/" + weatherIcon51 + "@2x.png"
            var weatherImg51 = $('<img>');
            weatherImg51.attr('src', weatherImgSrc51);
            $('#image5-1').html(weatherImg51);


            var weatherIcon52 = response.list[1].weather[0].icon;
            var weatherImgSrc52 = "http://openweathermap.org/img/wn/" + weatherIcon52 + "@2x.png"
            var weatherImg52 = $('<img>');
            weatherImg52.attr('src', weatherImgSrc52);
            $('#image5-2').html(weatherImg52);

            var weatherIcon53 = response.list[2].weather[0].icon;
            var weatherImgSrc53 = "http://openweathermap.org/img/wn/" + weatherIcon53 + "@2x.png"
            var weatherImg53 = $('<img>');
            weatherImg53.attr('src', weatherImgSrc53);
            $('#image5-3').html(weatherImg53);

            var weatherIcon54 = response.list[3].weather[0].icon;
            var weatherImgSrc54 = "http://openweathermap.org/img/wn/" + weatherIcon54 + "@2x.png"
            var weatherImg54 = $('<img>');
            weatherImg54.attr('src', weatherImgSrc54);
            $('#image5-4').html(weatherImg54);

            var weatherIcon55 = response.list[4].weather[0].icon;
            var weatherImgSrc55 = "http://openweathermap.org/img/wn/" + weatherIcon55 + "@2x.png"
            var weatherImg55 = $('<img>');
            weatherImg55.attr('src', weatherImgSrc55);
            $('#image5-5').html(weatherImg55);

        });
    });
}); 