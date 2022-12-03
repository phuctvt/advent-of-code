import { getAocInput } from '../common/aoc-helper';

export function getResult() {
    const lines = getAocInput().trim().split(/\r\n|\r/);
    let sum = 0;
    let group: string[] = [];
    for (const line of lines) {
        if (group.length < 3) {
            group.push(line);
        }
        if (group.length < 3) {
            continue;
        }

        const type = getCommonType(group);
        if (!type) {
            throw new Error();
        }
        sum += getPriorityOfItemType(type);
        group = [];
    }
    return sum;
}

function getCommonType(group: string[]): string | null {
    if (group.length !== 3) {
        throw new Error();
    }
    const minLength = Math.min(group[0].length, group[1].length, group[2].length);
    const shortestSet = group.find(x => x.length === minLength)!;
    const otherSets = group.filter(x => x !== shortestSet);
    if (otherSets.length !== 2) {
        throw new Error();
    }
    for (const type of shortestSet) {
        if (otherSets[0].includes(type) && otherSets[1].includes(type)) {
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
