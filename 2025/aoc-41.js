(() => {
    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            :host {
                display: block;
            }
        </style>
        <p>Output:</p>
    `;

    class Aoc41 extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        /**
         * @param {string} input 
         */
        run(input) {
            const grid = input.trim().split('\n');

            const colLength = grid[0].length;
            let count = 0;
            for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
                for (let colIndex = 0; colIndex < colLength; colIndex++) {
                    if (
                        grid[rowIndex][colIndex] === '@' &&
                        this.canForklistsAccess(grid, rowIndex, colIndex)
                    ) {
                        console.log(`rowIndex=${rowIndex}, colIndex=${colIndex}`);
                        count++;
                    }
                }
            }

            this.shadowRoot.querySelector("p").textContent = `Output: ${count}`;
        }

        /**
         * @param {string[]} grid
         * @param {number} rowIndex
         * @param {number} colIndex
         */
        canForklistsAccess(grid, rowIndex, colIndex) {
            const maxColIndex = grid[0].length - 1;
            const maxRowIndex = grid.length - 1;
            let rollOfPaperCount = 0;
            // top, top left, top right
            if (rowIndex > 0) {
                if (grid[rowIndex - 1][colIndex] === '@') {
                    rollOfPaperCount++;
                }
                if (colIndex > 0 && grid[rowIndex - 1][colIndex - 1] === '@') {
                    rollOfPaperCount++;
                }
                if (colIndex < maxColIndex && grid[rowIndex - 1][colIndex + 1] === '@') {
                    rollOfPaperCount++;
                }
            }
            // bottom, bottom left, bottom right
            if (rowIndex < maxRowIndex) {
                if (grid[rowIndex + 1][colIndex] === '@') {
                    rollOfPaperCount++;
                }
                if (colIndex > 0 && grid[rowIndex + 1][colIndex - 1] === '@') {
                    rollOfPaperCount++;
                }
                if (colIndex < maxColIndex && grid[rowIndex + 1][colIndex + 1] === '@') {
                    rollOfPaperCount++;
                }
            }
            // left
            if (colIndex > 0 && grid[rowIndex][colIndex - 1] === '@') {
                rollOfPaperCount++;
            }
            // right
            if (colIndex < maxColIndex && grid[rowIndex][colIndex + 1] === '@') {
                rollOfPaperCount++;
            }
            return rollOfPaperCount < 4;
        }
    }

    customElements.define("aoc-41", Aoc41);
})();
