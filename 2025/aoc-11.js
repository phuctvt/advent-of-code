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

    class Aoc11 extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        /**
         * @param {string} input 
         */
        run(input) {
            let value = 50;
            let count = 0;
            const lines = input.trim().split("\n");
            lines.forEach((line) => {
                if (line[0] === 'L') {
                    value -= parseInt(line.substring(1), 10);
                } else if (line[0] === 'R') {
                    value += parseInt(line.substring(1), 10);
                } else {
                    throw new Error(`Invalid input line: ${line}`);
                }
                if (Math.abs(value) >= 100) {
                    value = value % 100;
                }
                if (value === 0) {
                    count++;
                }
                console.log(`line=${line}, value=${value}, count=${count}\n`);
                if (Math.abs(value) >= 100) {
                    throw new Error(`value=${value}`);
                }
            });
            this.shadowRoot.querySelector("p").textContent = `Output: ${count}`;
        }
    }

    customElements.define("aoc-11", Aoc11);
})();