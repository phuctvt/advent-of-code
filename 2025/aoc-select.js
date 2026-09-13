(() => {
    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            :host {
                display: inline-block;
            }
            .container {
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                &:hover {
                    font-weight: bold;
                    select {
                        font-weight: inherit;
                    }
                }
                &:focus-within {
                    outline: 5px auto -webkit-focus-ring-color;
                }
            }
            select {
                background-color: transparent;
                border: none;
                color: var(--text-color);
                font-family: var(--font-family);
                font-size: 1rem;
                cursor: inherit;
                &:focus {
                    outline: none;
                }
            }
        </style>

        <span class="container">
            <span id="prefix">[</span>
            <select></select>
            <span id="suffix">]</span>
        </span>
    `;

    class AocSelect extends HTMLElement {
        static observedAttributes = ['value'];

        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        connectedCallback() {
            this.select = this.shadowRoot.querySelector("select");
            this.select.addEventListener('change', e => {
                this.dispatchEvent(new CustomEvent('change', { composed: true, bubbles: true }));
            })

            this.prefixElement = this.shadowRoot.querySelector('#prefix');
            this.prefixElement.addEventListener('click', () => {
                this.select.showPicker();
            });

            this.suffixElement = this.shadowRoot.querySelector('#suffix');
            this.suffixElement.addEventListener('click', () => {
                this.select.showPicker();
            });
        }

        get value() {
            return this.select.value;
        }

        set value(value) {
            this.select.value = value;
        }

        setOptions(options) {
            if (!options?.length) {
                return;
            }
            this.select.replaceChildren(...options.map(option => {
                const optionElement = document.createElement('option');
                optionElement.setAttribute('value', option);
                optionElement.textContent = option;
                return optionElement;
            }));
        }
    }

    customElements.define("aoc-select", AocSelect);
})();
