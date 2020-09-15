import React from 'react';


function Square({element, handleSquare}) {
  function handleBoard() {
    !element && handleSquare();
  }

  return (
    <button onClick={handleBoard} className="square">
      {element}
    </button>
  )
}
export default Square
