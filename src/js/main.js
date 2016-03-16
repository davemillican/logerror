
//(function () {

    var mainEl = $('main'); 

    var appKey = '51113235aad3a0c997bf5da2f067ea19';

//!!!!!!!!!!!comment this out    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?count=7&id=524901';
    console.log("this works");


    function getWeatherForecast (cityId, callback) {
        var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?count=7&id=' + cityId;

        url += '&appid=' + appKey;

        var request = new XMLHttpRequest();
        
        request.onreadystatechange = function () {
            if (request.readyState === 4) {

                callback(JSON.parse(request.responseText));

            }
            console.log(request.readyState);

        }

        request.open('GET', url);
        request.send();

    };



    function toFahrenheit (tempKelvin) {
        return Math.floor ((tempKelvin - 273.15 ) * 1.8 + 32);

    };

    function degreesToDirection ( degrees ) {
        console.log ("degrees: " + degrees)
        if ((degrees > 340) || (degrees <= 25)) {
            return "N";
        };

        if (degrees < 70) {
            return "NE";
        };

        if (degrees < 115) {
            return "E";
        };

        if (degrees < 160) {
            return "SE";
        };

        if (degrees < 205) {
            return "S";
        };

        if (degrees < 250) {
            return "SW";
        };

        if (degrees < 295) {
            return "W";
        };

        return "NW";    
}

    var WeatherModel = Backbone.Model.extend ({
        fTempLow: function () {
            return toFahrenheit (this.get('temp').min);
        },

        fTempHigh: function () {
            return toFahrenheit (this.get('temp').max);

        },

        windDirection: function () {
            return degreesToDirection (this.get('deg'));
        }
    });

    var WeatherCollection = Backbone.Collection.extend({
        model: WeatherModel
    });

    var collection = new WeatherCollection();


    function calculateAverages () {


    }

    function updateData (data) {
        // destroy all the models
        console.log (data);
        $('#header').html('');
        var el = createCityView(data); 
        $('#header').append(el);       
        collection.reset();
        collection.add(data.list);
    }


    $('button').on ('click',function () {
        getWeatherForecast($('input').val(), updateData);
    });

    collection.on ('add', function () {
        console.log ("test2");
        buildApplication(collection);
    });

    getWeatherForecast('524901', updateData );

    var cityViewTemplate = _.template($("#city-template").html());

    function createCityView (data) {
        var el = $('<div>');

        var contents = cityViewTemplate(data);

        el.html(contents);

        return el;
    }

    var weatherViewTemplate = _.template($("#weather-template").html());

    function createWeatherView (model) {
        var el = $('<div>');

        var contents = weatherViewTemplate(model);


        el.html(contents);

        return {
            el: el,
            destroy: function () {
                el.empty();
                model.stopListening();
            }
        };
    }

    function buildApplication (collection) {
        
        console.log( "called");
        mainEl.html('');
        var children = collection.map(createWeatherView);

        children.forEach (function (view) {
            mainEl.append(view.el)
        });

        calculateAverages();

    }


//}//) ();
