(() => {
    const template = document.createElement('template');
    const days = ['1.1', '1.2', '2.1', '2.2', '3.1', '3.2', '4.1', '4.2', '5.1', '5.2', '6.1', '6.2', '7.1', '7.2'];

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
            }
            #paste1, #paste2 {
                position: absolute;
                right: 0;
                cursor: pointer;
                &:hover {
                    font-weight: bold;
                }
            }
        </style>

        <div class="container">
            <aoc-label value="Day:">
                <select id="day">
                    ${days.map(day => `<option value="${day}">${day}</option>`).join('')}
                </select>
            </aoc-label>

            <div class="text-input-container">
                <div id="paste1">[Paste]</div>
                <aoc-label id="exampleInputLabel" value="[ ] Example input" multi-line label-cursor-pointer>
                    <textarea id="exampleInput" rows="10" cols="50"></textarea>
                </aoc-label>
            </div>

            <div class="text-input-container">
                <div id="paste2">[Paste]</div>
                <aoc-label id="actualInputLabel" value="[ ] Actual input" multi-line label-cursor-pointer>
                    <textarea id="actualInput" rows="10" cols="50"></textarea>
                </aoc-label>
            </div>
        </div>
    `;

    class AocInput extends HTMLElement {
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
            this.exampleInputLabel = this.shadowRoot.getElementById("exampleInputLabel");
            this.exampleInput = this.shadowRoot.getElementById("exampleInput");
            this.actualInputLabel = this.shadowRoot.getElementById("actualInputLabel");
            this.actualInput = this.shadowRoot.getElementById("actualInput");
            this.pasteBtn1 = this.shadowRoot.getElementById("paste1");
            this.pasteBtn2 = this.shadowRoot.getElementById("paste2");

            this.inputType = localStorage.getItem("aoc-input-type") || 'EXAMPLE_INPUT';
            if (this.inputType === 'EXAMPLE_INPUT') {
                this.checkExampleInput();
            } else {
                this.checkActualInput();
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
            this.exampleInputLabel.addEventListener('label-click', () => {
                this.checkExampleInput();
                this.inputType = 'EXAMPLE_INPUT';
                localStorage.setItem("aoc-input-type", this.inputType);
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
            this.actualInputLabel.addEventListener('label-click', () => {
                this.checkActualInput();
                this.inputType = 'ACTUAL_INPUT';
                localStorage.setItem("aoc-input-type", this.inputType);
            });
            this.pasteBtn2.addEventListener("click", async () => {
                this.actualInput.value = await navigator.clipboard.readText();
                localStorage.setItem("aoc-actual-input", this.actualInput.value);
            });
        }

        checkExampleInput() {
            this.exampleInputLabel.setAttribute('value', '[x] Example input');
            this.actualInputLabel.setAttribute('value', '[ ] Actual input');
        }

        checkActualInput() {
            this.exampleInputLabel.setAttribute('value', '[ ] Example input');
            this.actualInputLabel.setAttribute('value', '[x] Actual input');
        }

        getData() {
            return {
                day: this.day.value,
                textInput: this.inputType === 'EXAMPLE_INPUT'
                    ? this.exampleInput.value : this.actualInput.value
            };
        }
    }

    customElements.define("aoc-input", AocInput);
})();