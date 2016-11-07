function find() {
    deg = String.fromCharCode(176);
    var uri = 'http://api.openweathermap.org/data/2.5/weather?q=' + $("#CityName").val() + '&appid=b25cf87ab54ff7e95bcf69f22a40bb89';
    console.log(uri);
    $.getJSON(uri)
        .done(function (data) {
            console.log(data);
            $("section").show();
            $('#Title').text(data.name + ", " + data.sys.country);
            $('#sunrise').text(Sunrise(data));
            $('#sunset').text(Sunset(data));
            $('#currentTemp').text(TempConvert(data.main.temp, $("input[name=temp]:checked").val()) + deg);
            $('#hiTemp').text(TempConvert(data.main.temp_max, $("input[name=temp]:checked").val()) + deg);
            $('#loTemp').text(TempConvert(data.main.temp_min, $("input[name=temp]:checked").val()) + deg);
            $('#Icon').attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            $('#humid').text(data.main.humidity + "%");
            $('#wind').text(getWindDirection(data.wind.deg) + data.wind.speed + " mph");
            $("main").removeClass("hidden");
        })
        .fail(function (jqXHR, textStatus, err) {
            console.log("Falied!");
            $('#weather').text('Error: ' + err);
        });
}

function TempConvert(kelvin, fc) {
    if (fc == 'F') {
        return Math.round(kelvin * 9 / 5 - 459.67);
    } else {
        return Math.round(kelvin - 273.15);
    }
}


function Sunrise(data) {
    var date = new Date(data.sys.sunrise * 1000);
    var min = date.getMinutes();
    if (min < 10) {
        min = '0' + min;
    }
    return date.getHours() + ":" + min;
}

function Sunset(data) {
    var date = new Date(data.sys.sunset * 1000);
    return date.getHours() + ":" + date.getMinutes();
}

function getWindDirection(degrees) {
    if (degrees >= 330 || degrees < 30) {
        return 'N ';
    } else if (degrees >= 30 && degrees < 60) {
        return 'NE ';
    } else if (degrees >= 60 && degrees < 105) {
        return 'E ';
    } else if (degrees >= 105 && degrees < 150) {
        return 'SE ';
    } else if (degrees >= 150 && degrees < 195) {
        return 'S ';
    } else if (degrees >= 195 && degrees < 240) {
        return 'SW ';
    } else if (degrees >= 240 && degrees < 285) {
        return 'W ';
    } else {
        return 'NW ';
    }
}
