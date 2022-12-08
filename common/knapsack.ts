export class Knapsack {

    private memory: { [key: string]: number } = {};

    find(arr: number[], capacity: number) {
        this.memory = {};
        let result = this.knapsack(arr, 0, capacity);
        this.memory = {};
        return result;
    }

    private knapsack(arr: number[], index: number, capacityLeft: number): number {
        if (this.memory[`${index}-${capacityLeft}`] !== undefined) {
            return this.memory[`${index}-${capacityLeft}`];
        }
        const n = arr.length;
        if (index === n || capacityLeft === 0) {
            return 0;
        }
        if (arr[index] > capacityLeft) {
            return this.knapsack(arr, index + 1, capacityLeft);
        }
        const tmp1 = this.knapsack(arr, index + 1, capacityLeft);
        const tmp2 = arr[index] + this.knapsack(arr, index + 1, capacityLeft - arr[index]);
        const result = Math.max(tmp1, tmp2);
        this.memory[`${index}-${capacityLeft}`] = result;
        return result;
    }
}
