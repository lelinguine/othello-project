/**
 * Returns an event target containing a node
 */
export class NodeEvent extends EventTarget {
    constructor(node) {
        super();
        this._node = node;
    }

    set node(node) {
        this._node = node;
    }

    get node() {
        return this._node;
    }
};

export let nodeUpdateEventTarget = new NodeEvent();

// -------------------------------------------------------------------------------------------------------------------

/**
 * Returns an event target containing a grid
 */
export class GridEvent extends EventTarget {
    constructor(grid) {
        super();
        this._grid = grid;
    }

    set grid(grid) {
        this._grid = grid;
        this._grid.render();
    }

    get grid() {
        return this._grid;
    }
};

export let gridUpdateEventTarget = new GridEvent();