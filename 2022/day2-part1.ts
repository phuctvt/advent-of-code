import { getAocInput } from '../common/aoc-helper';

const ChoiceScores: { [key: string]: number} = {
    'A': 1, // Rock
    'B': 2, // Paper
    'C': 3, // Scissors
    'X': 1, // Rock
    'Y': 2, // Paper
    'Z': 3, // Scissors
};

enum Choice { Rock, Paper, Scissors }

export function getResult() {
    const input = getAocInput();
    const lines = input.trim().split(/\r\n|\r/);
    let score = 0;
    for (const line of lines) {
        const [opponent, me] = line.split(' ');
        const myChoice = parseChoice(me);
        const opponentChoice = parseChoice(opponent);
        score += ChoiceScores[me] + getRockPaperScissorsScore(myChoice, opponentChoice);
    }
    return score;
}

function getRockPaperScissorsScore(me: Choice, opponent: Choice) {
    if (me === opponent) {
        return 3;
    }
    if (
        me === Choice.Rock && opponent === Choice.Scissors
        || me === Choice.Paper && opponent === Choice.Rock
        || me === Choice.Scissors && opponent === Choice.Paper
    ) {
        return 6;
    }
    return 0;
} 

function parseChoice(value: string): Choice {
    switch (value) {
        case 'A':
        case 'X':
            return Choice.Rock;
        case 'B':
        case 'Y':
            return Choice.Paper;
        case 'C':
        case 'Z':
            return Choice.Scissors;
        default:
            throw new Error('Invalid value.');
    }
}
