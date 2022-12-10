import { getAocInput } from '../common/aoc-helper';

export function getResult(): number[] {
    const actions: Action[] = parseActions(getAocInput());

    const grid = new Grid();
    for (const action of actions) {
        grid.moveRope(action);
    }

    const grid2 = new Grid(10);
    for (const action of actions) {
        grid2.moveRope(action);
    }

    return [
        grid.countVisitedTail(),
        grid2.countVisitedTail()
    ];
}

type ActionType = 'up' | 'down' | 'left' | 'right';

class Action {
    type: ActionType;
    length: number;

    constructor(type: ActionType, length: number) {
        this.type = type;
        this.length = length;
    }
}

class Knot {
    front: Knot | undefined;
    behind: Knot | undefined;
    position: Cell;
    isHead: boolean;
    isTail: boolean;
    constructor(
        position: Cell,
        front: Knot | undefined = undefined,
        behind: Knot | undefined = undefined,
        isHead = false,
        isTail = false
    ) {
        this.front = front;
        this.behind = behind;
        this.position = position;
        this.isHead = isHead;
        this.isTail = isTail;
    }

    isNextToOrOverlapWith(knot: Knot): boolean {
        if (!knot) {
            throw new Error();
        }
        return Math.abs(this.position.row - knot.position.row) <= 1 &&
            Math.abs(this.position.column - knot.position.column) <= 1;
    }

    isSameRowWith(front: Knot) {
        return this.position.row === front.position.row;
    }

    isSameColumnWith(front: Knot) {
        return this.position.column === front.position.column;
    }
}

class Rope {
    /** First item is the head, last item is the tail. */
    knots: Knot[] = [];

    get knotLength() {
        return this.knots.length;
    }

    get head() {
        return this.knots[0];
    }

    get tail() {
        return this.knots[this.knotLength - 1];
    }

    constructor(startCell: Cell, knotLength: number = 2) {
        this.knots = Array(knotLength).fill(null).map(x => new Knot(startCell));
        this.head.isHead = true;
        this.head.behind = this.knots[1];
        this.tail.isTail = true;
        this.tail.front = this.knots[this.knotLength - 2];
        for (let i = 1; i < this.knotLength - 1; i++) {
            const knot = this.knots[i];
            knot.front = this.knots[i - 1];
            knot.behind = this.knots[i + 1];
        }
    }
}

class Cell {
    visitedByTail: boolean;
    row: number;
    column: number;
    
    constructor(row: number, column: number, visitedByTail: boolean = false) {
        this.visitedByTail = visitedByTail;
        this.row = row;
        this.column = column;
    }

    onTopSideOf(position: Cell) {
        return this.row < position.row;
    }

    onBottomSideOf(position: Cell) {
        return position.row < this.row;
    }

    onLeftSideOf(position: Cell) {
        return this.column < position.column;
    }

    onRightSideOf(position: Cell) {
        return position.column < this.column;
    }
}

class Grid {
    readonly RowLength = 1000;
    readonly ColumnLength = 1000;
    private matrix: Cell[][] = [];
    private rope: Rope;
    private knotLength: number;

    constructor(knotLength: number = 2) {
        this.knotLength = knotLength;
        for (let r = 0; r < this.RowLength; r++) {
            const row: Cell[] = [];
            for (let c = 0; c < this.ColumnLength; c++) {
                row.push(new Cell(r, c))
            }
            this.matrix.push(row);
        }
        const startCell = this.matrix[this.RowLength / 2][this.ColumnLength / 2];
        this.rope = new Rope(startCell, knotLength);
        startCell.visitedByTail = true;
    }

    countVisitedTail(verbose = false): number {
        let count = 0;
        for (const row of this.matrix) {
            count += row.filter(x => x.visitedByTail).length;
            if (verbose) {
                console.log(row.map(x => x.visitedByTail ? '#' : '.').join(''));
            }
        }
        return count;
    }

