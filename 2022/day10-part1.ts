import { getAocInput } from '../common/aoc-helper';

export function getResult(): number[] {
    const lines = getAocInput().trim().split(/\r\n|\n/);
    const cyclesToCalculate = [20, 60, 100, 140, 180, 220];
    let currentCycle = 0;
    let registerX = 1;
    let sum = 0;
    for (const line of lines) {
        const values = line.split(' ');
        const command = values[0] as Command;
        const additionCycle = command === 'noop' ? 1 : 2;
        for (let i = 0; i < additionCycle; i++) {
            currentCycle++;
            if (cyclesToCalculate.includes(currentCycle)) {
                sum += currentCycle * registerX;
            }
        }

        // After current cycle finished.
        if (command === 'addx') {
            registerX += +values[1];
        }
    }
    return [sum];
}

type Command = 'addx' | 'noop';

