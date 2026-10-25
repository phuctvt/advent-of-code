/**
 * @typedef {Object} Machine
 * @property {string} diagram
 * @property {number[][]} buttons
 */

/**
 * @typedef {Object} MachineNode
 * @property {MachineNode | undefined} parent
 * @property {number} count
 * @property {string} diagram
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

    class Aoc101 extends HTMLElement {
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
                const diagram = tokens[0].substring(1, tokens[0].length - 1);
                const buttons = tokens
                    .slice(1, tokens.length - 1)
                    .map(x => x.substring(1, x.length - 1).split(',').map(Number));
                return { diagram, buttons };
            });

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
                    diagram: this.toggleLights('.'.repeat(machine.diagram.length), button),
                    count: 1,
                    button: button,
                };
                return node;
            });

            while (queue.length) {
                const node = queue.splice(0, 1).at(0);
                if (node.diagram === machine.diagram) {
                    return node;
                }
                queue.push(
                    ...this.getButtonsForNewNodes(machine.buttons, node)
                        .map(button => {
                            /** @type {MachineNode} */
                            const childNode = {
                                diagram: this.toggleLights(node.diagram, button),
                                count: node.count + 1,
                                button: button,
                                parent: node,
                            };
                            return childNode;
                        })
                );
            }
        }

        /**
         * @param {number[][]} buttons
         * @param {MachineNode} currentNode
         */
        getButtonsForNewNodes(buttons, currentNode) {
            let result = buttons;
            let node = currentNode;
            while (node) {
                result = result.filter(button => button !== node.button);
                node = node.parent;
            }
            return result;
        }

        /**
         * @param {string} diagram
         * @param {number[]} button
         */
        toggleLights(diagram, button) {
            let lights = diagram.split('');
            button.forEach(index => {
                lights[index] = lights[index] === '.' ? '#' : '.';
            });
            return lights.join('');
        }

        writeOutput(output) {
            this.shadowRoot.querySelector("p").textContent = `Output: ${output}`;
        }
    }

    customElements.define("aoc-101", Aoc101);
})();
