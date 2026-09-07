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

    class Aoc52 extends HTMLElement {
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
            const ranges = [];
            let index = 0;

            while (lines[index] !== '') {
                const [first, second] = lines[index].split('-').map(x => parseInt(x, 10));
                ranges.push([first, second]);
                index++;
            }

            ranges.sort((range1, range2) => range1[0] - range2[0]);

            /**
             * @type {number[][]}
             */
            const mergedRanges = [ranges[0]];

            for (let i = 1; i < ranges.length; i++) {
                const [start, end] = ranges[i];
                const lastRange = mergedRanges.at(-1);
                const [, lastRangeEnd] = lastRange;

                if (start <= lastRangeEnd) {
                    lastRange[1] = Math.max(lastRangeEnd, end);
                } else {
                    mergedRanges.push([start, end]);
                }
            }

            this.shadowRoot.querySelector("p").textContent =
                `Output: ${mergedRanges.reduce((sum, range) => sum + (range[1] - range[0] + 1), 0)}`;
        }
    }

    customElements.define("aoc-52", Aoc52);
})();
