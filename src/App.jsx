import './App.css'
import React, {useState, useEffect} from 'react'

function App(props) {

  const [previousOperand, setPreviousOperand] = useState(null)
  const [currentOperand, setCurrentOperand] = useState(0)
  const [operation, setOperation] = useState(null)

  useEffect(() => {setCurrentOperand})


  return (
    <main>
      <div id="log" style={{display: "true"}} >
        History
      </div>
      <div id="display" className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">
          {currentOperand}
        </div>
      </div>
      <div id="numpad">
        <button id="zero" >0</button>
        <button id="one" >1</button>
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
