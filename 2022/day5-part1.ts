import { getAocInput } from '../common/aoc-helper';

class Crate {
    value: string = '';
}

class Stack {
    id = 0;
    private crates: Crate[] = [];

    get count() { return this.crates.length; }

    constructor(id: number) {
        this.id = id;
    }

    push(crate: Crate) {
        this.crates.push(crate);
    }

    pop(): Crate {
        const topItem = this.getTop();
        this.crates.splice(this.count - 1, 1);
        return topItem;
    }

    getTop(): Crate {
        return this.crates[this.count - 1];
    }
}

class Step {
    quantity = 0;
    from: Stack;
    to: Stack;

    constructor(quantity: number, from: Stack, to: Stack) {
        this.quantity = quantity;
        this.from = from;
        this.to = to;
    }
}

export function getResult(): string {
    const [stacksRaw, procedureRaw] = getAocInput().trim().split(/\r\n\r\n|\n\n/);
    const stacks = parseStacks(stacksRaw);
    const procedure = parseProcedure(procedureRaw, stacks);

    for (const step of procedure) {
        let count = 0;
        while (count < step.quantity) {
            const crate = step.from.pop();
            step.to.push(crate);
            count++;
        }
    }

    return stacks.map(x => x.getTop().value).join('');
}

function parseStacks(stacksRaw: string): Stack[] {
    const lines = stacksRaw.split(/\r\n|\n/);
    const stacks = lines[lines.length - 1].split(' ').filter(x => !!x).map(x => new Stack(+x));

    for (let i = lines.length - 2; i >= 0; i--) {
        const line = lines[i];
        const crates = line.match(/.{3,4}/g)!;
        for (let j = 0; j < stacks.length; j++) {
            const crate = crates[j].trim().substring(1,2);
            if (crate) {
                stacks[j].push({value: crate});
            }
        }
    }

    return stacks;
}

function parseProcedure(procedureRaw: string, stacks: Stack[]): Step[] {
    const lines = procedureRaw.split(/\r\n|\n/);
    const steps: Step[] = [];

    for (const line of lines) {
        const [quantity, fromId, toId] = line.match(/\d+/g)!.map(x => +x);
        const from = findStack(stacks, fromId)!;
        const to = findStack(stacks, toId)!;
        steps.push(new Step(quantity, from, to));
    }

    return steps;
}

function findStack(stacks: Stack[], id: number) {
    return stacks.find(x => x.id === id);
}