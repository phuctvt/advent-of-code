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

    class Aoc72 extends HTMLElement {
        /**
         * @type {Map<string, number>}
         */
        cache = new Map();

        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        /**
         * @param {string} input 
         */
        run(input) {
            let count = 0;
            const lines = input.trim().split('\n').map(x => x.split(''));

            count += this.countTimelinesFrom(lines, 2, lines[2].indexOf('^'), 'LEFT');
            count += this.countTimelinesFrom(lines, 2, lines[2].indexOf('^'), 'RIGHT');

            this.writeOutput(count);
        }

        /**
         * @param {string[][]} lines
         * @param {number} splitterRowIndex
         * @param {number} splitterColIndex
         * @param {'LEFT' | 'RIGHT'} side
         * @returns {number}
         */
        countTimelinesFrom(lines, splitterRowIndex, splitterColIndex, side) {
            if (splitterRowIndex === lines.length - 2) {
                // reached the bottom
                return 1;
            }

            const fallingColIndex = side === 'LEFT' ? splitterColIndex - 1 : splitterColIndex + 1;
            for (let rowIndex = splitterRowIndex + 2; rowIndex <= lines.length - 2; rowIndex = rowIndex + 2) {
                if (lines[rowIndex][fallingColIndex] === '^') {
                    const key = `${rowIndex}-${fallingColIndex}`;
                    if (this.cache.has(key)) {
                        return this.cache.get(key);
                    }
                    let count = 0;
                    count += this.countTimelinesFrom(lines, rowIndex, fallingColIndex, 'LEFT');
                    count += this.countTimelinesFrom(lines, rowIndex, fallingColIndex, 'RIGHT');
                    this.cache.set(key, count);
                    return count;
                }
            }

            // reached the bottom
            return 1;
        }

        writeOutput(output) {
            this.shadowRoot.querySelector("p").textContent = `Output: ${output}`;
        }
    }

    customElements.define("aoc-72", Aoc72);
})();
