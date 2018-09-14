import React, { Component } from 'react'
import keys from '../Appkey'
import {GoogleMap, Marker, withGoogleMap } from 'react-google-maps'
class Map extends Component {
  constructor(props){
    super(props)
    this.ref_Place = React.createRef()
  }
  state = {
   mode: '1',
   direction: false,
   place : 'Kauppakartanonkuja+3C'
  }
  componentWillMount(){
    this.setState({findingSRC: this.state.findingSRC+ '&key=' + keys.gMap})

  }
  componentDidMount(){
    // if(navigator.geolocation)
    // {
    //   navigator.geolocation.getCurrentPosition((position)=>{
    //     this.setState({lat: position.coords.latitude,lng:position.coords.longitude})
    //   })
    // }
  }
  _handleOptions(event) {
    this.setState({mode: event.target.value})

  }
  finding = () => {
    let newPlace = this.ref_Place.current.value.replace(' ','+')
    this.setState({place: newPlace})
  }
  findingComponent() {
    return (
      <iframe  frameBorder="0" height="100%" style={{border:0, width: '100%', height:'100%'}} 
      src={`https://www.google.com/maps/embed/v1/search?q=${this.state.place}&key=${keys.gMap}`} 
      allowFullScreen></iframe> 
    )
  }
  renderFindingMode(){
   return (
     <div id="findingContainer">
       <div className="params">
             <input placeholder="Place / Address" ref={this.ref_Place}></input>
             <div onClick={this.finding} >Show</div>
       </div>
      {this.findingComponent()}
     </div>
   ) 
  }
  renderDirectionMode(){
    let isDirected = this.state.direction
    return (
      <div id="findingContainer">
         <iframe  frameBorder="0"style={{border:0, width: '100%', height:'100%', padding:'30px 0'}} 
      src={`https://beta.digitransit.fi/`}
      allow="geolocation *;"
      allowFullScreen></iframe> 
      </div>
    ) 
   }
  render() {
    let mode = this.state.mode

    return (
      <div className="Map">
        <div id="options">
            <div onTouchStart={e =>this._handleOptions(e)} onClick={ e =>this._handleOptions(e) }>
              <input type="radio" name="type" id="find" value="1" defaultChecked/>
              <label htmlFor="find">Find</label>
            </div>
            <div onTouchStart={e =>this._handleOptions(e)} onClick={ e =>this._handleOptions(e) }>
              <input type="radio" name="type" id="direction" value="2" />
              <label htmlFor="direction">Direction</label>
            </div>
        </div>
        {mode === '1' ? this.renderFindingMode() : this.renderDirectionMode()}
      </div>
    );
  }
}

export default Map;
  
