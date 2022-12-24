import React, { FC } from "react";
import { Cell } from "../models/Cell";

interface ICellComponentProps {
  cell: Cell;
  isSelected: boolean;
  selectedCell: Cell | null;
  click: (cell: Cell) => void;
}

const CellComponent: FC<ICellComponentProps> = ({
  cell,
  isSelected,
  selectedCell,
  click,
}) => {
  return (
    <div
      className={`cell ${cell.color} ${isSelected ? "selected" : ""}`}
      style={selectedCell && cell.available && cell.figure ? { background: "green" } : {}}
      onClick={() => click(cell)}
    >
      {selectedCell && cell.available && !cell.figure && <div className="available"></div>}
      {cell.figure && <img src={cell.figure.logo} alt={cell.figure.name} />}
    </div>
  );
};

export default CellComponent;
