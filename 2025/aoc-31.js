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

    class Aoc31 extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        /**
         * @param {string} input 
         */
        run(input) {
            /**
             * @type {number[]}
             */
            const maximumJoltages = [];
            input.trim().split("\n").forEach((bank) => {
                const joltages = bank.trim().split("").map((joltage) => parseInt(joltage, 10));
                const first = Math.max(...joltages.slice(0, joltages.length - 1));
                const firstIndex = joltages.findIndex(value => value === first);
                const second = Math.max(...joltages.slice(firstIndex + 1));
                console.log(`bank=${bank}, first=${first}, second=${second}`);
                maximumJoltages.push(parseInt(first.toString() + second.toString(), 10));
            });
            this.shadowRoot.querySelector("p").textContent =
                `Output: ${maximumJoltages.reduce((sum, joltage) => sum + joltage, 0)}`;
        }
    }

    customElements.define("aoc-31", Aoc31);
})();
