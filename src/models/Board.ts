import { Rook } from './figures/Rook';
import { Knight } from './figures/Knight';
import { Bishop } from './figures/Bishop';
import { King } from './figures/King';
import { Queen } from "./figures/Queen";
import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Pawn } from "./figures/Pawn";

export class Board {
  cells: Cell[][] = [];

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 0) {
          row.push(new Cell(this, j, i, null, Colors.WHITE)); // White Cell;
        } else {
          row.push(new Cell(this, j, i, null, Colors.BLACK)); // Black Cell;
        }
      }
      this.cells.push(row);
    }
  }

  public getCopyBoard() {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    return newBoard; 
  }

  public addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(6, i));
      new Pawn(Colors.WHITE, this.getCell(1, i));
    }
  }

  public addKings() {
    new King(Colors.BLACK, this.getCell(7, 4));
    new King(Colors.WHITE, this.getCell(0, 4));
  }

  public addQueens() {
    new Queen(Colors.BLACK, this.getCell(7, 3));
    new Queen(Colors.WHITE, this.getCell(0, 3));
  }

  public addBishops() {
    new Bishop(Colors.BLACK, this.getCell(7, 2));
    new Bishop(Colors.WHITE, this.getCell(0, 5));
    new Bishop(Colors.BLACK, this.getCell(7, 5));
    new Bishop(Colors.WHITE, this.getCell(0, 2));
  }

  public addKnigts() {
    new Knight(Colors.BLACK, this.getCell(7, 1));
    new Knight(Colors.WHITE, this.getCell(0, 6));
    new Knight(Colors.BLACK, this.getCell(7, 6));
    new Knight(Colors.WHITE, this.getCell(0, 1));
  }

  public addRooks() {
    new Rook(Colors.BLACK, this.getCell(7, 0));
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.BLACK, this.getCell(7, 7));
    new Rook(Colors.WHITE, this.getCell(0, 0));
  }

  public highlightCells (selectedCell: Cell) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (selectedCell.figure)
          this.cells[i][j].available = selectedCell.figure.canMove(this.cells[i][j]);
      }
    }
  }

  public getCell(y: number, x: number) {
    return this.cells[y][x];
  }

  public initializeFigures() {
    this.addBishops();
    this.addKings();
    this.addQueens();
    this.addPawns();
    this.addRooks();
    this.addKnigts();
  }
}
