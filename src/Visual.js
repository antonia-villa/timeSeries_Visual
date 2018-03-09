import React, { Component } from "react";

/* Additional Components */
import Chart from './barChart.js'
import ProgressBar from './progressBar.js'

/* Import Data */
import * as data from './wild-pig-data.json';

/* Used for Query URL Params */
import parseQueryString from 'query-string';

class Visual extends Component {
   constructor(props){
      super(props)
      this.state = {
      	uniqueYears: '',
         yearIndex: '',
         year: '',
         progress: 0,
         data: [],
         paused: ''
      }
      this.handlePause = this.handlePause.bind(this);
      this.handleStart = this.handleStart.bind(this);
      this.handleRestart = this.handleRestart.bind(this);
   };


// Filter data based on year to pass to Chart component
   filterData(year, uniqueYears) {

   	 // Select Sub-Data set from raw data based on year
      var results = []
      data["PIG POPULATIONS"].forEach(function(item){
        if(item.year === year){
          results.push(item)
        }
      })

      // Calculate Progress percent based on unique years in data set
      // Used to update for Progress Bar component
      var progressPercent = Number((this.state.yearIndex/(uniqueYears.length-1)*100).toFixed(0))

      // Update state
      this.setState({
      	data: results,
      	year: year,
      	progress: progressPercent,
      	yearIndex: this.state.yearIndex + 1
      })  
   }

   // Dynamically change dataset based on array of unique years
   changeData() {
   	  var uniqueYears = this.state.uniqueYears
      var newIndex = this.state.yearIndex;
 
      if(newIndex <= uniqueYears.length -1){
         this.filterData(uniqueYears[newIndex], uniqueYears) 
      }
   }


   componentDidMount () {

		var rawData = data["PIG POPULATIONS"]

		// Extract unique years from data set 
		var uniqueYears = [];
	    rawData.forEach(function(item){
	         if(!uniqueYears.includes(item.year)){
	            uniqueYears.push(item.year)
	         }
	      })

	    // Extract and parse query string parameters 
   		var queryParams = parseQueryString.parse(this.props.location.search);
		var year = queryParams.year
		var indexYear = uniqueYears.indexOf(Number(year))
		var paused = (queryParams.paused === 'true')
		
		// Set State and run interval
		this.setState({
			paused: paused,
			year: year,
			yearIndex: indexYear,
			uniqueYears: uniqueYears
		},
		() => {
			this.changeData(uniqueYears)
				if(!this.state.paused){
					this.timerID = setInterval(
	            		() => this.changeData(), 2000);    	
				}
			}
		)
	}


   handlePause (event){
      event.preventDefault();
      this.setState({paused: true})
      clearInterval(this.timerID);
   }

   handleStart(event){
      event.preventDefault();
      this.timerID = setInterval(
            () => this.changeData(), 2000
      );
   }

   handleRestart(event){
   	  event.preventDefault();
   	  this.setState({
   	  	paused: false,
   	  	year: 2000,
   	  	progress: 0,
   	  	yearIndex: 0
   	  })
   	        this.timerID = setInterval(
            () => this.changeData(), 2000
      );    
   }
   

  render() {
    return (

      <div className="App">
      <Chart data = {this.state.data}/>
      <div className="actions">
      	 <img className="actionButton" src="play.png" alt="Play" onClick={this.handleStart}/>
         <img className="actionButton" src="pause.png" alt="Pause" onClick={this.handlePause}/>
         <ProgressBar year={this.state.year} yearIndex={this.state.yearIndex} progress={this.state.progress}/>
         <img className="actionButton" src="restart.png" alt="Restart" onClick={this.handleRestart}/>
         </div>
      </div>
    );
  }
}



export default Visual;