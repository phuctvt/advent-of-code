import { getAocInput } from '../common/aoc-helper';

export function getResult(): number {
    const data = getAocInput().trim();
    const markerLength = 14;

    for (let i = markerLength - 1; i < data.length; i++) {
        const chars = data.substring(i - markerLength + 1, i + 1).split('');
        if (!hasDuplicated(chars)) {
            return i + 1;
        }
    }

    throw new Error('Not found');
}

function hasDuplicated<T>(arr: T[]): boolean {
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (arr.slice(i + 1).findIndex(x => x === item) > -1) {
            return true;
        }
    }
    return false;
}
