import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
// MATERIAL UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* Additional Components */
import VisualContainer from './VisualContainer.js'

class App extends Component {
   render() {
      return(
      <div className="App">
        <MuiThemeProvider>
         <Router>
            <Route path="/" component={VisualContainer} />
         </Router>
         </MuiThemeProvider>
      </div>
      )
   }
}

export default App;