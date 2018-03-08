import React, { Component } from "react";
import './App.css';
/* Testing components */
// import CountyMap from './map.js'
import Chart2 from './barChart.js'
/* Import Data */
import * as testData from './test-data.json';
import * as mapData from './map.json';


class App extends Component {
   constructor(props){
      super(props)
      this.state = {
         map: {},
         population: {}
      }
   };


  componentWillMount(){
      // used to asynchronously load topojson maps and data{
      this.setState({
         map: mapData,
         population: testData["PIG POPULATIONS"]
      })
      
      
    }  
 


  render() {
    return (

      <div className="App">
      <Chart2 data = {this.state.population}/>
      </div>
    );
  }
}



export default App;