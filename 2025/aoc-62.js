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

    class Aoc62 extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        /**
         * @param {string} input 
         */
        run(input) {
            const lines = input.split('\n');
            const lastLine = lines.at(-1);

            let count = 0;
            let scanIndex = lines[0].length - 1;
            while (scanIndex >= 0) {
                const nextOperatorIndex = this.findNextOperatorIndex(lastLine, scanIndex);
                const operator = lastLine[nextOperatorIndex];

                let value = operator === '*' ? 1 : 0;
                for (let colIndex = scanIndex; colIndex >= nextOperatorIndex; colIndex--) {
                    let numberAsText = '';
                    for (let rowIndex = 0; rowIndex <= lines.length - 2; rowIndex++) {
                        if (lines[rowIndex][colIndex] === ' ') {
                            continue;
                        }
                        numberAsText += lines[rowIndex][colIndex];
                    }
                    value = operator === '*'
                        ? value * parseInt(numberAsText, 10)
                        : value + parseInt(numberAsText, 10);
                }
                count += value;
                scanIndex = nextOperatorIndex - 2;
            }

            this.writeOutput(count);
        }

        /**
         * @param {string} lastLine
         * @param {number} scanIndex
         * @returns {number}
         */
        findNextOperatorIndex(lastLine, scanIndex) {
            for (let i = scanIndex; i >= 0; i--) {
                if (lastLine[i] === '*' || lastLine[i] === '+') {
                    return i;
                }
            }
            throw new Error('Not found');
        }

        writeOutput(output) {
            this.shadowRoot.querySelector("p").textContent = `Output: ${output}`;
        }
    }

    customElements.define("aoc-62", Aoc62);
})();
