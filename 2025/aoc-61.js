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

    class Aoc61 extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        /**
         * @param {string} input 
         */
        run(input) {
            const lines = input.trim().split('\n');

            /**
             * @type {number[][]}
             */
            const allNumbers = [];
            for (let i = 0; i <= lines.length - 2; i++) {
                allNumbers.push(lines[i].split(' ').filter(x => x !== '').map(x => parseInt(x, 10)));
            }

            const operators = lines.at(-1).split(' ').filter(x => x !== '');

            let count = 0;

            for (let colIndex = 0; colIndex < operators.length; colIndex++) {
                const operator = operators[colIndex];
                let value = operator === '*' ? 1 : 0;
                for (let rowIndex = 0; rowIndex <= lines.length - 2; rowIndex++) {
                    value = operator === '*'
                        ? value * allNumbers[rowIndex][colIndex]
                        : value + allNumbers[rowIndex][colIndex];
                }
                count += value;
            }

            this.writeOutput(count);
        }

        writeOutput(output) {
            this.shadowRoot.querySelector("p").textContent = `Output: ${output}`;
        }
    }

    customElements.define("aoc-61", Aoc61);
})();
