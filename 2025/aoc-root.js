(() => {
    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            :host {
                display: block;
            }
            .container {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            button {
                align-self: start;
            }
        </style>

        <h1>Advent of Code 2025</h1>
        
        <div class="container">
            <aoc-input></aoc-input>

            <button>Run</button>

            <div id="outputPlaceHolder"></div>
        </div>
    `;

    class AocRoot extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        connectedCallback() {
            this.input = this.shadowRoot.querySelector("aoc-input");
            this.runButton = this.shadowRoot.querySelector("button");
            this.outputPlaceholder = this.shadowRoot.getElementById("outputPlaceHolder");

            this.runButton.addEventListener("click", () => {
                const inputData = this.input.getData();
                const outputElement = document.createElement(`aoc-${inputData.day.replace('.', '')}`);
                this.outputPlaceholder.replaceChildren(outputElement);
                outputElement.run(inputData.textInput);
            });
        }
    }

    customElements.define("aoc-root", AocRoot);
})();
