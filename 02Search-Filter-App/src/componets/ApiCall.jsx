import React, { useState, useEffect } from "react";
import axios from "axios";

export const ApiCall = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if (!location) {
    //     setWeatherData(null);
    //     setLoading(false);
    //     // setError(null);
    //     return;
    // }

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=ab491a5d55be4fe2bda61912251609&q=London&aqi=nohttp://api.weatherapi.com/v1/current.json?key=ab491a5d55be4fe2bda61912251609&q=London&aqi=no`
        );
        setWeatherData(response.data);
      } catch (err) {
        setError("Could not fetch weather data. Please check the location.");
        //setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchWeather, 500);
    return () => clearTimeout(timeoutId);
  }, [location]);

  //  axios.get('http://api.weatherapi.com/v1/current.json?key=ab491a5d55be4fe2bda61912251609&q=London&aqi=nohttp://api.weatherapi.com/v1/current.json?key=ab491a5d55be4fe2bda61912251609&q=London&aqi=no')
  //   .then(response => console.log('API Data:', response.data))
  //   .catch(error => console.error('Error fetching data:', error));

  return (
    <>
      <h1>API Call</h1>
      <input
        placeholder="Search Location"
        onChange={(e) => setLocation(e.target.value)}
        value={location}
      />

      {weatherData && weatherData?.location && (
        <div>
          <h2>Weather in {weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temp_c}</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <p>Country: {weatherData.location.country}</p>
        </div>
      )}
    </>
  );
};
