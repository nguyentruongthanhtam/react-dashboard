import React, { Component } from 'react';
import Dashboard from './Pages/Dashboard'
import Weather from './Components/Weather'
import appId from './Appkey'
import './App.css';

class App extends Component {
  state = {
    currentWeather: null,
    city: 'Helsinki'
  }
  componentDidMount(){
    this.setState({currentWeather: this.getWeatherData(this.state.city,'°C')})
  }
  render() {
    let weather = '',temp = ''
    if(this.state.currentWeather)
    {
      weather = this.state.currentWeather.weather[0].main
      temp = this.state.currentWeather.main.temp
    }
    return (
      <div className="App">
        <header className="City_name">
          <h2>HELSINKI</h2>
        </header>
        <Weather weather={weather}/>
        <Dashboard temp={temp}/>
      </div>
    );
  }
  getWeatherData (city,unit){
    const queryUnit = unit==='°C' ? 'metric' : 'imperial';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appId=${appId}&units=${queryUnit}`)
    .then(res => res.json())
    .then(data => {
        this.setState({
            currentWeather: data
        })
        console.log(data);
    }).catch(error=>{
        this.setState({city: 'Error or incorrect city'})
    })     
    // fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appId=${appId}&units=${queryUnit}`)
    // .then(res => res.json())
    // .then(data => {
    //     var forecastArray = [];
    //     var step = 8; // get the forecast at the same hour
    //     for(var i=0 ;i<data.list.length; i+=step){
    //         forecastArray.push(data.list[i]);
    //     }
    //     this.setState({
    //         forecast: forecastArray
    //     })
    // })
    .catch(error=>{
        this.setState({city: 'Error or incorrect city'})
    })     
  }
}

export default App;
