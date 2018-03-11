import React, { Component } from "react";
import './App.css';

class ProgressBar extends Component {
render(){

	// Calculate spacing of year text
	const yearSpacing = Math.floor((100/((this.props.allYears).length)))
	const yearSpaceStyle = {
		width: yearSpacing+'%'
	}

	const width = Number(this.props.progress)

	const whiteFont = {
		color:'#FFFFFF'
	}

	const allYears = this.props.allYears.map(y => {
		// Conditional Formatting to change font color of numbers
		let yearsArray = null;
	 	if(((this.props.allYears.indexOf(y)+1)*(yearSpacing))<=width){
			yearsArray = <p className="singleYearWhite" style={whiteFont}>{y}</p>
		} else {
			yearsArray = <p className="singleYear">{y}</p>
		}

		return <div key={y} style={yearSpaceStyle}>
			{yearsArray}
		</div>			
	})

	const staticStyle = {
		backgroundColor: '#e8e8e8',
	}

	const progressStyle = {
		backgroundColor: '#003a6d',
		width: width+'%',
		color:'#FFFFFF'
	}

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