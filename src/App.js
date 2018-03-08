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
         year: 2000,
         uniqueYears: [],
         data: [],
         paused: false
      }
   };


   filterData(year) {

      var results = []
      data["PIG POPULATIONS"].forEach(function(item){
        if(item.year === year){
          results.push(item)
        }
      })

      this.setState({
      data: results
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

      this.setState({uniqueYears: uniqueYears})
   }


   componentDidMount () {

      //this.filterData(this.state.year) 
      this.changeData()
      var yearsArray = this.state.uniqueYears

      var i = -1;
      (function f(){
         i = (i+1) % yearsArray.length;
         this.filterData(yearsArray[i])
         setTimeout(f, 5000) 
      })

      // Run the Set time out in here 
      //this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);

   }

      // componentWillUnmount() {
   //   clearInterval(this.interval);
   // }
  
 


  render() {
   console.log(this.state)
    return (

      <div className="App">
      <Chart2 data = {this.state.data}/>
      </div>
    );
  }
}



export default App;