document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '071e0ef2abeddaba3d9488779a5c7f3e';
    const getLocationBtn = document.getElementById('getLocation');
    const locationStatus = document.getElementById('locationStatus');
    const locationResult = document.getElementById('locationResult');
    let map;
    let marker;

    // Initialize Google Maps
    function initMap(lat, lon) {
        const mapOptions = {
            center: { lat: lat, lng: lon },
            zoom: 13
        };
        
        map = new google.maps.Map(
            document.getElementById('map'),
            mapOptions
        );

        marker = new google.maps.Marker({
            position: { lat: lat, lng: lon },
            map: map,
            title: 'Your Location'
        });
    }

    getLocationBtn.addEventListener('click', function() {
        locationStatus.innerHTML = 'Requesting your location...';
        locationResult.innerHTML = `
            <div id="map" style="height: 400px; width: 100%; margin-top: 20px; border-radius: 10px;"></div>
            <div id="weatherInfo" class="weather-info"></div>
        `;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    locationStatus.innerHTML = 'Location found! Loading map...';
                    
                    // Initialize map with location
                    initMap(lat, lon);
                    
                    // Get weather data
                    getLocationWeather(lat, lon);
                },
                error => {
                    handleLocationError(error);
                }
            );
        } else {
            locationStatus.innerHTML = 'Geolocation is not supported by your browser';
        }
    });

    function getLocationWeather(lat, lon) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                displayWeatherInfo(data);
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('weatherInfo').innerHTML = 'Error getting weather data. Please try again.';
            });
    }

    function displayWeatherInfo(weatherData) {
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `
            <div class="weather-card">
                <h3>${weatherData.name}</h3>
                <div class="weather-details">
                    <p><i class="fas fa-temperature-high"></i> Temperature: ${weatherData.main.temp.toFixed(1)}°C</p>
                    <p><i class="fas fa-tint"></i> Humidity: ${weatherData.main.humidity}%</p>
                    <p><i class="fas fa-wind"></i> Wind: ${weatherData.wind.speed} m/s</p>
                    <p><i class="fas fa-cloud"></i> Weather: ${weatherData.weather[0].description}</p>
                    <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" 
                         alt="${weatherData.weather[0].description}">
                </div>
            </div>
        `;
    }

    function handleLocationError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                locationStatus.innerHTML = "Location access was denied. Please enable location services.";
                break;
            case error.POSITION_UNAVAILABLE:
                locationStatus.innerHTML = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                locationStatus.innerHTML = "Location request timed out.";
                break;
            default:
                locationStatus.innerHTML = "An unknown error occurred.";
                break;
        }
    }
}); 