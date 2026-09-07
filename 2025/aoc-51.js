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

    class Aoc51 extends HTMLElement {
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
            const freshIdRanges = [];
            let index = 0;

            while (lines[index] !== '') {
                const [first, second] = lines[index].split('-').map(x => parseInt(x, 10));
                freshIdRanges.push([first, second]);
                index++;
            }

            index++;
            let count = 0;

            while (index < lines.length) {
                const id = parseInt(lines[index], 10);
                if (freshIdRanges.some(([start, end]) => start <= id && id <= end)) {
                    count++;
                }
                index++;
            }

            this.shadowRoot.querySelector("p").textContent = `Output: ${count}`;
        }
    }

    customElements.define("aoc-51", Aoc51);
})();
