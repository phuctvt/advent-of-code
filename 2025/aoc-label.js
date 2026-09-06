(() => {
    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            :host {
                display: block;
            }
            .multi-line {
                display: block;
                margin-bottom: 5px;
            }
        </style>

        <label></label>
        <slot></slot>
    `;

    class AocLabel extends HTMLElement {
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
        }
    }

    customElements.define("aoc-label", AocLabel);
})();