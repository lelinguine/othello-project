/**
 * Represents a node object
 * If used in a 2D array, the id can be used as the index
 * If used in a grid, the x and y coordinates can be used
 * More dimensions can be added by adding more coordinates
 * @param {number} id - the node id
 * @param {number} x - the x coordinate
 * @param {number} y - the y coordinate
 * @param {number} cost - the cost of the node
 */
export class Node {
    constructor(id, x, y, cost = 0) {
        this.id = id;
        this.cost = cost;
        this.parent = null; //parent node, for oriented graphs
        this.children = []; //children nodes for oriented graphs == edges for non-oriented graphs

        this.visited = false; //flag to indicate if the node has been visited
        this.found = false; //flag to indicate if the node has been found

        this.path = false; //flag to indicate if the node is part of the path

        this.x = x;
        this.y = y;

        this.state = null; //state of the node
    }

    addChild(node) {
        if (!this.children.includes(node)) this.children.push(node);
    }

    removeChild(node) {
        this.children = this.children.filter(n => n !== node);
    }

    addParent(node) {
        this.parent = node;
    }

    contains(node) {
        return this.children.includes(node);
    }

    get length() {
        return this.children.length;
    }

    /**
     * Clear the node's properties
     */
    clear() {
        this.visited = false;
        this.found = false;
        this.path = false;
        this.parent = null;
        this.children = [];
    }

    /**
     * Clear the node's children
     */
    clearChildren() {
        this.children = [];
    }
}