import { useReducer } from "react"
import DigitBtn from "./components/DigitBtn"
import OperationBtn from "./components/OperationBtn"
import './App.css'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate' 
} 


function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite){
        return {
          ...state, 
          currentOperand: payload.digit, 
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }

      return {
        ...state, 
        currentOperand: `${state.currentOperand || ""}${payload.digit}`      
      }

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null) {
        return {
          ...state, 
          operation: payload.operation, 
        }
      }

      if (state.previousOperand == null) {
        return {
          ...state, 
          operation: payload.operation, 
          previousOperand: state.currentOperand, 
          currentOperand: null,
        }
      }

      return {
        ...state, 
        previousOperand: evaluate(state), 
        operation: payload.operation,
        currentOperand: null,
      }
    
    case ACTIONS.CLEAR:
      return {}
    
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state, 
          overwrite: false, 
          currentOperand: nullm
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      return {
        ... state,
        currentOperand: state.currentOperand.slice(0, -1), 
      }
    
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state
      }

      return {
        ...state, 
        overwrite: true, 
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }
  }
}

function evaluate ({currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNAN(prev) || isNAN(current)) return ""
  let computation = ""

  switch (operation) {
      case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "/":
      computation = prev / current
      break
  }

  return computation.toString()
}

const INTEGER_FORMATTER =  new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOperand(operand) {
  if (operand == null) return 
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}


function App() {

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer, 
    {}
  )

  return (
    <main className="calculator-grid">
      <div id="log" style={{display: "true"}} >
        History
      </div>
      <div id="display" className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">
          {formatOperand(currentOperand)}
        </div>
      </div>
      <div id="numpad">
        <button 
          id="clear" 
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button id="delete" onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        &#9003;
      </button>
        <OperationBtn id="divide" operation="/">{dispatch}</OperationBtn>
        <OperationBtn id="multiply" operation="*">{dispatch}</OperationBtn>
        <DigitBtn id="seven" digit="7">{dispatch}</DigitBtn>
        <DigitBtn id="eight" digit="8">{dispatch}</DigitBtn>
        <DigitBtn id="nine" digit="9">{dispatch}</DigitBtn>
        <OperationBtn id="add" operation="+">{dispatch}</OperationBtn>
        <DigitBtn id="four" digit="4">{dispatch}</DigitBtn>
        <DigitBtn id="five" digit="5">{dispatch}</DigitBtn>
        <DigitBtn id="six" digit="6">{dispatch}</DigitBtn>
        <OperationBtn id="subtract" operation="-">{dispatch}</OperationBtn>
        <DigitBtn id="one" digit="1">{dispatch}</DigitBtn>
        <DigitBtn id="two" digit="2">{dispatch}</DigitBtn>
        <DigitBtn id="three" digit="3">{dispatch}</DigitBtn>
        <button id="equals" className="span-rows-2"
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
        <DigitBtn id="zero" className="span-cols-2" digit="0">{dispatch}</DigitBtn>
        <DigitBtn id="decimal" digit=".">{dispatch}</DigitBtn>
      </div>
    </main>
  )
}

export default App;