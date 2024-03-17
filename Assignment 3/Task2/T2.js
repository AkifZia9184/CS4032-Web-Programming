$(document).ready(function() {
    $('#search-btn').click(function() {
      const city = $('#city-input').val().trim();
      if (city !== '') {
        fetchWeatherData(city);
      }
    });
  
    function fetchWeatherData(city) {
      const apiKey = 'YOUR_API_KEY';
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
      // Fetch current weather data
      $.ajax({
        url: currentWeatherUrl,
        method: 'GET',
        success: function(response) {
          displayCurrentWeather(response);
        },
        error: function(xhr, status, error) {
          console.error('Error fetching current weather:', error);
        }
      });
  
      // Fetch forecast data
      $.ajax({
        url: forecastUrl,
        method: 'GET',
        success: function(response) {
          displayForecast(response);
        },
        error: function(xhr, status, error) {
          console.error('Error fetching forecast:', error);
        }
      });
    }
  
    function displayCurrentWeather(data) {
      const currentWeather = $('#weather-info');
      currentWeather.empty();
  
      const weatherInfo = `
        <div class="weather-card">
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>Temperature: ${data.main.temp}°C</p>
          <p>Weather: ${data.weather[0].description}</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind Speed: ${data.wind.speed} m/s</p>
        </div>
      `;
      currentWeather.append(weatherInfo);
    }
  
    function displayForecast(data) {
      const forecast = $('#weather-info');
  
      const forecastData = data.list.filter(item => item.dt_txt.includes('12:00:00'));
      forecastData.splice(5); // Display only 5 days forecast
  
      forecastData.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        const weather = item.weather[0].description;
        const temp = `${item.main.temp}°C`;
  
        const forecastItem = `
          <div class="weather-card">
            <h2>${day}</h2>
            <p>Weather: ${weather}</p>
            <p>Temperature: ${temp}</p>
          </div>
        `;
        forecast.append(forecastItem);
      });
    }
  });
  