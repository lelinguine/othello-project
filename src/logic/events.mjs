/**
 * Returns an event target containing a node
 * used when a node is updated in a search algorithm
 */
export class NodeEvent extends EventTarget {
    constructor(node) {
        super();
        this._node = node;
    }
    get node() { return this._node; }
    set node(node) { this._node = node; }
};

export let nodeUpdateEventTarget = new NodeEvent();