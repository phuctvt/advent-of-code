(() => {
    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            :host {
                display: inline-block;
            }
            button {
                color: var(--text-color);
                background-color: transparent;
                border: none;
                font-family: var(--font-family);
                font-size: 1rem;
                cursor: pointer;
                padding: 0;

                &:hover {
                    font-weight: bold;
                }
            }
        </style>

        <button>
            [<slot></slot>]
        </button>
    `;

    class AocButton extends HTMLElement {
        static observedAttributes = ['value'];

        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }
    }

    customElements.define("aoc-button", AocButton);
})();