    getLogText(action: Action) {
        const lines: string[] = [];
        lines.push(`${JSON.stringify(action)}\n\n`);
        for (const [i, row] of this.matrix.entries()) {
            const cells = row.map(
                cell => {
                    if (this.rope.head.position === cell) {
                        return '@';
                    }
                    const index = this.rope.knots.findIndex(k => k.position === cell);
                    return index > 0 ? index : '-';
                }).join('');
            lines.push(`${String(i).padStart(2)}${cells}\n`);
        }
        lines.push('\n');
        return lines.join('');
    }

    moveRope(action: Action) {
        let count = 0;
        const log = () => {
            console.log(this.getLogText(action));
        };
        while (count < action.length) {
            for (const knot of this.rope.knots) {
                this.moveKnot(knot, action);
            }
            count++;
        }
        // log();
    }

    moveKnot(knot: Knot, action: Action) {
        if (!knot.isHead && knot.isNextToOrOverlapWith(knot.front!)) {
            return;
        }

        if (knot.isHead) {
            this.moveKnotTo(knot, action.type);
        } else {
            this.moveKnotToNearFrontKnot(knot, action.type);
        }

        if (knot.isTail) {
            knot.position.visitedByTail = true;
        }
    }

    moveKnotTo(knot: Knot, action: ActionType) {
        switch (action) {
            case 'up':
                knot.position = this.getUpOf(knot.position);
                break;
            case 'down':
                knot.position = this.getDownOf(knot.position);
                break;
            case 'left':
                knot.position = this.getLeftOf(knot.position);
                break;
            case 'right':
                knot.position = this.getRightOf(knot.position);
                break;
            default:
                throw new Error();
        }
    }

    moveKnotToNearFrontKnot(knot: Knot, action: ActionType) {
        const front = knot.front!;
        if (knot.isSameRowWith(front)) {
            const to: ActionType = knot.position.onLeftSideOf(front.position) ? 'right' : 'left';
            this.moveKnotTo(knot, to);
            return;
        }
        if (knot.isSameColumnWith(front)) {
            const to: ActionType = knot.position.onTopSideOf(front.position) ? 'down' : 'up';
            this.moveKnotTo(knot, to);
            return;
        }
        if (knot.position.onTopSideOf(front.position)) {
            const to: ActionType = knot.position.onLeftSideOf(front.position) ? 'right' : 'left';
            this.moveKnotTo(knot, 'down');
            this.moveKnotTo(knot, to);
            return;
        }
        if (knot.position.onBottomSideOf(front.position)) {
            const to: ActionType = knot.position.onLeftSideOf(front.position) ? 'right' : 'left';
            this.moveKnotTo(knot, 'up');
            this.moveKnotTo(knot, to);
            return;
        }
        throw new Error();
    }

    getUpOf(cell: Cell): Cell {
        if (cell.row - 1 < 0) {
            throw new Error();
        }
        return this.matrix[cell.row - 1][cell.column];
    }

    getDownOf(cell: Cell): Cell {
        if (cell.row + 1 >= this.RowLength) {
            throw new Error();
        }
        return this.matrix[cell.row + 1][cell.column];
    }

    getLeftOf(cell: Cell): Cell {
        if (cell.column - 1 < 0) {
            throw new Error();
        }
        return this.matrix[cell.row][cell.column - 1];
    }

    getRightOf(cell: Cell): Cell {
        if (cell.column + 1 >= this.ColumnLength) {
            throw new Error();
        }
        return this.matrix[cell.row][cell.column + 1];
    }
}

function parseActions(text: string): Action[] {
    const lines = text.trim().split(/\r\n|\n/);
    const actions: Action[] = [];
    for (const line of lines) {
        const [actionTypeRaw, lengthRaw] = line.split(' ');
        actions.push(new Action(parseActionType(actionTypeRaw), +lengthRaw));
    }
    return actions;
}

function parseActionType(action: string): ActionType {
    switch (action) {
        case 'U':
            return 'up';
        case 'D':
            return 'down';
        case 'L':
            return 'left';
        case 'R':
            return 'right';
        default:
            throw new Error();
    } 
}