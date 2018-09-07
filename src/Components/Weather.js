import React, { Component } from 'react';
class Weather extends Component {
  render() {
    let weather = this.props.weather
    return (
      <div className="Weather">
        <h1>A WONDERFUL DAY WITH {weather}</h1>      
      </div>
    );
  }
}

export default Weather;
  
