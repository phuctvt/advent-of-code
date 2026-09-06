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

    class Aoc21 extends HTMLElement {
        /**
         * @type {Map<number, number[]>}
         */
        map = new Map();

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

                if (startText.length === endText.length) {
                    if (startText.length % 2 !== 0) {
                        return;
                    }
                    invalidIds.push(...this.getForMinMax(startText.length, start, end));
                    return;
                }

                for (let length = startText.length; length <= endText.length; length++) {
                    if (length % 2 !== 0) {
                        continue;
                    }
                    const min = length === startText.length
                        ? start : parseInt("1" + "0".repeat(length - 1), 10);
                    const max = length === endText.length
                        ? end : parseInt("9".repeat(length), 10);
                    invalidIds.push(...this.getForMinMax(length, min, max));
                }

            });
            this.shadowRoot.querySelector("p").textContent =
                `Output: ${invalidIds.reduce((sum, id) => sum + id, 0)}`;
        }

        /**
         * @param {number} length
         * @param {number} min
         * @param {number} max
         * @returns {number[]}
         */
        getForMinMax(length, min, max) {
            if (!this.map.has(length)) {
                this.initForLength(length);
            }
            return this.map.get(length)
                .filter((invalidNumber) => invalidNumber >= min && invalidNumber <= max);
        }

        initForLength(length) {
            if (length % 2 !== 0) {
                throw new Error(`Length must be even: ${length}`);
            }
            const invalidNumbers = [];
            const halfLength = length / 2;
            const startFirstHalf = parseInt("1" + "0".repeat(halfLength - 1), 10);
            const endFirstHalf = parseInt("9".repeat(halfLength), 10);
            for (let i = startFirstHalf; i <= endFirstHalf; i++) {
                invalidNumbers.push(parseInt(i.toString() + i.toString(), 10));
            }
            this.map.set(length, invalidNumbers);
        }
    }

    customElements.define("aoc-21", Aoc21);
})();