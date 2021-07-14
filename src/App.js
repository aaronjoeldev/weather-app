import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { waitForDomChange } from '@testing-library/react';

const api = {
  key: "05ba03a0f38094776b34f2b2a1d8f390",
  base: "https://api.openweathermap.org/data/2.5/"
}




function App() {
  const [query, setQuery]= useState('');
  const [weather, setWeather]= useState({});

  const search = evt => {
    if(evt.key === "Enter"){
      fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery("");
        setWeather(result);
        console.log(result);
      });
    }
  }
  const dateBuilder = (d) => {
    let months = ["Januar", "Febuar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "OKtober", "November", "Dezember"]
    let days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
 /* Check if night or day */
  var d = new Date();
  var n = d.getHours();
  var dtime = '';

  if(n > 7){
    if(n < 20){
      dtime = 'day';
    }else{
      dtime = 'night';
    }
  }else{
    dtime = 'night';
  }
  
/* Provide img srcs */ 

  const cloudy = require('./assets/cloudy.png');
  const cloudynight = require('./assets/cloudy-night.png');
  const clear = require('./assets/clear-night.png');
  const sunny = require('./assets/sunny.png');
  const rainy = require('./assets/rainy.png');

  function GetDates(startDate, daysToAdd) {
    var aryDates = [];

    for (var i = 0; i <= daysToAdd; i++) {
        var currentDate = new Date();
        currentDate.setDate(startDate.getDate() + i);
        aryDates.push(DayAsString(currentDate.getDay()) );
    }

    return aryDates;
}



function DayAsString(dayIndex) {
    var weekdays = new Array(7);
    weekdays[0] = "Sonntag";
    weekdays[1] = "Montag";
    weekdays[2] = "Dienstag";
    weekdays[3] = "Mittwoch";
    weekdays[4] = "Donnerstag";
    weekdays[5] = "Freitag";
    weekdays[6] = "Samstag";

    return weekdays[dayIndex];
}

var startDate = new Date();
var aryDates = GetDates(startDate, 7);



  return (
    <div className={(typeof weather.city != "undefined") 
    ? ((weather.list[0].main.temp > 16 && n > 7 && n <20)
    ? 'app warm' : (weather.list[0].main.temp< 16 && n > 7 && n <20)
    ? 'app cold' : 'app night')
     : 'app'}>
      <main>
        <div className="search-box">
          <input type="text" 
          className="search-bar" 
          placeholder="Seach..." 
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
      
        {(typeof weather.city != "undefined") ? (
        <div class="overview">
        <div className="anzeige">
          <div className="location-box">
          <div className="date">{dateBuilder(new Date())}</div>
            <div className="location">{weather.city.name}, {weather.city.country}</div>
            
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.list[0].main.temp)}°c
            </div>
            
          </div>
          <div className="weatherdes">
            <div className="weathericon">
              <img src={(weather.list[0].weather[0].main === 'Clear' && dtime === 'day') ? `${sunny}`: (weather.list[0].weather[0].main=== 'Rainy') ? `${rainy}` : (weather.list[0].weather[0].main === 'Cloudy' && dtime === 'day') ? `${cloudy}` : (weather.list[0].weather[0].main == 'Clear' && dtime === 'night') ? `${clear}` : `${cloudynight}`} />
            </div>
          <div className="weather">{weather.list[0].weather[0].main}</div>
          <div className="beschreibung">Die Höchsttemperatur heute wird {Math.round(weather.list[0].main.temp_max)}°c mit Windgeschwindigkeiten bis zu {weather.list[0].wind.speed} Km/H</div>
          </div>
        </div>
        <div className="forecast">
          <div className="day1">
            <div className="day">{aryDates[1]}</div>
            <img src={(weather.list[1].weather[0].main === 'Clear') ? `${sunny}`: (weather.list[0].weather[0].main=== 'Rainy') ? `${rainy}` : `${cloudy}`} />
            <div className="ftemp">{Math.round(weather.list[1].main.temp)}°c</div>
          </div>
          <div className="day2">
            <div className="day">{aryDates[2]}</div>
            <img src={(weather.list[2].weather[0].main === 'Clear') ? `${sunny}`: (weather.list[0].weather[0].main=== 'Rainy') ? `${rainy}` : `${cloudy}`} />
            <div className="ftemp">{Math.round(weather.list[2].main.temp)}°c</div>
          </div>
          <div className="day3">
            <div className="day">{aryDates[3]}</div>
            <img src={(weather.list[3].weather[0].main === 'Clear') ? `${sunny}`: (weather.list[0].weather[0].main=== 'Rainy') ? `${rainy}` : `${cloudy}`} />
            <div className="ftemp">{Math.round(weather.list[3].main.temp)}°c</div>
          </div>
          <div className="day4">
            <div className="day">{aryDates[4]}</div>
            <img src={(weather.list[4].weather[0].main === 'Clear') ? `${sunny}`: (weather.list[0].weather[0].main=== 'Rainy') ? `${rainy}` : `${cloudy}`} />
            <div className="ftemp">{Math.round(weather.list[4].main.temp)}°c</div>
          </div>
          <div className="day5">
            <div className="day">{aryDates[5]}</div>
            <img src={(weather.list[5].weather[0].main === 'Clear') ? `${sunny}`: (weather.list[0].weather[0].main=== 'Rainy') ? `${rainy}` : `${cloudy}`} />
            <div className="ftemp">{Math.round(weather.list[5].main.temp)}°c</div>
          </div>
        </div>
      </div>

        
        
        ) : ('')}
    </main>    
    </div>
  );
}

export default App;
