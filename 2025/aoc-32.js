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

    class Aoc32 extends HTMLElement {
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
                const maxJoltageLength = 12;
                let maxJoltage = '';
                let startIndex = 0;
                while (maxJoltage.length < maxJoltageLength) {
                    const endIndex = joltages.length - maxJoltageLength + maxJoltage.length + 1;

                    let maxIndex = startIndex;
                    for (let i = startIndex; i < endIndex; i++) {
                        if (joltages[i] > joltages[maxIndex]) {
                            maxIndex = i;
                        }
                    }
                    maxJoltage += joltages[maxIndex].toString();
                    startIndex = maxIndex + 1;
                }
                console.log(`bank=${bank}, maxJoltage=${maxJoltage}`)
                maximumJoltages.push(parseInt(maxJoltage, 10));
            });
            this.shadowRoot.querySelector("p").textContent =
                `Output: ${maximumJoltages.reduce((sum, joltage) => sum + joltage, 0)}`;
        }
    }

    customElements.define("aoc-32", Aoc32);
})();
