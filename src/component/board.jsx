import React, {useState} from "react";
import Square from "./square";
import {calculateWinner} from "./calculateWinner";

const mockHistory = [
  {
    isActiveHistory: false,
    elements: [null, null, null, null, null, null, null, null, null]
  }
];

function Board() {
  const [elements, setElements] = useState(Array(9).fill(null));
  const [isNextX, setIsNextX] = useState(true);
  const [histories, setHistories] = useState([]);
  let [historyId, setHistoryId] = useState(0);
  const winner = calculateWinner(elements);

  function handleSquare(index) {
    setIsNextX(!isNextX);
    const newElements = elements.slice();
    newElements[index] = isNextX ? 'X' : 'O';
    setElements(newElements);
    setHistory(newElements);
  }

  function setHistory(newElements) {
    const newHistories = histories.slice();
    newHistories[historyId] = {
      isActiveHistory: false,
      elements: newElements
    };
    historyId = historyId + 1;
    setHistoryId(historyId);
    setHistories(newHistories);
  }

  function handleHistory(index) {
    focusHistory(index);
    const history = histories[index].elements;
    setElements(history);
  }

  function focusHistory(index) {
    histories.forEach(item => item.isActiveHistory = false);
    histories[index].isActiveHistory = true;
  }
  function resetBoard() {
    const resetElements = Array(9).fill(null);
    setElements(resetElements);
    setHistories([]);
    setIsNextX(true);
  }

  return (
    <div>
      <h1>React Tic-tac-toe</h1>
      {winner ? (
        <h4>Winner: {winner}</h4>
      ) : (
        <h4>Next player: {isNextX ? "X" : "O"}</h4>
      )}
      {winner && <h4>Game End</h4>}
      <div className="boardRow">
        {elements.map((element, index) => (
          <Square
            key={index}
            handleSquare={() => (!element && !winner) && handleSquare(index)}
            element={element}/>
        ))}
      </div>

      <button onClick={resetBoard}>reset!</button>

      <h4>History</h4>
      <ul>
        {histories.map((history, index) =>
          <li
            className={histories[index].isActiveHistory ? "moveToHistoryBtn targetHistory" : "moveToHistoryBtn"}
            key={index}
            onClick={() => handleHistory(index)}>
            Go to move {index}
          </li>
        )}
      </ul>

    </div>
  );
}

export default Board;
