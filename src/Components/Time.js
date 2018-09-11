import React, { Component } from 'react';
import moment from 'moment'
class Time extends Component {
  state= {
    time: moment().format("dddd, MMM Do YYYY,h:mm:ss a")
  }
  componentDidMount(){
    setInterval(()=>{
      this.setState({time: moment().format("dddd, MMM Do YYYY,h:mm:ss a") })
    },1000)
  }
  render() {
    let day = this.state.time.split(',')[0];
    let date = this.state.time.split(',')[1];
    let time = this.state.time.split(',')[2];
      return (
        <div className="Time">
          <p>{day}</p>
          <p>{time}</p>
          <p>{date}</p>
        </div>
      );    
    }
}

export default Time;
