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

    class Aoc22 extends HTMLElement {
        /**
         * @type {Map<number, boolean>}
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
            const ranges = input.trim().split(",");
            const invalidIds = [];
            ranges.forEach((range) => {
                const [startText, endText] = range.trim().split("-");
                const [start, end] = [parseInt(startText, 10), parseInt(endText, 10)];

                for (let value = Math.max(11, start); value <= end; value++) {
                    if (this.isInvalid(value)) {
                        invalidIds.push(value);
                    }
                }

            });
            this.shadowRoot.querySelector("p").textContent =
                `Output: ${invalidIds.reduce((sum, id) => sum + id, 0)}`;
        }

        /**
         * @param {number} id
         * @returns {boolean}
         */
        isInvalid(id) {
            if (this.cache.has(id)) {
                return this.cache.get(id);
            }
            const idString = id.toString();
            const idLength = idString.length;
            for (let i = 1; i <= Math.floor(idLength / 2); i++) {
                if (idLength % i !== 0) {
                    continue;
                }
                if (idString.substring(0, i).repeat(idLength / i) === idString) {
                    this.cache.set(id, true);
                    return true;
                }
            }
            this.cache.set(id, false);
            return false;
        }
    }

    customElements.define("aoc-22", Aoc22);
})();