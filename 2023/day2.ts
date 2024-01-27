import { getAocInputAsLines } from '../common/aoc-helper';

const MAX_REDS = 12;
const MAX_GREENS = 13;
const MAX_BLUES = 14;

export function getResult() {
    let sum1 = 0;
    let sum2 = 0;

    for (const line of getAocInputAsLines()) {
        const { game, reds, greens, blues } = extractLine(line);

        const maxRed = Math.max(...reds);
        const maxGreen = Math.max(...greens);
        const maxBlue = Math.max(...blues);

        if (
            maxRed <= MAX_REDS &&
            maxGreen <= MAX_GREENS &&
            maxBlue <= MAX_BLUES
        ) {
            sum1 += game;
        }

        sum2 += maxRed * maxGreen * maxBlue;
    }

    return [sum1, sum2];
}

function extractLine(line: string): {
    game: number;
    reds: number[];
    greens: number[];
    blues: number[];
} {
    const game = Number.parseInt(line.match(/Game (\d+?):/)![1]);
    const reds = Array.from(line.matchAll(/(\d+?) red/g), (x) =>
        Number.parseInt(x[1])
    );
    const greens = Array.from(line.matchAll(/(\d+?) green/g), (x) =>
        Number.parseInt(x[1])
    );
    const blues = Array.from(line.matchAll(/(\d+?) blue/g), (x) =>
        Number.parseInt(x[1])
    );
    return { game, reds, greens, blues };
}
