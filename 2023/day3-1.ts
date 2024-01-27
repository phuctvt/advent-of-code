import { getAocInputAsLines } from '../common/aoc-helper';

interface PartNumber {
    value: number;
    row: number;
    col: number;
}

class Board {
    lines: string[] = [];
    numbers: PartNumber[] = [];

    get colCount() {
        return this.lines[0].length;
    }

    get rowCount() {
        return this.lines.length;
    }

    checkIfNextToAnySymbol(number: PartNumber): boolean {
        const topChars = this.getTopCharsOf(number);
        const botChars = this.getBotCharsOf(number);
        const leftChar = this.getLeftCharOf(number);
        const rightChar = this.getRightCharOf(number);
        const cornerChars = this.getCornerCharsOf(number);

        return [...topChars, ...botChars, leftChar, rightChar, ...cornerChars]
            .filter((x) => x !== null)
            .some((char) => char !== '.');
    }

    getTopCharsOf(number: PartNumber): string[] {
        return number.row === 0
            ? []
            : this.lines[number.row - 1]
                  .substring(
                      number.col,
                      number.col + number.value.toString().length
                  )
                  .split('');
    }

    getBotCharsOf(number: PartNumber): string[] {
        return number.row === this.lines.length - 1
            ? []
            : this.lines[number.row + 1]
                  .substring(
                      number.col,
                      number.col + number.value.toString().length
                  )
                  .split('');
    }

    getLeftCharOf(number: PartNumber): string | null {
        return number.col === 0 ? null : this.lines[number.row][number.col - 1];
    }

    getRightCharOf(number: PartNumber): string | null {
        const rightIndex = number.col + number.value.toString().length;
        return this.checkIsValidIndex(number.row, rightIndex)
            ? this.lines[number.row][rightIndex]
            : null;
    }

    checkIsValidIndex(row: number, col: number): boolean {
        return (
            0 <= col && col < this.colCount && 0 <= row && row < this.rowCount
        );
    }

    getCornerCharsOf(number: PartNumber): string[] {
        const { row, col, value } = number;
        const valueLength = value.toString().length;
        const aboveIndex = row - 1;
        const belowIndex = row + 1;
        const leftIndex = col - 1;
        const rightIndex = col + valueLength;

        const aboveLeft = this.checkIsValidIndex(aboveIndex, leftIndex)
            ? this.lines[aboveIndex][leftIndex]
            : null;

        const aboveRight = this.checkIsValidIndex(aboveIndex, rightIndex)
            ? this.lines[aboveIndex][rightIndex]
            : null;

        const belowLeft = this.checkIsValidIndex(belowIndex, leftIndex)
            ? this.lines[belowIndex][leftIndex]
            : null;

        const belowRight = this.checkIsValidIndex(belowIndex, rightIndex)
            ? this.lines[belowIndex][rightIndex]
            : null;

        return [aboveLeft, aboveRight, belowLeft, belowRight].filter(
            (x) => x !== null
        ) as string[];
    }
}

export function getResult() {
    const board = parseInput();

    let sum = 0;

    for (const number of board.numbers) {
        if (board.checkIfNextToAnySymbol(number)) {
            sum += number.value;
        }
    }

    return sum;
}

function parseInput(): Board {
    const board = new Board();
    const raw = getAocInputAsLines();
    for (const [row, line] of raw.entries()) {
        const nums = Array.from(
            line.matchAll(/\b(\d+?)\b/g),
            (x) =>
                ({
                    value: Number.parseInt(x[0]),
                    row: row,
                    col: x.index!,
                } satisfies PartNumber)
        );
        board.numbers.push(...nums);
        board.lines.push(line);
    }

    return board;
}
