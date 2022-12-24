import React, { useEffect, useState } from "react";
import BoardComponent from "./components/BoardComponent";
import "./App.css";
import { Board } from "./models/Board";

function App() {
  const [board, setBoard] = useState(new Board());

  useEffect(() => {
    restart();
  }, []);

  const restart = (): void => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.initializeFigures();
    setBoard(newBoard);
  }

  return <div className="app"><BoardComponent board={board} setBoard={setBoard} /></div>;
}

export default App;
