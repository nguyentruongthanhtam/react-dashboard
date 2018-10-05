import React, { Component }  from 'react';
import Time from '../Components/Time';
class Weather extends Component {
  renderTemperature(temp){
    return(
      <span style={{fontSize: '3em',fontWeight: "600"}}>{temp?temp:'0'}°c</span>
      )
    }
    render() {
    let weather = this.props.weather
    
    let temp = this.props.temp
    return (
      <div className="Weather Content-Wrapper">
        
          <Time></Time>
        
        <h1>A WONDERFUL DAY WITH {weather}</h1>      
          {this.renderTemperature(temp)}
      </div>
    );
  }
}

export default Weather;
  
