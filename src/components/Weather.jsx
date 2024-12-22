import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

    const inputRef = useRef()

    const [WeatherData,setWeatherData] = useState(false)

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "010d": rain_icon,
        "010n": rain_icon,
        "013d": snow_icon,
        "013n": snow_icon,
    }

    const searchData = async (city)=>{
        if(city === ""){
            alert("Enter City Name")
            return;
        }
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5875993931d66ab4a3b16898d3448ce2`)
        const data = response.data

        console.log(data);
        const icon = allIcons[data.weather[0].icon ]
        setWeatherData({
            humidity:data.main.humidity,
            windspeed:data.wind.speed,
            temperature: data.main.temp,
            location:data.name,
            icon: icon
        })
    }

    useEffect(()=>{
        searchData("London")
    },[])

  return (
    <div className='flex justify-center items-center'>
        <div className="weather bg-violet-800 w-[25vw] h-[70vh] rounded-xl">
            <div className="header flex items-center justify-evenly mt-7">
                <input ref={inputRef} className='py-2 px-4 border-none pl-8 font-normal text-lg rounded-full outline-none' type="text" placeholder='Search'/>
                <div onClick={()=>{searchData(inputRef.current.value)}} className="search-box rounded-full cursor-pointer  bg-white px-4 py-3">
                <i className="ri-search-line"></i>
                </div>
            </div>
            <div className='middle text-white flex flex-col items-center mt-8'>
            <img className='w-[160px]' src={WeatherData.icon} alt="" />
            <p className="temprature">{WeatherData.temperature}°C</p>
            <h1>{WeatherData.location}</h1>
            </div>
            <div className="last-div text-white flex items-center justify-around mt-24">
                <div className="humidity flex items-center gap-3">
                    <img className='h-[30px]' src={humidity_icon} alt="" />
                    <div className="data">
                        <p>{WeatherData.humidity}</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div className="wind-speed flex items-center gap-3">
                <img src={wind_icon} alt="" />
                    <div className="data">
                        <p>{WeatherData.windspeed} Km/h</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather