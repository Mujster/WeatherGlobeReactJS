import React, { useState } from "react" 
import {AsyncPaginate} from 'react-select-async-paginate';
import { GeoAPIUrl,GeoAPIOptions } from "../API/Cities";

const Searchbar=({onSearchChange})=>{
    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          borderRadius: '1rem',
          border: 'none',
          boxShadow: state.isFocused ? 'transparent' : null,
          fontFamily: 'inherit',
          fontSize: 'inherit',
          backgroundColor: 'rgb(16, 25, 34)',
          padding: '0.25rem',
          width: '15rem',
          transition: 'all ease-in-out 0.5s',
          marginRight: '-2rem',
          color: '#FFF',
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused ? 'transparent' : null,
          color: state.isFocused ? 'black' : null,
          zIndex:1500,
        }),
      };
    const [Search,setSearch]=useState(null);  

    const HandleOnChange=(SearchData)=>{
        setSearch(SearchData);
        onSearchChange(SearchData);  
    };
    
    const loadOptions= async (inputValue)=>{
        return fetch(
            `${GeoAPIUrl}/cities?minPopulation=500000&namePrefix=${inputValue}`,GeoAPIOptions
        )
        .then((res)=>res.json())
        .then((res)=>{
            return{
                options:res.data.map((city)=>{
                   return {
                      value:`${city.latitude} ${city.longitude}`,
                      label: `${city.name} , ${city.countryCode}`,
                   }
                })
            }
        })
        .catch((err)=>console.error(err));
    };

    return(
        <div className="searchbar-container">
             <div className="search">
                <AsyncPaginate
                   placeholder="Enter Location"
                   styles={customStyles}
                   debounceTimeout={600}
                   value={Search}
                   onChange={HandleOnChange}
                   loadOptions={loadOptions}
                />
             </div>
        </div>
    );

}

export default Searchbar;