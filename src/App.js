import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=70109a581b05ddabaeea2b482d55edb1&units=metric`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    } 
  }

  return (
    <div className="App">
      <div className="search">
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder='Enter Location'
        type="text" />
      </div>
      {data.name !== undefined &&
        <div className="container">
        <div className="top">
          <div className="left">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h2>{data.main.temp}°C</h2> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
              {data.weather ? <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="icon" /> : null}
            </div>
          </div>
          <div className="right">
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed} m/h</p> : null}
              <p>Wind Speed</p>
            </div>
            <div className="wind-direction">
             {data.wind ? <p className="bold">{data.wind.deg}°</p> : null}
              <p>Wind Direction</p>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="pressure">
            {data.main ? <p className='bold'>{data.main.pressure}</p> : null}
            <p>Pressure</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export default App;
