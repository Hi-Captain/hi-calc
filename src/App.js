import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      numBtn: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      operBtn: ['+', '-', '*', '/', '='],
      view: '0',
      prev: '0',
      operator: '+',
      willClear: false,
      decimal: false,
    }
  }
  componentDidUpdate(){
    if(this.state.willClear){
      if(this.state.view.length > 13){
        this.setState({
          view: "0"
        })
        alert("표시할 수 없는 범위를 초과하였습니다. 표시 최대 범위는 13자리 입니다.") 
      }
      if(this.state.view > 9999999999999){
        this.setState({
          view: "0"
        })
        alert("계산할 수 있는 범위를 초과하였습니다. 계산 최대 범위는 9999999999입니다.") 
      }
    } else {
      if(this.state.view.length > 10){
        this._delete()
        alert("입력값 초과입니다. 입력 최대값은 10자리 입니다.")
      }
    }
    if(this.state.view === '' || this.state.view === 'NaN'){
      this.setState({
        view: '0'
      })
    }
  }
  render() {
    return (
      <div>
        <section className="hiCalc">
          <div className="display">{this.state.view}</div>
          <div className="btnWrapper">
            <div className="numBox">
            {this.state.numBtn.map((num, i)=>{
                return (
                  <button className="btn numbtn number" value={num} key={i} onClick={this._pressNumBtn}>{num}</button>
                )
              })}
              <button className="btn numbtn" value="." onClick={this._pressDecBtn}>.</button>
              <button className="btn numbtn number" value="0" onClick={this._pressNumBtn}>0</button>
              <button className="btn numbtn" onClick={this._delete}>del</button>
              <button className="btn numbtn" onClick={this._clear}>clear</button>
            </div>
            <div className="operBox">
              {this.state.operBtn.map((operator, i)=>{
                return (
                  <button className="btn operbtn" value={operator} key={i} onClick={this._pressOperBtn}>{operator}</button>
                )
              })}
            </div>
          </div>
        </section>
        <div>prev: {this.state.prev}</div>
        <div>operator: {this.state.operator}</div>
        <div>willClear: {this.state.willClear.toString()}</div>
        <div>decimal: {this.state.decimal.toString()}</div>
        <div>veiwlength: {this.state.view.length}</div>
      </div>
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
      view: eval(this.state.prev + this.state.operator + this.state.view).toString(),
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
      if(this.state.view.substr(this.state.view.length-1) === '.' ){
       this.setState({
         decimal: false
       }) 
      }
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
      willClear: false,
      decimal: false
    })
  }
}

export default App;
