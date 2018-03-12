import React, { Component } from "react";
import './App.css';

class ProgressBar extends Component {
render(){

	// Calculate spacing of year text based on length of years array
	const yearSpacing = Math.floor((100/((this.props.allYears).length)))
	const yearSpaceStyle = {
		width: yearSpacing+'%'
	}

	const width = Number(this.props.progress)

	// Define styles for conditional formatting of progress bar
	// Font Styles
	const whiteFont = {
		color:'#FFFFFF'
	}
	const boldFont = {
		 fontWeight: 'bold'
	}
	// Bar Style
	const staticStyle = {
		backgroundColor: '#e8e8e8',
	}

	const progressStyle = {
		backgroundColor: '#003a6d',
		width: width+'%',
		color:'#FFFFFF'
	}

	// Conditional Formatting to change font color and weight of font with progress bar
	const allYears = this.props.allYears.map(y => {
		let yearsArray = null;
		const indexOfY = this.props.allYears.indexOf(y)
		const spacing = (100/(this.props.allYears.length-1))

		// Current Year on display
	 	if(this.props.allYears.indexOf(y)*spacing === width){
	 		yearsArray = <p className="singleYearWhite" style={boldFont}>{y}</p>
	 	}
	 	// Previous Years Displayed
	 	else if (this.props.allYears.indexOf(y)*spacing < width) {
			yearsArray = <p className="singleYearWhite" style={whiteFont}>{y}</p>
		} 
		// Upcoming Years to be displayed
		else {
			yearsArray = <p className="singleYear">{y}</p>
		}

		return <div key={y} style={yearSpaceStyle}>
			{yearsArray}
		</div>			
	})

	return(
		<div className="progressBarContainer"> 
			<div className="dataBar back" style={staticStyle}> </div>
			<div className="dataBar front" style={progressStyle}> </div>
			<div className="yearsArray">
			 	{allYears}
			</div>
		</div>
		)
	}
}

export default ProgressBar;