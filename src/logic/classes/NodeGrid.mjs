import { Node } from './Node.mjs';

/**
 * Represents a node object in a 2D grid
 * @param {number} id - the node id
 * @param {number} x - the x coordinate
 * @param {number} y - the y coordinate
 * @param {number} cost - the cost of the node
 */
export class NodeGrid extends Node {

    constructor(id, x, y, cost = 0) {
        super(id, cost);
        this.x = x;
        this.y = y;
    }

    clear() {
        this.visited = false;
        this.found = false;
        this.path = false;
        this.h = null; //heuristic
        this.g = null; //cost from start node
        this.parent = null;
        this.children = [];
    }

    clearChildren() {
        this.children = [];
    }

    heuristic(nodeTarget, heuristicName = 'manhattanDistance') {
        switch(heuristicName) {
            case 'manhattanDistance':
                return this.h =  this.manhattanDistance(nodeTarget);
            case 'euclideanDistance':
                return this.h =  this.euclideanDistance(nodeTarget);
            case 'chebyshevDistance':
                return this.h =  this.chebyshevDistance(nodeTarget);
            default:
                return this.h =  this.manhattanDistance(nodeTarget);
        }
    }

    manhattanDistance(node) {
        return Math.abs(this.x - node.x) + Math.abs(this.y - node.y);
    }

    euclideanDistance(node) {
        return Math.sqrt(Math.pow(this.x - node.x, 2) + Math.pow(this.y - node.y, 2));
    }

    chebyshevDistance(node) {
        return Math.max(Math.abs(this.x - node.x), Math.abs(this.y - node.y));
    }
}