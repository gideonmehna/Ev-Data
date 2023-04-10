import logo from './logo.svg';
import './App.css';
import React, { Component, useEffect, useState } from 'react';
import axios from 'axios'
import Data from './Components/Data';
import BarChart from './Components/BarChart';

const WIDTH=1000;
const HEIGHT=700;
const dd = [
  {
    label: 'Happy',
    value: 4000,
  },
  {
    label: 'Sad',
    value: 2000,
  },
  {
    label: 'Angry',
    value: 3000,
  },
  {
    label: 'Joyful',
    value: 4500,
  },
  {
    label: 'Anxious',
    value: 7000,
  },
];
function App() {
  const [getMessage, setGetMessage] = useState({})

  useEffect(()=>{
    axios.get('http://localhost:5000/flask/ev-data').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>My Data Visualization Quick App</h3>
        <div class="intro">
        <p>I read about GBatteries and the work they do. I decided to do a quick Data Visualization app based on Flask and React with Vx. The data is loaded using an API call which is handled by Flask. </p>
        <p>Motivation: I looked for data about Electric Vehicles. And I decided to draw graphs concerning their battery system. Could some of this information enable GBatteries to know the demand or the companies whose batteries need to be tested? </p>
        
        </div>
        
        <div>{getMessage.status === 200 ?
          <div>
          <p class="underline">Car brands Versus Usable Phases</p>
        <Data  brands={getMessage.data.brands}data={getMessage.data.data} width={WIDTH} height={HEIGHT} argv={['ac_charger','usable_phases']}/>
        <p class="underline">Car brands Versus Max Battery Power</p>
        <Data brands={getMessage.data.brands}data={getMessage.data.data} width={WIDTH} height={HEIGHT} argv={['ac_charger','max_power']}/>
        <p class="underline">Car brands Versus Usable Battery Size</p>
        <Data brands={getMessage.data.brands}data={getMessage.data.data} width={WIDTH} height={HEIGHT} argv={['usable_battery_size']}/>
        <p class="underline">Car brands Versus Average Energy Consumption</p>
        <Data brands={getMessage.data.brands}data={getMessage.data.data} width={WIDTH} height={HEIGHT} argv={['energy_consumption','average_consumption']}/>
        </div>
        :
        <h1>Loading</h1>}
        </div>
        <p>Original BarChart</p>
        <BarChart data={dd} width={WIDTH} height={HEIGHT}/>
        <div>{getMessage.status === 200 ? 
        <div>
          <p> My Sources of help:<a href="https://joelmturner.com/blog/data-vis-react-bar-chart-vx" class="link">Tutorial of creating a Bar Chart with Vx</a>. </p>
          <p> My Sources of help:<a href="https://towardsdatascience.com/build-deploy-a-react-flask-app-47a89a5d17d9" class="link">Setting up a Flask and React App</a>. </p>
          
          </div>
          :
          <h3>LOADING</h3>}</div>
        <p>
          Data obtained from <a href="https://github.com/chargeprice/open-ev-data" class="link">Open Ev - Data</a>.
        </p>
        
      </header>
    </div>
  );
}

export default App;
