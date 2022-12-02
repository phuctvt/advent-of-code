import { getAocInput } from '../common/aoc-helper';

export function getResult(): string {
    const input = getAocInput();

    const measurements = input.split('\n').map(x => +x);

    return `${getPart1(measurements)} ${getPart2(measurements)}`;
}

function getPart1(measurements: number[]): number {
    let count = 0;
    for (let i = 1; i < measurements.length; i++) {
        const current = measurements[i];
        const previous = measurements[i - 1];
        if (current > previous) {
            count++;
        }
    }
    return count;
}

function getPart2(measurements: number[]): number {
    let count = 0;
    for (let i = 3; i < measurements.length; i++) {
        const current = measurements[i] + measurements[i - 1] + measurements[i - 2];
        const previous = measurements[i - 1] + measurements[i - 2] + measurements[i - 3];
        if (current > previous) {
            count++;
        }
    }
    return count;
}
