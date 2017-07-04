import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

React.createElement
const PRODUCTS = [ {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}];
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
        <UserInfoForm />
        <Calculator />
        <SplitPane left={<p>left</p>} right={<p>right</p>}></SplitPane>
        <ProductFilter products={PRODUCTS}/>
      </div>
    );
  };
}
class ProductFilter extends Component{
  constructor(props) {
    super(props);
    this.handleSearchInputChanged = this.handleSearchInputChanged.bind(this);
    this.handleStockInputChanged = this.handleStockInputChanged.bind(this);
    this.state = {
      filterText:'',
      inStockOnly:false
    }
  }
  handleSearchInputChanged(value){
    this.setState({
      filterText:value
    });
  }
  handleStockInputChanged(checked){
    this.setState({
      inStockOnly:checked
    });
  }
  render(){
    return(
      <div>
        <SearchInput filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} onValueChange={this.handleSearchInputChanged} onStockInputChanged={this.handleStockInputChanged} />
        <ProductResultTable products={this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly}  />
      </div>
    )
  }
}
class SearchInput extends Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleStockInputChange = this.handleStockInputChange.bind(this);
  }
  render(){
    return (
      <form>
      <input type='text' placeholder="Search..." value={this.props.filterText} onChange={this.handleChange} />
      <p><input type='checkbox' onChange={this.handleStockInputChange} checked={this.props.inStockOnly} />Only show products in stock</p>
      </form>
    )
  }
  handleChange(event){
    this.props.onValueChange(event.target.value);
  }
  handleStockInputChange(event){
    this.props.onStockInputChanged(event.target.checked);
  }
}
class ProductResultTable extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    var rows = [];
    var lastCategory = null;
    var that = this;
    this.props.products.forEach((product)=>{
      if(product.name.indexOf(that.props.filterText) === -1 || (!product.stocked && that.props.inStockOnly)){
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category}/>);
      }
      rows.push(<ProductRow product={product} key={product.name}/>);
      lastCategory = product.name;
    });
    return(
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
    )
  }
}
class ProductCategoryRow extends Component{
  render(){
    return(
      <tr><th colSpan="2">{this.props.category}</th></tr>
    )
  }
}
class ProductRow extends Component{
  render(){
    var name = this.props.product.stocked ? this.props.product.name : <span style={{color:'red'}}>{this.props.product.name}</span>
    return(
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    )
  }
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
      return (<li key={value.toString()+idx}><Outline outline={value}/></li>)
    });
    return (
      <ul>
        {outlineItems}
      </ul>
    );
  }
}
class UserInfoForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
    this.setState({
      value:event.target.value
    });
  }
  handleSubmit(event){
    alert('A name was submitted: '+ this.state.value);
    event.preventDefault();
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
        Name:
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
const scaleNames = {
  c:'Celsius',
  f:'Fahrenheit'
}
class TemperatureInput extends Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    this.props.onTemperatureChange(event.target.value);
  }
  render(){
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return(
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input onChange={this.handleChange} value={temperature}/>
      </fieldset>
    );
  }
}
class Calculator extends Component{
  constructor(props) {
    super(props);
    this.state = {
      temperature:'',
      scale:'c'
    };
    this.handleCelsiusChange=this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange=this.handleFahrenheitChange.bind(this);
  }
  handleCelsiusChange(temperature){
    this.setState({
      scale:'c',
      temperature:temperature
    })
  }
  handleFahrenheitChange(temperature){
    this.setState({
      scale:'f',
      temperature:temperature
    });
  }
  render(){
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature,toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature,toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput scale='c' onTemperatureChange = {this.handleCelsiusChange} temperature={celsius} />
        <TemperatureInput scale='f' onTemperatureChange = {this.handleFahrenheitChange} temperature={fahrenheit} />
      </div>
    );
  }
}
function toCelsius(fahrenheit){
  return (fahrenheit-32) * 5 / 9;
}
function toFahrenheit(celsius){
  return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature,convert){
  const input = parseFloat(temperature);
  if (Number.isNaN(input)){
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class SplitPane extends Component{
  render(){
    return(
      <div>
        <div>
          {this.props.left}
        </div>
        <div>
          {this.props.right}
        </div>
      </div>
    )
  }
}

export {Welcome, App as default, MyDate, DateFormatted};
// export default App;