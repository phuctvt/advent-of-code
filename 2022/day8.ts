import { getAocInput } from '../common/aoc-helper';

export function getResult(): number[] {
    const grid = parseGrid(getAocInput());
    grid.updateVisibility();
    const part1 = grid.countVisibleTrees();
    const part2 = grid.getHighestScore();

    return [part1, part2];
}

class Grid {
    trees: Tree[][];

    get rows(): Tree[][] {
        return this.trees;
    }

    get columns(): Tree[][] {
        const columnLength = this.rows[0].length;
        const columns: Tree[][] = [];
        for (let i = 0; i < columnLength; i++) {
            const col: Tree[] = [];
            for (const row of this.rows) {
                col.push(row[i]);
            }
            columns.push(col);
        }
        return columns;
    }

    constructor(trees: Tree[][]) {
        this.trees = trees;
    }

    updateVisibility() {
        for (const row of this.rows) {
            let currentTallest = -1;
            for (const tree of row) {
                if (tree.height > currentTallest) {
                    tree.isVisible = true;
                    currentTallest = tree.height;
                }
            }
            currentTallest = -1;
            for (const tree of [...row].reverse()) {
                if (tree.height > currentTallest) {
                    tree.isVisible = true;
                    currentTallest = tree.height;
                }
            }
        }

        for (const col of this.columns) {
            let currentTallest = -1;
            for (const tree of col) {
                if (tree.height > currentTallest) {
                    tree.isVisible = true;
                    currentTallest = tree.height;
                }
            }
            currentTallest = -1;
            for (const tree of [...col].reverse()) {
                if (tree.height > currentTallest) {
                    tree.isVisible = true;
                    currentTallest = tree.height;
                }
            }
        }
    }

    countVisibleTrees() {
        let sum = 0;
        for (const row of this.rows) {
            sum += row.filter(x => x.isVisible).length;
        }
        return sum;
    }

    getHighestScore(): number {
        let highestScore = 0;
        for (const row of this.rows) {
            for (const tree of row) {
                const score = this.getScore(tree);
                if (score > highestScore) {
                    highestScore = score;
                }
            }
        }
        return highestScore;
    }

    getScore(tree: Tree): number {
        let left = 0;
        for (let i = tree.rowIndex - 1; i >= 0; i--) {
            left++;
            const currentTree = this.rows[i][tree.columnIndex];
            if (currentTree.height >= tree.height) {
                break;
            }
        }
        let right = 0;
        for (let i = tree.rowIndex + 1; i < this.rows.length; i++) {
            right++;
            const currentTree = this.rows[i][tree.columnIndex];
            if (currentTree.height >= tree.height) {
                break;
            }
        }
        let top = 0;
        for (let j = tree.columnIndex - 1; j >= 0; j--) {
            top++;
            const currentTree = this.rows[tree.rowIndex][j];
            if (currentTree.height >= tree.height) {
                break;
            }
        }
        let bottom = 0;
        for (let j = tree.columnIndex + 1; j < this.rows[0].length; j++) {
            bottom++;
            const currentTree = this.rows[tree.rowIndex][j];
            if (currentTree.height >= tree.height) {
                break;
            }
        }
        return left * right * top * bottom;
    }
}

class Tree {
    height: number;
    isVisible: boolean;
    rowIndex: number;
    columnIndex: number;
    constructor(height: number, isVisible: boolean, rowIndex: number, columnIndex: number) {
        this.height = height;
        this.isVisible = isVisible;
        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;
    }
}

function parseGrid(input: string): Grid {
    const lines = input.trim().split(/\r\n|\n/);
    const trees: Tree[][] = [];
    for (const [i, line] of lines.entries()) {
        trees.push(line.split('').map((x, j) => new Tree(+x, false, i, j)));
    }
    return new Grid(trees);
}
