(() => {
    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            :host {
                display: block;
            }
            .multi-line {
                display: block;
                width: fit-content;
                margin-bottom: 5px;
            }
            .label-cursor-pointer {
                cursor: pointer;
            }
        </style>

        <label></label>
        <slot></slot>
    `;

    class AocLabel extends HTMLElement {
        static observedAttributes = ['value'];

        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        connectedCallback() {
            this.label = this.shadowRoot.querySelector("label");
            this.label.textContent = this.getAttribute("value");
            if (this.hasAttribute("multi-line")) {
                this.label.classList.add("multi-line");
            }
            if (this.hasAttribute("label-cursor-pointer")) {
                this.label.classList.add("label-cursor-pointer");
            }
            this.label.addEventListener('click', () => this.onLabelClick());
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'value' && this.label) {
                this.label.textContent = this.getAttribute("value");
            }
        }

        onLabelClick() {
            this.dispatchEvent(new CustomEvent('label-click', { composed: true, bubbles: true }));
        }
    }

    customElements.define("aoc-label", AocLabel);
})();