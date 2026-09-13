(() => {
    const template = document.createElement('template');
    const days = [
        '1.1', '1.2', '2.1', '2.2', '3.1', '3.2', '4.1', '4.2',
        '5.1', '5.2', '6.1', '6.2', '7.1', '7.2', '8.1', '8.2'
    ];

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
            .text-input-container {
                position: relative;
                width: fit-content;
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            #paste1, #paste2 {
                position: absolute;
                right: 0;
            }
        </style>

        <div class="container">
            <aoc-label value="Day:">
                <aoc-select id="day"></aoc-select>
            </aoc-label>

            <div class="text-input-container">
                <aoc-radio-button id="exampleInputRadio">Example input</aoc-radio-button>
                <aoc-button id="paste1">Paste</aoc-button>
                <aoc-textarea id="exampleInput" rows="10" cols="50"></aoc-textarea>
            </div>

            <div class="text-input-container">
                <aoc-radio-button id="actualInputRadio">Actual input</aoc-radio-button>
                <aoc-button id="paste2">Paste</aoc-button>
                <aoc-textarea id="actualInput" rows="10" cols="50"></aoc-textarea>
            </div>
        </div>
    `;

    class AocInputData extends HTMLElement {
        /**
         * @type {'EXAMPLE_INPUT' | 'ACTUAL_INPUT'}
         */
        inputType;

        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        connectedCallback() {
            this.day = this.shadowRoot.getElementById("day");
            this.day.setOptions(days);
            this.exampleInputRadio = this.shadowRoot.getElementById("exampleInputRadio");
            this.exampleInput = this.shadowRoot.getElementById("exampleInput");
            this.actualInputRadio = this.shadowRoot.getElementById("actualInputRadio");
            this.actualInput = this.shadowRoot.getElementById("actualInput");
            this.pasteBtn1 = this.shadowRoot.getElementById("paste1");
            this.pasteBtn2 = this.shadowRoot.getElementById("paste2");

            this.inputType = localStorage.getItem("aoc-input-type") || 'EXAMPLE_INPUT';
            if (this.inputType === 'EXAMPLE_INPUT') {
                this.exampleInputRadio.check();
            } else {
                this.actualInputRadio.check();
            }


            if (localStorage.getItem("aoc-day")) {
                this.day.value = localStorage.getItem("aoc-day");
            }
            this.day.addEventListener("change", () => {
                localStorage.setItem("aoc-day", this.day.value);
            });

            if (localStorage.getItem("aoc-example-input")) {
                this.exampleInput.value = localStorage.getItem("aoc-example-input");
            }
            this.exampleInput.addEventListener("change", () => {
                localStorage.setItem("aoc-example-input", this.exampleInput.value);
            });
            this.exampleInputRadio.addEventListener('input', () => {
                this.inputType = 'EXAMPLE_INPUT';
                localStorage.setItem("aoc-input-type", this.inputType);
                this.actualInputRadio.uncheck();
            });
            this.pasteBtn1.addEventListener("click", async () => {
                this.exampleInput.value = await navigator.clipboard.readText();
                localStorage.setItem("aoc-example-input", this.exampleInput.value);
            });

            if (localStorage.getItem("aoc-actual-input")) {
                this.actualInput.value = localStorage.getItem("aoc-actual-input");
            }
            this.actualInput.addEventListener("change", () => {
                localStorage.setItem("aoc-actual-input", this.actualInput.value);
            });
            this.actualInputRadio.addEventListener('input', () => {
                this.inputType = 'ACTUAL_INPUT';
                localStorage.setItem("aoc-input-type", this.inputType);
                this.exampleInputRadio.uncheck();
            });
            this.pasteBtn2.addEventListener("click", async () => {
                this.actualInput.value = await navigator.clipboard.readText();
                localStorage.setItem("aoc-actual-input", this.actualInput.value);
            });
        }

        getData() {
            return {
                day: this.day.value,
                textInput: this.inputType === 'EXAMPLE_INPUT'
                    ? this.exampleInput.value : this.actualInput.value
            };
        }
    }

    customElements.define("aoc-input-data", AocInputData);
})();
