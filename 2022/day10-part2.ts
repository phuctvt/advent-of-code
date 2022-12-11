import { getAocInput } from "../common/aoc-helper";

export function getResult(): string {
    const commandList = new CommandList(parseCommands(getAocInput()));
    const cpu = new Cpu();
    const crt = new Crt(40, 6);
    while (true) {
        const command = commandList.getNextWaiting();
        if (!command) {
            break;
        }
        cpu.startNewCycle(command, crt);
    }
    return crt.toString();
}

type CommandType = "addx" | "noop";

class Command {
    type: CommandType;
    addxValue: number;
    executionCount = 0;

    get started() {
        return this.executionCount > 0;
    }

    get finished() {
        return this.type === "noop"
            ? this.executionCount === 1
            : this.executionCount === 2;
    }

    constructor(type: CommandType, addxValue: number) {
        this.type = type;
        this.addxValue = addxValue;
    }
}

class Crt {
    width: number;
    height: number;
    pixels: string[][] = [];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.pixels = [];
        for (let i = 0; i < height; i++) {
            this.pixels.push(Array(width).fill(0).map(x => '_'));
        }
    }

    toString(): string {
        const lines: string[] = [];
        for (const rows of this.pixels) {
            lines.push(rows.join(''));
        }
        return lines.join('\n');
    }

    draw(cycleOrder: number, registerX: number) {
        const i = Math.floor((cycleOrder - 1) / this.width);
        let j = cycleOrder % this.width - 1;
        j = j === -1 ? this.width - 1 : j;
        this.pixels[i][j] = Math.abs(registerX - j) <= 1 ? '#' : '.';
    }
}

class Cpu {
    registerX = 1;
    cycleOrder = 0;

    startNewCycle(command: Command, cpu: Crt) {
        this.cycleOrder++;

        // During the cycle.
        command.executionCount++;
        cpu.draw(this.cycleOrder, this.registerX);

        // After finished the cycle.
        this.onFinishedCycle(command);
    }

    onFinishedCycle(command: Command) {
        if (command.type === 'addx' && command.finished) {
            this.registerX += command.addxValue;
        }
    }
}

class CommandList {
    commands: Command[] = [];

    constructor(commands: Command[]) {
        this.commands = commands;
    }

    getNextWaiting(): Command | null {
        return this.commands.find((x) => !x.finished) || null;
    }
}

function parseCommands(text: string): Command[] {
    const lines = text.trim().split(/\r\n|\n/);
    const commands: Command[] = [];
    for (const line of lines) {
        const values = line.split(' ');
        commands.push(new Command(values[0] as CommandType, +values[1]));
    }
    return commands;
}
