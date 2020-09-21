import React from 'react';

function Square({element, handleSquare}) {
  return (
    <button onClick={handleSquare} className="square">
      {element}
    </button>
  )
}
export default Square
