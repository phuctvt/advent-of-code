import { getAocInput } from '../common/aoc-helper';

enum Choice { Rock, Paper, Scissors }
enum Result { Win, Draw, Lose }

export function getResult() {
    const input = getAocInput();
    const lines = input.trim().split(/\r\n|\r/);
    let score = 0;
    for (const line of lines) {
        const values = line.split(' ');
        const opponentChoice = parseChoice(values[0]);
        const rpsResult = parseRpsResult(values[1]);
        const myChoice = getChoiceFor(rpsResult, opponentChoice);
        score += getChoiceScore(myChoice) + getRpsScore(rpsResult);
    }
    return score;
}

function getChoiceFor(rpsResult: Result, opponentChoice: Choice): Choice {
    if (rpsResult === Result.Draw) {
        return opponentChoice;
    }

    if (rpsResult === Result.Win) {
        switch (opponentChoice) {
            case Choice.Rock:
                return Choice.Paper;
            case Choice.Paper:
                return Choice.Scissors;
            case Choice.Scissors:
                return Choice.Rock;
            default:
                throw new Error('Invalid value.');
        }
    }

    switch (opponentChoice) {
        case Choice.Rock:
            return Choice.Scissors;
        case Choice.Paper:
            return Choice.Rock;
        case Choice.Scissors:
            return Choice.Paper;
        default:
            throw new Error('Invalid value.');
    }
}

function getChoiceScore(choice: Choice) {
    switch (choice) {
        case Choice.Rock:
            return 1;
        case Choice.Paper:
            return 2;
        case Choice.Scissors:
            return 3;
        default:
            throw new Error('Invalid value.');
    }
}

function parseChoice(value: string): Choice {
    switch (value) {
        case 'A':
            return Choice.Rock;
        case 'B':
            return Choice.Paper;
        case 'C':
            return Choice.Scissors;
        default:
            throw new Error('Invalid value.');
    }
}

function parseRpsResult(rpsResult: string) {
    switch (rpsResult) {
        case 'X':
            return Result.Lose;
        case 'Y':
            return Result.Draw;
        case 'Z':
            return Result.Win;
        default:
            throw new Error('Invalid value.');
    }
}

function getRpsScore(rpsResult: Result) {
    switch (rpsResult) {
        case Result.Lose:
            return 0;
        case Result.Draw:
            return 3;
        case Result.Win:
            return 6;
        default:
            throw new Error('Invalid value.');
    }
}