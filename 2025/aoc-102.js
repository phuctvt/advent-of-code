/**
 * @typedef {Object} Machine
 * @property {number[]} joltage
 * @property {number[][]} buttons
 */

/**
 * @typedef {Object} MachineNode
 * @property {MachineNode | undefined} parent
 * @property {number} count
 * @property {number[]} joltage
 * @property {number[]} button
 */

(() => {
    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            :host {
                display: block;
            }
        </style>
        <p>Output:</p>
    `;

    class Aoc102 extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        /**
         * @param {string} input
         */
        run(input) {
            /** @type {Machine[]} */
            const machines = input.trim().split('\n').map(line => {
                const tokens = line.split(' ');
                const joltage = tokens.at(-1)
                    .substring(1, tokens.at(-1).length - 1)
                    .split(',').map(Number);
                const buttons = tokens
                    .slice(1, tokens.length - 1)
                    .map(x => x.substring(1, x.length - 1).split(',').map(Number));
                return { joltage, buttons };
            });

            console.log(machines);

            let count = 0;

            machines.forEach(machine => {
                const goalNode = this.findButtonPressPath(machine);
                count += goalNode.count;
            });

            this.writeOutput(count);
        }

        /**
         * @param {Machine} machine
         * @returns {MachineNode}
         */
        findButtonPressPath(machine) {
            const queue = machine.buttons.map(button => {
                /** @type {MachineNode} */
                const node = {
                    joltage: this.updateJoltage(
                        Array.from({ length: machine.joltage.length }, () => 0),
                        button),
                    count: 1,
                    button: button,
                    path: button.join('-'),
                };
                return node;
            });

            while (queue.length) {
                const node = queue.splice(0, 1).at(0);
                if (node.joltage.join('') === machine.joltage.join('')) {
                    return node;
                }
                queue.push(
                    ...machine.buttons
                        .map(button => {
                            /** @type {MachineNode} */
                            const childNode = {
                                joltage: this.updateJoltage([...node.joltage], button),
                                count: node.count + 1,
                                button: button,
                                parent: node,
                                path: node.path + '_' + button.join('-'),
                            };
                            return childNode;
                        })
                );
            }
        }

        /**
         * @param {number[]} joltage
         * @param {number[]} button
         */
        updateJoltage(joltage, button) {
            button.forEach(index => {
                joltage[index]++;
            });
            return joltage;
        }

        writeOutput(output) {
            this.shadowRoot.querySelector("p").textContent = `Output: ${output}`;
        }
    }

    customElements.define("aoc-102", Aoc102);
})();
