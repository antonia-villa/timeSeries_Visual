import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';


class ProgressBar extends Component {


  componentDidMount() {
    this.timer = setTimeout(() => this.progress(this.state.progress), 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  componentWillMount(){
    var mode = '';
    console.log(this.props.paused)
    if(this.props.paused == true){
      mode = 'indeterminate'
    } else {
      mode = 'determinate'
    }

    this.setState({mode: mode})

  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      
      this.timer = setTimeout(() => this.progress(this.state.completed), 2000);
    }
  }

  render() {
    
    console.log(this.state)
    return (
      <LinearProgress color="orange" mode="determinate"  value={this.state.completed} />
    );
  }
}

export default ProgressBar;