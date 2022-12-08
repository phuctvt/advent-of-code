import { getAocInput } from '../common/aoc-helper';

export function getResult(): number[] {
    const rootDir = parseInput(getAocInput());
    const sizes = getFlatDirs(rootDir).map(x => x.size);
    const part1 = sizes.filter(x => x < 100000).reduce((prev, cur) => prev + cur, 0);

    const diskSize = 70000000;
    const expectedAvailableSpace = 30000000;
    const availableSpace = diskSize - rootDir.size;
    const spaceShouldBeDeleted = expectedAvailableSpace - availableSpace;
    const part2 = sizes.sort((x, y) => x - y).find(x => x >= spaceShouldBeDeleted)!;

    return [part1, part2];
}

class File {
    name: string;
    size: number;
    constructor(name: string, size: number) {
        this.name = name;
        this.size = size;
    }
}

class Directory {
    name: string;
    files: File[] = [];
    dirs: Directory[] = [];
    parentDir: Directory | null;
    size = 0;

    constructor(parentDir: Directory | null, name: string) {
        this.parentDir = parentDir;
        this.name = name;
    }

    putFile(file: File) {
        this.files.push(file);
        this.increaseSizeAfterAddFile(file.size);
    }
    
    private increaseSizeAfterAddFile(size: number) {
        this.size += size;
        if (this.parentDir) {
            this.parentDir.increaseSizeAfterAddFile(size);
        }
    }
}

function parseInput(input: string) {
    const lines = input.trim().split(/\r\n|\n/);
    const rootDir = new Directory(null, 'root');
    let currentDir = rootDir;

    for (const line of lines) {
        if (line === '$ ls') {
            continue;
        }
        if (line === '$ cd /') {
            currentDir = rootDir;
            continue;
        }
        if (line === '$ cd ..') {
            currentDir = currentDir.parentDir!;
            continue;
        }
        if (line.startsWith('$ cd')) {
            const dirName = line.split(' ')[2];
            currentDir = currentDir.dirs.find(x => x.name === dirName)!;
            continue;
        }
        if (line.startsWith('dir')) {
            const dirName = line.split(' ')[1];
            currentDir.dirs.push(new Directory(currentDir, dirName));
            continue;
        }
        if (/^\d+/.test(line)) {
            const [sizeString, fileName] = line.split(' ');
            currentDir.putFile(new File(fileName, +sizeString));
            continue;
        }
    }

    return rootDir;
}

function getFlatDirs(dir: Directory): Directory[] {
    const result = [dir];
    if (dir.dirs.length === 0) {
        return result;
    }
    for (const item of dir.dirs) {
        result.push(...getFlatDirs(item));
    }
    return result;
}
