import { Board } from "./Board";
import { Figure } from "./figures/Figure";
import { Colors } from "./Colors";
export class Cell {
  readonly color: Colors;
  readonly x: number;
  readonly y: number;
  figure: Figure | null;
  board: Board;
  available: boolean;
  id: number;

  constructor(
    board: Board,
    x: number,
    y: number,
    figure: Figure | null,
    color: Colors
  ) {
    this.x = x;
    this.y = y;
    this.board = board;
    this.color = color;
    this.figure = figure;
    this.available = false;
    this.id = Math.random();
  }

  public isEmpty() {
    return this.figure === null;
  }

  public isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) return false;

    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);

    for (let i = min + 1; i < max; i++) {
      if (!this.board.getCell(i, this.x).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  public isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) return false;

    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);

    for (let i = min + 1; i < max; i++) {
      if (!this.board.getCell(this.y, i).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  public isEmptyDiagonal(target: Cell): boolean {
    const diffX = Math.abs(this.x - target.x);
    const diffY = Math.abs(this.y - target.y);

    if (diffX !== diffY) return false;

    const dx = this.x < target.x ? 1 : -1;
    const dy = this.y < target.y ? 1 : -1;

    for (let i = 1; i < diffX; i++) {
      if (!this.board.getCell(this.y + i * dy, this.x + i * dx).isEmpty())
        return false;
    }

    return true;
  }

  public isEmptyForKnight(target: Cell): boolean {
    if (Math.abs(this.x - target.x) === 1 && Math.abs(this.y - target.y) === 2)
      return true;
    if (Math.abs(this.x - target.x) === 2 && Math.abs(this.y - target.y) === 1)
      return true;
    return false;
  }

  public isEmptyForPawn(target: Cell): boolean {
    if (Math.abs(this.x - target.x) > 1) return false;
    if (Math.abs(this.x - target.x) === 1 && target.isEmpty()) return false;
    
    switch (this.figure?.color) {
      case Colors.BLACK:
        if (this.y - target.y === 1) return true;
        if (this.y - target.y === 2 && this.y === 6) return true;
        break;
      case Colors.WHITE:
        if (target.y - this.y === 1) return true;
        if (target.y - this.y === 2 && this.y === 1) return true;
        break;
      default:
        return false;
    }

    return false;
  }

  public moveFigure(target: Cell): void {
    if (this.figure && this.figure.canMove(target)) {
      target.figure = this.figure;
      target.figure.cell = target;
      this.figure = null;
    }
  }
}
