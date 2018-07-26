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

var appLeft, appTop, gapLeft, gapTop
var moving = false
document.addEventListener('mousedown', mousedown)
document.addEventListener('mouseup', mouseup)
document.addEventListener('mousemove', mousemove)
function mousedown(e){
  const calcApp = document.getElementById('calcApp')
  if(e.target === calcApp){
    appLeft = parseInt(e.target.style.left, 10)
    appTop = parseInt(e.target.style.top, 10)
    gapLeft = e.clientX - appLeft
    gapTop = e.clientY - appTop
    moving = true;
    // console.log(gapLeft + ',' + gapTop)
    // console.log('x:'+ e.clientX + ' y: ' + e.clientY)
  }
}
function mouseup(){
  moving = false;
}
function mousemove(e){
  if(moving){
    const calcApp = document.getElementById('calcApp')
    calcApp.style.left = e.clientX - gapLeft + "px"
    calcApp.style.top = e.clientY - gapTop + "px"
  }
}