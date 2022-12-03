import { getAocInput } from '../common/aoc-helper';

export function getResult() {
    const lines = getAocInput().trim().split(/\r\n|\r/);
    let sum = 0;
    for (const line of lines) {
        let char = findFirstDuplicatedItemType(line);
        if (!char) {
            throw new Error('Not found any duplicated');
        }
        sum += getPriorityOfItemType(char);
    }
    return sum;
}

function findFirstDuplicatedItemType(types: string): string | null {
    if (types.length % 2 !== 0) {
        throw new Error('Number of types is not even.');
    }
    const firstHalf = types.substring(0, types.length / 2).split('');
    const secondHalf = types.substring(types.length / 2).split('');
    for (const type of firstHalf) {
        if (secondHalf.findIndex(x => x === type) > -1) {
            return type;
        }
    }
    return null;
}

function getPriorityOfItemType(itemType: string): number {
    const arr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const index = arr.findIndex(x => x === itemType);
    if (index === -1) {
        throw new Error('Invalid itemType.');
    }
    return index + 1;
}
