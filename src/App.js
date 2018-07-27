import React, { Component } from 'react';
import './App.css';

const limit_calc = 9999999999999
const limit_display = 13
const limit_input = 10

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
      calculating: false,
      decimal: false
    }
  }
  componentDidUpdate(){
    //계산중 NaN, 빈문자열 발생시 초기화
    if(this.state.view === "" || this.state.view === "NaN"){
      this.setState({
        view: "0"
      })
    }

    //표시범위, 연산범위 초과시 초기화 && 입력범위 초과시 마지막 입력값 삭제
    if(this.state.willClear){
      if(this.state.view.length > limit_display){
        this._clear()
        alert("표시할 수 없는 범위를 초과하였습니다. 최대 표시 범위는" + limit_display + "자리 입니다.") 
      }
      if(this.state.view > limit_calc){
        this._clear()
        alert("계산할 수 있는 범위를 초과하였습니다. 최대 연산 범위는" + limit_calc + "입니다.") 
      }
    } else {
      if(this.state.view.length > limit_input){
        this._delete()
        alert("입력값 초과입니다. 최대 입력값은" + limit_input + "자리 입니다.")
      }
    }
  }
  render() {
    return (
      <div>
        <section id="calcApp" className="hiCalc" style={this.calcStyle}>
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
              <button className="btn numbtn" value="del" onClick={this._delete}>del</button>
              <button className="btn numbtn" value="clear" onClick={this._clear}>clear</button>
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
        <section id="stateCheck">
          <div>prev: {this.state.prev}</div>
          <div>operator: {this.state.operator}</div>
          <div>willClear: {this.state.willClear.toString()}</div>
          <div>calculating: {this.state.calculating.toString()}</div>
          <div>decimal: {this.state.decimal.toString()}</div>
          <div>veiwlength: {this.state.view.length}</div>
        </section>
      </div>
    );
  }
  
  //계산기 위치 값
  calcStyle = {
    left: "100px",
    top: "100px"
  }

  //숫자버튼 이벤트
  _pressNumBtn = (e) => {
    if(this.state.calculating === false){ // '= 연산자'로 연산종료가 판단되어 prev 자료를 초기화 시킨다.
      this.setState({
        prev: '0'
      })
    }
    if(this.state.view === "0" || this.state.willClear){ //현재값이 0이거나 새로운 숫자를 입력받아야될 경우 
      this.setState({ //최초 숫자값을 view에 표시하고 계속 숫자를 입력받을 수 있는 상태(willClear: false)로 변경한다.
        view: e.target.value,
        willClear: false
      })
    } else {
      this.setState({ //이 후 입력받는 숫자값들을 뒤로 나열한다.
        view: this.state.view + e.target.value
      })
    }
  }

  //연산버튼 이벤트
  _pressOperBtn = (e) => {
    if(this.state.willClear){//일반적인 연산순서를 따를 경우에 현재 상태가 새로운 숫자값을 입력받아야 할 경우
      if(e.target.value !== "="){// 연산자들의 변경으로 판단하며, 4칙연산자는 이 후에도 연산이 지속될 수 있는 상태를 유지한다.
        this.setState({
          operator: e.target.value,
          calculating: true 
        })
      }
    } else {
      const value = eval(this.state.prev + this.state.operator + this.state.view).toString()
      this.setState({//정상적으로 연산자가 들어 왔을 경우 필요한 상태들을 변경하여 이 후 입력값을 대비한다.
        view: value,
        prev: this.state.view,
        operator: e.target.value,
        willClear: true,
        decimal: false,
        calculating: true
      })
      if(this.state.calculating){// 연산이 연속적으로 진행 중 일 경우 피연산 값을 지속적으로 계산해준다.
        this.setState({
          prev: value
        })
      }
      if(e.target.value === '='){// '= 연산자'를 입력받을 경우 연산자 상태를 변경하지 않고 연산종료로 판단한다.
        this.setState({
          operator: this.state.operator,
          calculating: false
        })
      }
    }
  }

  //소수점 이벤트
  _pressDecBtn = (e) => {
    if(this.state.decimal === false && this.state.willClear === false){//현재 소수점을 사용하지 않고 있으며 이미 숫자를 입력 받은 상태인 경우
      this.setState({
        view: this.state.view + '.',
        willClear: false,
        decimal: true
      })
    } else if (this.state.willClear && this.state.calculating) {//현재 입력받은값이 없거나, 새로운 값을 입력받아야 할 경우
      this.setState({
        view: '0.',
        willClear: false,
        decimal: true
      })
    }
  }

  //삭제 이벤트
  _delete = (e) => {
    if(this.state.view !== "0" && this.state.willClear === false){ // 현재 입력받은 숫자가 있을 경우
      if(this.state.view.substr(this.state.view.length-1) === '.' ){ // 소수점을 지웠을 경우에는 소수상태를 변경한다.
       this.setState({
         decimal: false
       }) 
      }
      this.setState({
        view: this.state.view.slice(0, -1)
      })
    }
  }

  //초기화 이벤트
  _clear = (e) => { //초기화한다.
    this.setState({
      view: '0',
      prev: '0',
      operator: '+',
      willClear: false,
      decimal: false,
      calculating: false
    })
  }
}
export default App;
