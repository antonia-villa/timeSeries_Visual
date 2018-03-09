import React, { Component } from "react";
import './App.css';

class ProgressBar extends Component {
render(){
	const style = { 
		height: "5em"
	}

	const width = String(Number(this.props.progress)+"vw")
console.log(width)
	return(

		<div className="progressBarContainer"> 
		<h1>{this.props.year}</h1>
		<svg width="100%" height="50" style={style}>
  			<rect width="100vw" height="10" fill="#ccc" rx="0" ry="0"></rect>
  			<rect width={width} height="10" fill="#0078bc" rx="0" ry="0"></rect>
  		</svg>
		</div>
		)
}

}

export default ProgressBar;