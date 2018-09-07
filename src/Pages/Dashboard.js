import React, { Component } from 'react';
import Time from '../Components/Time'
import Icon1 from '../Image/Icon1.png';
import Icon2 from '../Image/Icon2.png';
import Icon3 from '../Image/Icon3.png';
import Icon4 from '../Image/Icon4.png';
class Dashboard extends Component {
  render() {
    let temp = this.props.temp
    return (
      <div className="Dashboard">
        <a href="#" className="icon-1">
          {/* <img src={Icon1}></img> */}
          <h1>{temp}°C</h1>
          <span>Weather</span>
        </a>
        <a href="#" className="icon-2">
        <img src={Icon2}></img>
        
        <span>Twitter</span>
        </a>
        <a href="#" className="icon-3">
        <img src={Icon3}></img>
        
        <span>Reminder</span>
        </a>
        <a href="#" className="icon-4">
        <img src={Icon4}></img>
        
        <span>Notes</span>
        </a>
        <Time></Time>
      </div>
    );
  }
}

export default Dashboard;
