import React, { Component } from "react";

/* Additional Components */
import Chart from './barChart.js'
// import ProgressBar from './progressBar.js'
import ProgressBar from './progressBar.js'

/* Import Data */
import * as data from './wild-pig-data.json';
/* Import Data cleansing function */
import {uniqueValues} from './dataCleansing.js'

/* Used for Query URL Params */
import parseQueryString from 'query-string';

class VisualContainer extends Component {
   constructor(props){
      super(props)
      this.state = {
      	allData: data["PIG POPULATIONS"],
      	uniqueYears: uniqueValues(data["PIG POPULATIONS"]),
        initialYear: '',
        initialYearIndex: '',
        initialProgress: '',
        initialPausedState: '',
        yearIndex: '',
        year: '',
        progress: '',
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
      this.state.allData.forEach(function(item){
        if(item.year === year){
          results.push(item)
        }
      })

      // Calculate Progress percent based on unique years in data set
      // Used to update for Progress Bar component
      var progressPercent = Number((this.state.yearIndex/(uniqueYears.length-1)*100).toFixed(0))

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


	componentWillMount(){
		// Extract and parse query string parameters 
   		var queryParams = parseQueryString.parse(this.props.location.search);
		var year = queryParams.year
		var indexYear = this.state.uniqueYears.indexOf(Number(year))
		var paused = (queryParams.paused === 'true')

		var progressPercent = Number((indexYear/(this.state.uniqueYears.length-1)*100).toFixed(0))
		
		// Set State and run interval
		this.setState({
			initialYear: year,
        	initialYearIndex: indexYear,
        	initialProgress: progressPercent,
        	initialPausedState: paused,
			year: year,
			yearIndex: indexYear,
			progress: progressPercent,
			paused: paused
		},() => {
			this.changeData(this.state.uniqueYears)
				if(!this.state.paused){
					this.timerID = setInterval(
	            		() => this.changeData(), 2000);    	
				}
			})
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
   	  	paused: this.state.initialPausedState,
   	  	year: this.state.initialYear,
   	  	progress: this.state.initialProgress,
   	  	yearIndex: this.state.initialYearIndex
   	  })
   }
   

  render() {
    return (
    <div className="visualBackground">
	    <div className="visualContainer">
	    	<div className="titleContainer">
	    		<h1 className="title">Hawaiian Wild Pig Population</h1>
	    		<h2 className="subtitle">Distribution by Island: 2001-2005</h2>
		    </div>
		    <Chart data = {this.state.data}/>
		    <div className="actions">
			  	<div id="startButtons">
			      	<img className="actionButton" src="play.png" alt="Play" onClick={this.handleStart}/>
			        <img className="actionButton" src="pause.png" alt="Pause" onClick={this.handlePause}/>
			    </div> 
		        <div className="progressBar">
		       		<ProgressBar year={this.state.year} yearIndex={this.state.yearIndex} progress={this.state.progress} allYears={this.state.uniqueYears} />
		        </div>
		       <div id="replayButton"> 
		        	<img className="actionButton" src="restart.png" alt="Restart" onClick={this.handleRestart}/>
		        </div>
		    </div>
		    <div className="footer">
		    	<p>NOTE: The data displayed represents the percent distribution of the total pig population of Hawaii by island by year.</p>
		    </div>
		</div>
	</div>
    );
  }
}

export default VisualContainer;