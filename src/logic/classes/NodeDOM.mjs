import { Node } from './Node.mjs';

/**
 * Represents a node object in a 2D grid
 * @param {number} id - the node id
 * @param {number} x - the x coordinate
 * @param {number} y - the y coordinate
 * @param {number} cost - the cost of the node
 */
export class NodeDOM extends Node {

    constructor(id, x, y, cost = 0) {
        super(id, cost);
    }



    
}