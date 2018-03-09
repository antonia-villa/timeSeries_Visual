import React, { Component } from "react";
import './App.css';

class ProgressBar extends Component {
render(){
	console.log(this.props.allYears)
	if(this.props.allYears){
		const allYears = this.props.allYears.map(y => {
			return <div>{y}</div>
		})
	}

	const width = String(Number(this.props.progress)+"vw")

	const staticStyle = {
		backgroundColor: '#bcbcbc'
	}
	const progressStyle = {
		backgroundColor: '#0a536f',
		width: width
	}

	return(
		<div className="progressBarContainer"> 
			<div className="dataBar back" style={staticStyle}> </div>
			<div className="dataBar front" style={progressStyle}> </div>
			<div className="yearsArray">
			 	<h4>{allYears}</h4> 
			</div>
		</div>
		)
}

}

export default ProgressBar;