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

    class Aoc12 extends HTMLElement {
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
                let rotateValue = parseInt(line.substring(1), 10);
                if (rotateValue >= 100) {
                    count += Math.floor(rotateValue / 100);
                    rotateValue = rotateValue % 100;
                }
                if (line[0] === 'L') {
                    rotateValue *= -1;
                }

                const oldValue = value;
                value += rotateValue;

                if (oldValue * value < 0 || value === 0) {
                    count++;
                } else if (Math.abs(value) >= 100) {
                    value = value % 100;
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

    customElements.define("aoc-12", Aoc12);
})();