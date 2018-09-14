import React, { Component } from 'react';
import Time from '../Components/Time'
import Icon1 from '../Image/Icon1.png';
import Icon2 from '../Image/Icon2.png';
import Icon3 from '../Image/Icon3.png';
import Icon4 from '../Image/Icon4.png';
import {Route, Link} from 'react-router-dom'
class Dashboard extends Component {
  render() {
    let temp = this.props.temp
    return (
      <div className="Dashboard">
        <Link to="/weather" className="icon-1">
          {/* <img src={Icon1}></img> */}
          <h1>{temp}°C</h1>
          <span>Weather</span>
        </Link>
        <Link to="/news" className="icon-2">
          <img src={Icon2}></img>
          <span>News</span>
        </Link>
        <Link to="#" className="icon-3">
          <img src={Icon3}></img>
          <span>Reminder</span>
        </Link>
        <Link to="/map" className="icon-4">
          <img src={Icon4}></img>
          <span>Map</span>
        </Link>
        <Time></Time>
      </div>
    );
  }
}

export default Dashboard;
