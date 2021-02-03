import React, { useState } from 'react';

//api from openweathermap.org
const api ={
  //personal key - b.b.prasandika
  key:"805e908c6225ade5be39b09204a907c8",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery(''); 
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    
    //assigning days of 
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    //assigning months
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    //day , moth , year pattern
    return `${year} ${month} ${date+","} ${day}`
  }

  //returning
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"

            //search area
            placeholder="SEARCH BY CITY NAME"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          
        </div>
        
        
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="loc-area">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>

    
  );

  

}

//exporting
export default App;
