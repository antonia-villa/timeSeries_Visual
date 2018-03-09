import React, { Component } from "react";
import './App.css';

/* Additional Components */
import Chart2 from './barChart.js'
import ProgressBar from './progressBar.js'
/* Import Data */
import * as data from './wild-pig-data.json';

/* Used for Query URL Params */
import qs from 'query-string';
import parseQueryString from 'query-string';

class Visual extends Component {
   constructor(props){
      super(props)
      this.state = {
         yearIndex: '',
         year: '',
         progress: 0,
         data: [],
         paused: '',
         uniqueYears: ''
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

      var progressPercent = Number((this.state.yearIndex/(uniqueYears.length-1)*100).toFixed(0))


      this.setState({
      data: results,
      year: year,
      progress: progressPercent,
      yearIndex: this.state.yearIndex + 1
      })  
   }

   changeData() {
   	  var uniqueYears = this.state.uniqueYears
      var newIndex = this.state.yearIndex;
      if(newIndex <= uniqueYears.length -1){
         this.filterData(uniqueYears[newIndex], uniqueYears) 

      }
      else {
         clearInterval(this.state.intervalId)
      }
   }


   componentDidMount () {

		var rawData = data["PIG POPULATIONS"]
		var uniqueYears = [];
  
	      rawData.forEach(function(item){
	         if(!uniqueYears.includes(item.year)){
	            uniqueYears.push(item.year)
	         }
	      })


   		var queryString = this.props.location.search;
		var queryParams = parseQueryString.parse(queryString);
		var year = queryParams.year
		var indexYear = uniqueYears.indexOf(Number(year))

		console.log('year', year)
		console.log('indexYear', indexYear)
		var paused = (queryParams.paused == 'true')
		console.log('paused', paused)
	
			this.setState({
				paused: paused,
				year: year,
				yearIndex: indexYear,
				uniqueYears: uniqueYears
			},
				() => {
					this.changeData(uniqueYears)

						console.log('outside')
						if(!this.state.paused){
							console.log('test')
							this.timerID = setInterval(
			            		() => this.changeData(), 2000);    	
						
						}
				}

			)
		
		  
   }


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



export default Visual;