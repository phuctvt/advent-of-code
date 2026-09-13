(() => {
    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            :host {
                display: inline-block;
                width: max-content;
            }
            label {
                cursor: pointer;
                &:hover {
                    font-weight: bold;
                }
                &:focus-within {
                    outline: 5px auto -webkit-focus-ring-color;
                }
            }
            input {
                height: 0;
                width: 0;
                position: absolute;
                & + span::before {
                    content: '[ ]';
                }
                &:checked + span::before {
                    content: '[x]';
                }
            }
        </style>

        <label>
            <input type="radio" />
            <span>
                <slot></slot>
            </span>
        </label>
    `;

    class AocRadioButton extends HTMLElement {
        static observedAttributes = ['checked'];

        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        connectedCallback() {
            this.radioButton = this.shadowRoot.querySelector('input');
        }

        check() {
            this.radioButton.checked = true;
        }

        uncheck() {
            this.radioButton.checked = false;
        }
    }

    customElements.define("aoc-radio-button", AocRadioButton);
})();