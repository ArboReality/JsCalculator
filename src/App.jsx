import './App.css'
import React, {useState, useEffect} from 'react'

export const App = (props) => {
  // props = {
  //   value: null, 
  // }
  const [value, setValue] = useState(props.value)


  return (
    <main>
      <div id="log" style={{display: "true"}} >
        History
      </div>
      <input type="numeric" id="display" placeholder="0" value={value} />
      <div id="numpad">
        <button id="zero" onClick={() => {setValue(0)}} >0</button>
        <button id="one" onClick={() => {setValue(1)}} >1</button>
        <button id="two">2</button>
        <button id="three">3</button>
        <button id="four">4</button>
        <button id="five">5</button>
        <button id="six">6</button>
        <button id="seven">7</button>
        <button id="eight">8</button>
        <button id="nine">9</button>
        <button id="equals">=</button>
        <button id="add">+</button>
        <button id="subtract">-</button>
        <button id="multiply">*</button>
        <button id="divide">/</button>
        <button id="decimal">.</button>
        <button id="clear" >AC</button>
      </div>
      
    </main>
  )
}

export default App;