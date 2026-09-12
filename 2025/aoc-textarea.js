(() => {
    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            :host {
                display: inline-block;
            }
            textarea {
                color: var(--text-color);
                background-color: var(--coltrol-bg-color);
                scrollbar-color: gray transparent;
            }
        </style>

        <textarea></textarea>
    `;

    class AocTextarea extends HTMLElement {
        static observedAttributes = ['value'];

        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        connectedCallback() {
            this.textarea = this.shadowRoot.querySelector("textarea");
            if (this.hasAttribute("rows")) {
                this.textarea.setAttribute("rows", this.getAttribute("rows"));
            }
            if (this.hasAttribute("cols")) {
                this.textarea.setAttribute("cols", this.getAttribute("cols"));
            }
            this.textarea.addEventListener('change', e => {
                this.dispatchEvent(new CustomEvent('change', { composed: true, bubbles: true }));
            })
        }

        get value() {
            return this.textarea.value;
        }

        set value(value) {
            this.textarea.value = value;
        }
    }

    customElements.define("aoc-textarea", AocTextarea);
})();
