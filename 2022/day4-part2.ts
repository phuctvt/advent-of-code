import { getAocInput } from '../common/aoc-helper';

export function getResult(): number {
    const lines = getAocInput().trim().split(/\r\n|\n/);
    let sum = 0;
    for (const line of lines) {
        const [assignment1, assignment2] = line.split(',');
        const [sectionBegin1, sectionEnd1] = assignment1.split('-').map(x => +x);
        const [sectionBegin2, sectionEnd2] = assignment2.split('-').map(x => +x);
        if (
            sectionBegin1 <= sectionBegin2 && sectionBegin2 <= sectionEnd1 ||
            sectionBegin2 <= sectionBegin1 && sectionBegin1 <= sectionEnd2
        ) {
            sum++;
        }
    }
    return sum;
}
