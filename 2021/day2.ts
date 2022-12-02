import { getAocInput } from '../common/aoc-helper';

export function getResult(): string {
    const input = getAocInput()

    const commands = input.split('\n');

    return `${getPart1(commands)} ${getPart2(commands)}`;
}

function getPart1(commands: string[]): number {
    let horizontalPosition = 0;
    let depth = 0;
    for (const element of commands) {
        let command = element.split(' ')[0];
        let value = +element.split(' ')[1];
        switch (command) {
            case 'forward':
                horizontalPosition += value;
                break;
            case 'down':
                depth += value;
                break;
            case 'up':
                depth -= value;
                break;
            default:
                break;
        }
    }
    return horizontalPosition * depth;
}

function getPart2(commands: string[]): number {
    let horizontalPosition = 0;
    let depth = 0;
    let aim = 0;
    for (const element of commands) {
        let command = element.split(' ')[0];
        let value = +element.split(' ')[1];
        switch (command) {
            case 'down':
                aim += value;
                break;
            case 'up':
                aim -= value;
                break;
            case 'forward':
                horizontalPosition += value;
                depth += aim * value;
                break;
            default:
                break;
        }
    }
    return horizontalPosition * depth;
}
