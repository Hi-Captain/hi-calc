import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      numBtn: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      operBtn: ['+', '-', '*', '/', '='],
      view: '0',
      prev: '0',
      operator: '+',
      willClear: false,
      decimal: false,
    }
  }

  render() {
    return (
      <section className="hiCalc">
        <div className="display">{this.state.view}</div>
        <div className="display">prev: {this.state.prev}</div>
        <div className="display">operator: {this.state.operator}</div>
        <div className="display">willClear: {this.state.willClear.toString()}</div>
        <div className="display">decimal: {this.state.decimal.toString()}</div>
          {this.state.numBtn.map((num, i)=>{
            return (
              <button id={'num' + i} value={num} key={i} onClick={this._pressNumBtn}>{num}</button>
            )
          })}
          <button id="decBtn" value="." onClick={this._pressDecBtn}>.</button>
          {this.state.operBtn.map((operator, i)=>{
            return (
              <button id={'op' + i} value={operator} key={i} onClick={this._pressOperBtn}>{operator}</button>
            )
          })}
          <button onClick={this._delete}>del</button>
          <button onClick={this._clear}>clear</button>
      </section>
    );
  }
  _pressNumBtn = (e) => {
    if(this.state.view === '0' || this.state.willClear){
      this.setState({
        view: e.target.value,
        prev: this.state.view,
        willClear: false
      })
    } else {
      this.setState({
        view: this.state.view + e.target.value
      })
    }
  }
  _pressOperBtn = (e) => {
    this.setState({
      view: eval(this.state.prev + this.state.operator + this.state.view),
      prev: this.state.view,
      operator: e.target.value,
      willClear: true,
      decimal: false
    })
    if(e.target.value === '='){
      this.setState({
        prev: '0',
        operator: '+',
      })
    }
  }
  _pressDecBtn = (e) => {
    if(this.state.decimal === false && this.state.willClear === false){
      this.setState({
        view: this.state.view + '.',
        willClear: false,
        decimal: true
      })
    } else if (this.state.willClear) {
      this.setState({
        view: '0.',
        willClear: false,
        decimal: true
      })
    }
  }
  _delete = (e) => {
    if(this.state.view !== "0"){
      this.setState({
        view: this.state.view.slice(0, -1)
      })
    }
  }
  _clear = (e) => {
    this.setState({
      view: '0',
      prev: '0',
      operator: '+',
      willClear: false
    })
  }
}

export default App;
