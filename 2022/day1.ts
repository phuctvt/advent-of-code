import { getAocInput } from '../common/aoc-helper';

export function getResult() {
    const input = getAocInput();
    const calorieGroups = input.split(/\r\n\r\n|\r\r/);
    return `${getPart1(calorieGroups)} ${getPart2(calorieGroups)}`;
}

function getPart1(calorieGroups: string[]): number {
    let max = 0;
    for (const group of calorieGroups) {
        const sum = group.split(/\r\n|\r/).map(x => +x).reduce((prev, cur) => prev + cur, 0);
        if (sum > max) {
            max = sum;
        }
    }
    return max;
}

function getPart2(calorieGroups: string[]): number {
    let top3: number[] = [];
    let smallestOneInTop3 = 0;
    for (const group of calorieGroups) {
        const sum = group.split(/\r\n|\r/).map(x => +x).reduce((prev, cur) => prev + cur, 0);
        if (sum > smallestOneInTop3) {
            if (top3.length === 3) {
                top3 = top3.filter(x => x !== smallestOneInTop3);
            }
            top3.push(sum);
            smallestOneInTop3 = Math.min(...top3);
        }
    }
    return top3.reduce((prev, cur) => prev + cur, 0);
}
