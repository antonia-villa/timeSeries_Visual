import React, { Component } from "react";
import './App.css';

class ProgressBar extends Component {
render(){
	return(
		

		<div className="button"> 
		<h1>{this.props.year}</h1>
		<svg width="100" height="10">
  <rect width="100" height="10" fill="#ccc" rx="0" ry="0"></rect>
  <rect width={this.props.progress} height="10" fill="#0078bc" rx="0" ry="0"></rect></svg>
		</div>
		)
}

}

export default ProgressBar;