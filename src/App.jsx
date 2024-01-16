import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {
  const [forecast, setForecast] = useState([])
  const makeApiCall = () => {
    axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=Cincinnati&days=5&alerts=yes`)
    .then(res => {
      console.log(res.data.forecast.forecastday)
      setForecast(res.data.forecast.forecastday)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div style={{display: 'flex'}}>
        { forecast ? forecast.map((f, i) => {
          return (
            <div key={i} style={{marginRight: '25px'}}>
              <p>{new Date(f.date).toLocaleDateString('en-us', {weekday: 'short', timeZone: 'UTC'})}</p>
              <p>H: {Math.round(f.day.maxtemp_f)}°</p>
              <p>L: {Math.round(f.day.mintemp_f)}°</p>
            </div>
          )
        }) : null }
      </div>
      <div className="card">
        <button onClick={makeApiCall}>
          Make API Call
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
