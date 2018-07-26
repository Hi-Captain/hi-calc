import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


document.addEventListener("keydown", keyPress);
function keyPress(e) {
  const value = e.key
  const btn = /\d|[.+\-*/=]/
  const enter = document.querySelector("[value='=']")
  const esc = document.querySelector("[value='clear']")
  const del = document.querySelector("[value='del']")

  if(btn.test(value)){
    document.querySelector("[value='" + value + "']").click()
  }
  switch(value){
    case 'Enter':
    enter.click(); break;
    case 'Backspace':
    del.click(); break;
    case 'Escape':
    esc.click(); break;
    default:
    break;
  }
  // console.log(e.key)
}