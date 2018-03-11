import React, { Component } from "react";
import './App.css';

class ProgressBar extends Component {
render(){

	// Calculate spacing of 
	const yearSpacing = String(Math.floor((100/((this.props.allYears).length)))+'%')
	const yearSpaceStyle = {
		width: yearSpacing

	}
	console.log(yearSpacing)

	const allYears = this.props.allYears.map(y => {
			return <div key={y} style={yearSpaceStyle}><p className="singleYear">{y}</p></div>
	})


	const width = String(Number(this.props.progress)+"%")

	const staticStyle = {
		backgroundColor: '#e8e8e8',
		color: '#000000'
	}
	const progressStyle = {
		backgroundColor: '#003a6d',
		width: width
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