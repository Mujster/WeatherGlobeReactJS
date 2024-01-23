import React from 'react';
import '../styles/Card.css'

const WeatherCard=({data})=>{
    return(
       <div className='weather'>
           <div className='top'>
              <div>
               <p className='city'>{data.city}</p>
               <p className='weather-description'>{data.weather[0].description}</p>
              </div>
              <img className="weather-icon" src={`${data.weather[0].icon}.png`} alt="img"/>
           </div>
           <div className='bottom'>
              <p className='temperature'>{Math.round(data.main.temp)}°C</p>
              <div className='details'>
                <div className='parameter-row'>
                    <span className='parameter-label'>Feels Like</span>
                    <span className='parameter-value'>{Math.round(data.main.feels_like)}°C</span>
                </div>
                <div className='parameter-row'>
                    <span className='parameter-label'>Wind</span>
                    <span className='parameter-value'>{data.wind.speed}Km/h</span>
                </div>
                <div className='parameter-row'>
                    <span className='parameter-label'>Humidity</span>
                    <span className='parameter-value'>{data.main.humidity}%</span>
                </div>
                <div className='parameter-row'>
                    <span className='parameter-label'>Pressure</span>
                    <span className='parameter-value'>{data.main.pressure}HPa</span>
                </div>
              </div>
           </div>
       </div> 
    );
}

export default WeatherCard;