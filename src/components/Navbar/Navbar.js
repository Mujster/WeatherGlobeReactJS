import React, { useState } from "react";
import SearchBar from '../Search/Search';
import '../styles/Navbar.css';
import { WeatherUrl,WeatherAPIKey } from "../API/OpenWeather";
import WeatherCard from "../WeatherCard/WeatherCard";

const Navbar=({updateCoordinates})=>{
    const [currentWeather,setCurrentWeather]=useState(null);
    const [forecast,setForecast]=useState(null);
    
    const currentDate=new Date();
    const Months=['January','February','March','April','May','June','July','August','September','October','November','December'];
    const Days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

    const FormatMonth=`${Months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    const FormatDay=`${Days[currentDate.getDay()-1]}, ${Months[currentDate.getMonth()].substring(0, 3)} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

    const HandleOnSearchChange=(SearchData)=>{
        const [lat,lon]=SearchData.value.split(" ");
        const currentWeatherFetch=fetch(`${WeatherUrl}/weather?lat=${lat}&lon=${lon}&appid=${WeatherAPIKey}&units=metric`);
        const forecastFetch=fetch(`${WeatherUrl}/forecast?lat=${lat}&lon=${lon}&appid=${WeatherAPIKey}&units=metric`);

        Promise.all([currentWeatherFetch,forecastFetch])
        .then(async(res)=>{
           const weatherResponse= await res[0].json();
           const forecastResponse= await res[1].json();

           setCurrentWeather({city:SearchData.label, ...weatherResponse});
           setForecast({city:SearchData.label,...forecastResponse});

           updateCoordinates(parseFloat(lat), parseFloat(lon),SearchData.label);
        })
        .catch((err)=>console.log(err));
    }
    console.log(currentWeather);
    console.log(forecast);
    return(
        <div className="navbar-container">
             <div className="date-container">
                <h1>{FormatMonth}</h1>
                <h2>{FormatDay}</h2>
             </div>
             <SearchBar onSearchChange={HandleOnSearchChange}/>
             {currentWeather && <WeatherCard data={currentWeather} /*forecast={forecast}*/ />}
        </div>
    );
}
export default Navbar;
