import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

/* Additional Components */
import Visual from './Visual.js'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      selected_dream_data: {}
    }
   }

   render() {
      return(
      <div className="App">
          <Router>

          <Route path="/" component={Visual} />
            </Router>
        </div>
        )
   }
}

export default App;