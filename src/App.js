import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

/* Additional Components */
import VisualContainer from './VisualContainer.js'

class App extends Component {
   render() {
      return(
      <div className="App">
         <Router>
            <Route path="/" component={VisualContainer} />
         </Router>
      </div>
      )
   }
}

export default App;