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

    class Aoc71 extends HTMLElement {
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
            const rowLength = lines.length;
            const colLength = lines[0].length;

            // first move
            for (let colIndex = 0; colIndex < colLength; colIndex++) {
                if (lines[0][colIndex] === 'S') {
                    lines[1][colIndex] = '|';
                    break;
                }
            }

            // remaining moves
            for (let rowIndex = 2; rowIndex < rowLength; rowIndex++) {
                for (let colIndex = 0; colIndex < colLength; colIndex++) {
                    const token = lines[rowIndex][colIndex];
                    if (token === '^' && lines[rowIndex - 1][colIndex] === '|') {
                        lines[rowIndex][colIndex - 1] = '|';
                        lines[rowIndex][colIndex + 1] = '|';
                        count++;
                    } else if (token === '.' && lines[rowIndex - 1][colIndex] === '|') {
                        lines[rowIndex][colIndex] = '|';
                    }
                }

            }

            console.log(lines.map(x => x.join('')).join('\n'));

            this.writeOutput(count);
        }

        writeOutput(output) {
            this.shadowRoot.querySelector("p").textContent = `Output: ${output}`;
        }
    }

    customElements.define("aoc-71", Aoc71);
})();
