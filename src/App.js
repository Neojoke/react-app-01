import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

React.createElement

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Welcome name={this.props.name} />
        <MyDate/>
      </div>
    );
  };
}

class Welcome extends Component {
  render() {
    return (
      <div>
          <p>Hello {this.props.name}</p>
      </div>
    );
  }
}

class MyDate extends Component {
  constructor(props) {
    super(props);
    this.state = {date:new Date()}
  }
  componentDidMount () {
    this.timerID = setInterval(() => {
      this.tick();
    }, 100);
  }
  componentWillUnmount () {
    clearInterval(this.timerID);
  }
  tick(){
    this.setState((prevState,props)=>(
      {
        date:new Date()
      }
    ));
  }
  render () {
    return (
      <p>Current Date is: {this.state.date.toLocaleTimeString()}</p>
    )
  }
}

export {Welcome,App as default,MyDate};
// export default App;
