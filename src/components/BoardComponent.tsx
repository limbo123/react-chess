import React, { FC, Fragment, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import CellComponent from "./CellComponent";

interface IBoardProps {
  board: Board;
  setBoard: (newBoard: Board) => void;
}

const BoardComponent: FC<IBoardProps> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  useEffect(() => {
     if (selectedCell) {
      board.highlightCells(selectedCell);
      renderBoard();
     };
  }, [selectedCell]);

  const renderBoard = (): void => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  const click = (cell: Cell): void => {
    if (selectedCell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
    } else {
      if (!cell.figure) return;
      setSelectedCell(cell);
    }

  };
  return (
    <div className="board">
      {board.cells.map((row, index) => (
        <Fragment key={index}>
          {row.map((cell) => (
            <CellComponent
              key={cell.id}
              cell={cell}
              isSelected={
                !!selectedCell &&
                selectedCell.x === cell.x && selectedCell.y === cell.y
              }
              selectedCell={selectedCell}
              click={click}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default BoardComponent;
