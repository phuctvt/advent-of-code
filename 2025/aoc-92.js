/**
 * @typedef {Object} Point
 * @property {number} rowIndex
 * @property {number} colIndex
 */

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

    class Aoc92 extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        /**
         * @param {string} input
         */
        run(input) {
            /** @type {Point[]} */
            const points = input.trim().split('\n').map(line => {
                const [colIndex, rowIndex] = line.split(',').map(Number);
                return { rowIndex, colIndex };
            });

            let max = 0;
            for (let i = 0; i < points.length; i++) {
                const point1 = points[i];
                for (let j = 0; j < points.length; j++) {
                    const point2 = points[j];
                    if (
                        i === j ||
                        point1.rowIndex === point2.rowIndex ||
                        point1.colIndex === point2.colIndex ||
                        this.rectangleHasLineInsideOrCut(point1, point2, points) ||
                        !this.rectangleCentralPointIsInside(point1, point2, points)
                    ) {
                        continue;
                    }
                    const area = this.getArea(point1, point2);
                    if (area > max) {
                        max = area;
                    }
                }
            }

            this.writeOutput(max);
        }

        /**
         * @param {Point} point1
         * @param {Point} point2
         * @param {Point[]} points
         */
        rectangleHasLineInsideOrCut(point1, point2, points) {
            const rectangleRowIndex1 = Math.min(point1.rowIndex, point2.rowIndex);
            const rectangleRowIndex2 = Math.max(point1.rowIndex, point2.rowIndex);
            const rectangleColIndex1 = Math.min(point1.colIndex, point2.colIndex);
            const rectangleColIndex2 = Math.max(point1.colIndex, point2.colIndex);

            for (let i = 0; i < points.length; i++) {
                const linePoint1 = points[i];
                const linePoint2 = i === points.length - 1 ? points[0] : points[i + 1];
                // the line has at least one point is inside
                if (
                    rectangleRowIndex1 < linePoint1.rowIndex && linePoint1.rowIndex < rectangleRowIndex2 &&
                    rectangleColIndex1 < linePoint1.colIndex && linePoint1.colIndex < rectangleColIndex2
                ) {
                    return true;
                }
                if (
                    rectangleRowIndex1 < linePoint2.rowIndex && linePoint2.rowIndex < rectangleRowIndex2 &&
                    rectangleColIndex1 < linePoint2.colIndex && linePoint2.colIndex < rectangleColIndex2
                ) {
                    return true;
                }
                // line's points are not inside but cutting vertically
                if (linePoint1.colIndex === linePoint2.colIndex) {
                    const linePointRowIndex1 = Math.min(linePoint1.rowIndex, linePoint2.rowIndex);
                    const linePointRowIndex2 = Math.max(linePoint1.rowIndex, linePoint2.rowIndex);
                    if (
                        linePointRowIndex1 <= rectangleRowIndex1 && rectangleRowIndex2 <= linePointRowIndex2 &&
                        rectangleColIndex1 < linePoint1.colIndex && linePoint1.colIndex < rectangleColIndex2
                    ) {
                        return true;
                    }
                }
                // line's points are not inside but cutting hortizontally
                else {
                    const linePointColIndex1 = Math.min(linePoint1.colIndex, linePoint2.colIndex);
                    const linePointColIndex2 = Math.max(linePoint1.colIndex, linePoint2.colIndex);
                    if (
                        linePointColIndex1 <= rectangleColIndex1 && rectangleColIndex2 <= linePointColIndex2 &&
                        rectangleRowIndex1 < linePoint1.rowIndex && linePoint1.rowIndex < rectangleRowIndex2
                    ) {
                        return true;
                    }
                }
            }

            return false;
        }

        /**
         * @param {Point} point1
         * @param {Point} point2
         * @param {Point[]} points
         */
        rectangleCentralPointIsInside(point1, point2, points) {
            const centralPointRowIndex = Math.round(Math.abs(point1.rowIndex + point2.rowIndex) / 2);
            const centralPointColIndex = Math.round(Math.abs(point1.colIndex + point2.colIndex) / 2);
            let count = 0;
            for (let i = 0; i < points.length; i++) {
                const linePoint1 = points[i];
                const linePoint2 = i === points.length - 1 ? points[0] : points[i + 1];
                if (
                    linePoint1.rowIndex === linePoint2.rowIndex &&
                    linePoint1.rowIndex > centralPointRowIndex &&
                    (
                        linePoint1.colIndex <= centralPointColIndex && centralPointColIndex <= linePoint2.colIndex ||
                        linePoint2.colIndex <= centralPointColIndex && centralPointColIndex <= linePoint1.colIndex
                    )
                ) {
                    count++;
                }
            }
            return count % 2 === 1;
        }

        /**
         * @param {Point} point1
         * @param {Point} point2
         */
        getArea(point1, point2) {
            return (Math.abs(point1.colIndex - point2.colIndex) + 1)
                * (Math.abs(point1.rowIndex - point2.rowIndex) + 1);
        }

        writeOutput(output) {
            this.shadowRoot.querySelector("p").textContent = `Output: ${output}`;
        }
    }

    customElements.define("aoc-92", Aoc92);
})();
