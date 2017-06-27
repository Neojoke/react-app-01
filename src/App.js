import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

React.createElement

class App extends Component {
  render() {
    const outline = {
      title: "a1",
      items: [
        {
          title: "b1",
          items: [
            {
              title: "c1"
            }
          ]
        }, {
          title: "b2",
          items: [
            {
              title: "c1"
            }
          ]
        }, {
          title: "b2",
          items: [
            {
              title: "c1"
            }
          ]
        }
      ]
    };
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit
          <code>src/App.js</code>
          and save to reload.
        </p>
        <Welcome name={this.props.name}/>
        <MyDate/>
        <Toggle/>
        <Mailbox unreadMessage={['o', '2', '3']}/>
        <Outline outline={outline}/>
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
    this.state = {
      date: new Date()
    }
  }
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick();
    }, 100);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState((prevState, props) => ({date: new Date()}));
  }
  render() {
    return <DateFormatted date={this.state.date}/>
  }
}
class DateFormatted extends Component {
  render() {
    return (
      <p>{this
          .props
          .date
          .toLocaleTimeString()}</p>
    );
  }
}

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    };
    this.handleClick = this
      .handleClick
      .bind(this);
  }
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn
          ? 'ON'
          : 'OFF'}
      </button>
    );
  }
}

class Mailbox extends Component {
  render() {
    const unreadMessage = this.props.unreadMessage;
    return (
      <div>
        <h1>Hello!</h1>
        {(unreadMessage.length > 0)
          ? (
            <h2>
              You have {unreadMessage.length}
              unread messages.</h2>
          )
          : null}
      </div>
    );
  }
}
class WarningBanner extends Component {
  render() {
    if (this.props.warn) {
      return (
        <div className="warning"></div>
      );
    }
    return null;
  }
}
class Outline extends Component {
  render() {
    const outline = this.props.outline;
    return (
      <div>
        <p>{outline.title}</p>
        {((outline.items != null)&&(outline.items.length > 0))
          ? (<OutlineItems items={outline.items}/>)
          : null}
      </div>
    );
  }
}
class OutlineItems extends Component {
  render() {
    const objs = this.props.items;
    const outlineItems = objs.map((value,idx) => {
      return (<li key={value.toString()+idx}><Outline  outline={value}/></li>)
    });
    return (
      <ul>
        {outlineItems}
      </ul>
    );
  }
}
export {Welcome, App as default, MyDate, DateFormatted};
// export default App;