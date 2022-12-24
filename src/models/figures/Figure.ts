import { Cell } from './../Cell';
import { Colors } from './../Colors';
import figureIcon from '../../assets/black-bishop.png';

export enum FigureNames {
    FIGURE = "figure",
    KING = "king",
    KNIGHT = "knight",
    PAWN = "pawn",
    QUEEN = "queen",
    BISHOP = "bishop",
    ROOK = "rook",
}

export class Figure {
    color: Colors;
    logo: typeof figureIcon | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor (color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    public isAvailableHorizontaly(target: Cell): boolean {
        if (this.cell.y !== target.y) return false;
        return true;
    }

    public canMove (target: Cell): boolean {
        if ((target.figure && (target.figure.color === this.color))) return false;
        if (target.figure?.name === FigureNames.KING) return false;
        return true;
    }
}