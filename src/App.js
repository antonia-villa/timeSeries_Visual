import React, { Component } from "react";
import './App.css';
/* Testing components */
// import CountyMap from './map.js'
import Chart2 from './barChart.js'
/* Import Data */
// import * as testData from './test-data.json';
import * as data from './wild-pig-data.json';
// import * as mapData from './map.json';


class App extends Component {
   constructor(props){
      super(props)
      this.state = {
         yearIndex: 0,
         data: [],
         paused: false,
      }

      this.handleStop = this.handleStop.bind(this);
      this.handleRestart = this.handleRestart.bind(this);
   };


   filterData(year) {

      var results = []
      data["PIG POPULATIONS"].forEach(function(item){
        if(item.year === year){
          results.push(item)
        }
      })

      this.setState({
      data: results,
      yearIndex: this.state.yearIndex + 1
      })  
   }

   changeData() {

      var rawData = data["PIG POPULATIONS"]
      var uniqueYears = [];
  
      rawData.forEach(function(item){
         if(!uniqueYears.includes(item.year)){
            uniqueYears.push(item.year)
         }
      })

      var newIndex = this.state.yearIndex;
      if(newIndex <= uniqueYears.length -1){
         this.filterData(uniqueYears[newIndex]) 

      }
      else {
         clearInterval(this.state.intervalId)
      }
   }


   componentDidMount () {

      //this.filterData(this.state.year) 
      this.changeData()
      // var yearsArray = this.state.uniqueYears


      // Run the Set time out in here 
      // this.timerId = setInterval( () => this.changeData, 2000);

      this.timerID = setInterval(
            () => this.changeData(),
      2000
    );
      

   }

   componentWillUnmount() {
      clearInterval(this.timerID);
   }

   handleStop (event){
      event.preventDefault();
      clearInterval(this.timerID);
   }

   handleRestart(event){
       event.preventDefault();
this.timerID = setInterval(
            () => this.changeData(),
      2000
    );

   }
 


  render() {
   console.log(this.state)
    return (

      <div className="App">
      <Chart2 data = {this.state.data}/>
      <div className="button" onClick={this.handleStop}> <h1>PAUSE THIS</h1> </div>
      <div className="button" onClick={this.handleRestart}> <h1>RESTART THIS</h1> </div>
      </div>
    );
  }
}



export default App;