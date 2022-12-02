import { getAocInput } from '../common/aoc-helper';

const GO_UP = '(';

export function getResult(): string {
    let finalFloor = 0;
    let basementPosition = 0;
    const input = getAocInput();

    for (let i = 0; i < input.length; i++) {
        finalFloor = input[i] === GO_UP ? finalFloor + 1 : finalFloor - 1;
        if (finalFloor === -1 && basementPosition === 0) {
            basementPosition = i + 1;
        }
    }
    return `${finalFloor} ${basementPosition}`;
}
