import axios from 'axios';
import './styles.css';
import { useState } from 'react';


const Try = () => {
      const [WeatherData,setWeatherData] = useState({});
      const [location,setLocation] = useState("");

      const API_KEY = '8e958a1d796028dce1a97b74e6a60699';

      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=1.0232&lon=7.9465&appid=8e958a1d796028dce1a97b74e6a60699`
      const gURL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&units=imperial&appid=8e958a1d796028dce1a97b74e6a60699`
      
      


      const searchLocation = (event) => {
            if (event.key === 'Enter') {
              axios.get(gURL).then(
                (response) => {
                  const coordinates = response.data[0]; // Assuming the response is an array with location data
                  if (coordinates && coordinates.lat && coordinates.lon) {
                    const lat = coordinates.lat;
                    const lon = coordinates.lon;
        
                    // Fetch weather data using the coordinates
                    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
                    axios.get(weatherURL).then((weatherResponse) => {
                      const weatherData = weatherResponse.data;


        
                      // Extract the desired properties
                      const temperature = weatherData.main.temp;
                      const windSpeed = weatherData.wind.speed;
                      const country = weatherData.sys.country;
                      const humidity = weatherData.main.humidity;
        
                      console.log("Temperature:", temperature);
                      console.log("Wind Speed:", windSpeed);
                      console.log("Country:", country);
                      console.log("Humidity:", humidity);
                      
                      setWeatherData(weatherData);
                    });
                  } else {
                    console.error("Latitude and Longitude not found in the response.");
                  }
                }
              );
              setLocation("");
            }
          }
        
      
     
       const getLocation = (e) =>{
            setLocation(e.target.value)
       }


      return (
            <div className="main">
                  <h2>eXWeather</h2>
                  <div className="search">
                        <input type='text'
                         placeholder='Enter Location'
                          value={location} 
                          onKeyPress={searchLocation}
                           onChange={getLocation}>
                        
                        </input>

                  </div>


                  <div className="container">
                        <div className="top">
                              <div className="location">
                              {WeatherData.sys ?
                                    <p>{WeatherData.name} ({WeatherData.sys.country}) </p> : 
                                    <p></p>} 
                              </div>
                              <div className="temp">
                                    {WeatherData.main ?
                                    <h1>{WeatherData.main.temp.toFixed()}°C </h1> : 
                                    <p></p>} 
                                    {/* <h1>{WeatherData.main && WeatherData.main.temp}</h1> */}
                              </div>
                              <div className="description">
                              {WeatherData.weather ?
                                    (<p> {WeatherData.weather[0].description} </p>) : 
                                    <p></p>} 
                              </div>
                        </div>


                                    { WeatherData.name !=undefined &&
                                    <div className="buttom">
                                    <div className="feels">
                                    {WeatherData.main ?
                                          <p className='bold'>{WeatherData.main.feels_like.toFixed()}°C </p> : 
                                          <p></p>} 
                                          <p>Feels like</p>
                                    </div>
                                    <div className="humidity">
                                    {WeatherData.main ?
                                          <p className='bold'>{WeatherData.main.humidity}% </p> : 
                                          <p></p>} 
                                          <p>Humidity</p>
                                    </div>
                                    <div className="wind">
                                    {WeatherData.wind ?
                                          <p className='bold'>{WeatherData.wind.speed.toFixed()}MPH </p> : 
                                          <p></p>} 
                                          <p>Wind Speed</p>
                                    </div>
                              </div>
                                     }
                  </div>
            </div>
      );

}

export default Try