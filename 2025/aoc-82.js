/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */

/**
 * @typedef {Object} Connection
 * @property {number} point1
 * @property {number} point2
 * @property {number} distance
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

    class Aoc82 extends HTMLElement {
        /**
         * @type {Map<string, number>}
         */
        cache = new Map();

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
            const points = input.trim().split('\n')
                .map(line => {
                    const [x, y, z] = line.split(',');
                    return { x, y, z };
                });

            /** @type {Connection[]} */
            const connections = [];

            for (let i = 0; i < points.length; i++) {
                for (let j = 0; j < points.length; j++) {
                    const key1 = this.getKey(i, j);
                    const key2 = this.getKey(j, i);
                    if (
                        j === i || this.cache.has(key1) || this.cache.has(key2)
                    ) {
                        continue;
                    }

                    if (this.cache.has(key2)) {
                        return this.cache.get(key2);
                    }
                    const distance = this.distanceVector(points, i, j);
                    this.cache.set(key1, distance);
                    connections.push({
                        point1: i,
                        point2: j,
                        distance: distance,
                    });
                }
            }

            connections.sort((a, b) => a.distance - b.distance);

            /** @type {number[][]} */
            const bags = [];

            /** @type {Connection} */
            let lastConnection;
            for (let i = 0; i < connections.length; i++) {
                const connection = connections[i];
                const existingBagIndex1 = bags.findIndex(bag => bag.includes(connection.point1));
                const existingBagIndex2 = bags.findIndex(bag => bag.includes(connection.point2));

                if (existingBagIndex1 === -1 && existingBagIndex2 === -1) {
                    bags.push([connection.point1, connection.point2]);
                } else if (existingBagIndex1 !== existingBagIndex2) {
                    if (existingBagIndex1 !== -1 && existingBagIndex2 !== -1) {
                        const bag1 = bags[existingBagIndex1];
                        const bag2 = bags[existingBagIndex2];
                        bags[existingBagIndex1] = [...bag1, ...bag2];
                        bags.splice(existingBagIndex2, 1);
                    } else if (existingBagIndex1 !== -1) {
                        const bag1 = bags[existingBagIndex1];
                        bag1.push(connection.point2);
                    } else if (existingBagIndex2 !== -1) {
                        const bag2 = bags[existingBagIndex2];
                        bag2.push(connection.point1);
                    }
                }
                if (bags.length === 1 && bags[0].length === points.length) {
                    lastConnection = connection;
                    break;
                }
            }

            console.log(lastConnection);

            this.writeOutput(points[lastConnection.point1].x * points[lastConnection.point2].x);
        }

        distanceVector(points, i, j) {
            const v1 = points[i];
            const v2 = points[j];

            const dx = v1.x - v2.x;
            const dy = v1.y - v2.y;
            const dz = v1.z - v2.z;
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        }

        getKey(i, j) {
            return `${i}-${j}`;
        }

        writeOutput(output) {
            this.shadowRoot.querySelector("p").textContent = `Output: ${output}`;
        }
    }

    customElements.define("aoc-82", Aoc82);
})();
