import React, { Component } from "react";
import './App.css';
/* Testing components */
// import CountyMap from './map.js'
import Chart2 from './barChart.js'
import ProgressBar from './progressBar.js'
/* Import Data */
// import * as testData from './test-data.json';
import * as data from './wild-pig-data.json';
// import * as mapData from './map.json';


class App extends Component {
   constructor(props){
      super(props)
      this.state = {
         yearIndex: 0,
         year: 2000,
         progress: 0,
         data: [],
         paused: false,
      }

      this.handleStop = this.handleStop.bind(this);
      this.handleRestart = this.handleRestart.bind(this);
   };


   filterData(year, uniqueYears) {

      var results = []
      data["PIG POPULATIONS"].forEach(function(item){
        if(item.year === year){
          results.push(item)
        }
      })

      var progressPercent = Number((this.state.yearIndex/(uniqueYears.length-1)*100).toFixed(0)


      this.setState({
      data: results,
      year: year,
      progress: progressPercent,
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
         this.filterData(uniqueYears[newIndex], uniqueYears) 

      }
      else {
         clearInterval(this.state.intervalId)
      }
   }


   componentDidMount () {
      this.changeData()
      
   }

   // componentWillUnmount() {
   //    clearInterval(this.timerID);
   // }

   handleStop (event){
      event.preventDefault();
      this.setState({paused: true})
      clearInterval(this.timerID);

   }

   handleRestart(event){
      event.preventDefault();
      this.timerID = setInterval(
            () => this.changeData(), 2000
      );
   }
 


  render() {
   console.log(this.state)
    return (

      <div className="App">
      <Chart2 data = {this.state.data}/>
      <div className="actions">
         <img className="actionButton" src="pause.png" onClick={this.handleStop}/>
         <img className="actionButton" src="play.png" onClick={this.handleRestart}/>
         <ProgressBar year={this.state.year} yearIndex = {this.state.yearIndex} progress={this.state.progress}/>
         
         </div>
      </div>
    );
  }
}



export default App;