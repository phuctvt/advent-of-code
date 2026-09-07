(() => {
    const template = document.createElement('template');
    const days = ['1.1', '1.2', '2.1', '2.2', '3.1', '3.2', '4.1', '4.2', '5.1', '5.2'];

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
            #paste {
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
                <div id="paste">[Paste]</div>
                <aoc-label value="Text input:" multi-line>
                    <textarea id="textInput" rows="10" cols="50"></textarea>
                </aoc-label>
            </div>
        </div>
    `;

    class AocInput extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        connectedCallback() {
            this.day = this.shadowRoot.getElementById("day");
            this.textInput = this.shadowRoot.getElementById("textInput");
            this.pasteBtn = this.shadowRoot.getElementById("paste");

            if (localStorage.getItem("aoc-day")) {
                this.day.value = localStorage.getItem("aoc-day");
            }
            if (localStorage.getItem("aoc-text-input")) {
                this.textInput.value = localStorage.getItem("aoc-text-input");
            }

            this.day.addEventListener("change", () => {
                localStorage.setItem("aoc-day", this.day.value);
            });
            this.textInput.addEventListener("change", () => {
                localStorage.setItem("aoc-text-input", this.textInput.value);
            });
            this.pasteBtn.addEventListener("click", async () => {
                this.textInput.value = await navigator.clipboard.readText();
                localStorage.setItem("aoc-text-input", this.textInput.value);
            });
        }

        getData() {
            return { day: this.day.value, textInput: this.textInput.value };
        }
    }

    customElements.define("aoc-input", AocInput);
})();