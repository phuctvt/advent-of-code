import fs from 'fs';
import path from 'path';

/**
 * Get the input of the "Advent of code" challenge.
 */
export function getAocInput(): string {
    return fs.readFileSync(path.join(require.main!.path, 'input.txt'), 'utf-8');
}

export function getAocInputAsLines(): string[] {
    return getAocInput()
        .trim()
        .split(/\r\n|\n/);
}
