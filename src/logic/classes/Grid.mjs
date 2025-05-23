import { Graph } from './Graph.mjs';
import { Node } from './Node.mjs';

import { Game } from './Game.mjs';

/**
 * Represents a grid object
 * @param {number} width - the width of the grid
 * @param {number} height - the height of the grid
 */
export class Grid extends Graph {

    /**
     * Builds a grid object
     * @param {*} options {
     * width: number, width of the grid,
     * height: number, height of the grid,
     * }
     */
    constructor(options) {
        super(options);

        //set grid width and height, default to 10 x 10 if not provided
        this.width = options?.width ? options.width : 8;
        this.height = options?.height ? options.height : 8;

        //build Grid nodes
        let id = 0; //node id
        for (let iY = 0; iY < this.height; iY++) { //loop through the grid height
            for (let iX = 0; iX < this.width; iX++) { //loop through the grid width
                let cost = 1; //set a random cost between 2 and 15 if cost is true, set to 1 if not
                let node = new Node(id, iX, iY, cost); //create a new NodeGrid Object
                this.addNode(node); //add the node to the grid
                id++; //increment the node id
            }
        }
    }

    /**
     * discover node children from the grid (up, down, left, right)
     * @param {Node} node - the node to get children from
     * @returns {Array} - an array of nodes that are children of the node
     */
    getChildren(node) {

        let children = [];
        let { x, y } = this.getCoordinates(node.id);

        //get children only if they are next to each other within the grid width and height
        let childrenIds = [];

        if (x - 1 >= 0) childrenIds.push(this.getId(x - 1, y));
        if (x + 1 < this.width) childrenIds.push(this.getId(x + 1, y));
        if (y - 1 >= 0) childrenIds.push(this.getId(x, y - 1));
        if (y + 1 < this.height) childrenIds.push(this.getId(x, y + 1));

        // if the child exists, and has not already been found, we mark it as found and add it to children
        childrenIds.map((id) => {
            let child = this.getById(id);
            if (child && child.parent == null && !child.found && !child.visited) {
                child.found = true; //mark the child as found
                child.parent = node; //set the parent node
                children.push(child); //add the child to the children array
            }
        });

        return children;
    }

    /**
     * Get node id from x and y coordinates in the grid
     * @param {number} x - x axis coordinate
     * @param {number} y - y axis coordinate
     * @returns {number} - the node id
     */
    getId(x, y) {
        return y * this.width + x % this.width;
    }

    /**
     * Get coordinates from node id
     * @param {number} id 
     * @returns {Object} - {x: number, y: number}
     */
    getCoordinates(id) {
        let x = id % this.width;
        let y = Math.floor(id / this.width);
        return { x: x, y: y };
    }
}