/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
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

    class Aoc91 extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        /**
         * @param {string} input
         */
        run(input) {
            /** @type {Point[]} */
            const points = input.trim().split('\n').map(line => {
                const [y, x] = line.split(',');
                return { x, y };
            });

            let max = 0;
            for (let i = 0; i < points.length; i++) {
                const point1 = points[i];
                for (let j = 0; j < points.length; j++) {
                    if (i === j) {
                        continue;
                    }
                    const point2 = points[j];
                    const area = this.getArea(point1, point2);
                    if (area > max) {
                        max = area;
                    }
                }
            }

            this.writeOutput(max);
        }

        /**
         * @param {Point} point1
         * @param {Point} point2
         */
        getArea(point1, point2) {
            return (Math.abs(point1.x - point2.x) + 1) * (Math.abs(point1.y - point2.y) + 1);
        }

        writeOutput(output) {
            this.shadowRoot.querySelector("p").textContent = `Output: ${output}`;
        }
    }

    customElements.define("aoc-91", Aoc91);
})();
