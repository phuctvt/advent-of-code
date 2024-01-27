import { getAocInputAsLines } from '../common/aoc-helper';
import { indexOf, lastIndexOf } from '../common/string-helper';

const digits = {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
};

export function getResult(): number | string {
    let sum = 0;
    for (const line of getAocInputAsLines()) {
        const { searchTerm: firstDigit } = indexOf(line, Object.keys(digits));
        const { searchTerm: lastDigit } = lastIndexOf(
            line,
            Object.keys(digits)
        );

        sum += Number.parseInt(
            digits[firstDigit as keyof typeof digits] +
                digits[lastDigit as keyof typeof digits]
        );
    }

    return sum;
}
