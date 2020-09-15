import React, { useState } from "react";
import Square from "./square";

function calculateWinner(elements) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      elements[a] &&
      elements[a] === elements[b] &&
      elements[a] === elements[c]
    ) {
      return elements[a];
    }
  }
  return null;
}

function Board() {
  const [elements, setElements] = useState(Array(9).fill(null));
  const [isNextX, setIsNextX] = useState(true);
  const [histories, setHistories] = useState([]);
  const winner = calculateWinner(elements);

  function handleSquare(index) {
    const newElements = elements.slice(); // Copy elements Array
    newElements[index] = isNextX ? "X" : "O";
    setElements(newElements);

    // Add history
    const latestHistory = histories.slice();
    latestHistory.push(newElements);
    setHistories(latestHistory);
    setIsNextX(!isNextX);
  }

  function resetBoard() {
    const resetElements = Array(9).fill(null);
    setElements(resetElements);
    setHistories([]);
    setIsNextX(true);
  }

  function handleHistory(index) {
    setElements(histories[index]);
  }

  return (
    <div>
      <h1>React Tic-tac-toe</h1>
      {winner ? (
        <h4>Winner: {winner}</h4>
      ) : (
        <h4>Next player: {isNextX ? "X" : "O"}</h4>
      )}

      <div className="boardRow">
        {elements.map((element, index) => (
          <Square key={index} handleSquare={() => handleSquare(index)} element={element} />
        ))}
      </div>

      <button onClick={resetBoard}>reset!</button>

      <h4>History</h4>
      <ul>
        {histories.map((history, index) => {
          return <li className="historyList" key={index} onClick={() => handleHistory(index)}>
            {`Go to move ${index}`}
          </li>
        })}
      </ul>

    </div>
  );
}

export default Board;
