import { Grid } from './classes/Grid.mjs';
import { nodeUpdateEventTarget } from './events.mjs';

export class Dom extends Grid {

    /**
     * Builds a grid object
     * @param {*} options {
     * width: number, width of the grid,
     * height: number, height of the grid,
     * }
     */
    constructor(options) {
        super(options);
        this.options = options;
    }

    /**
     * Render the grid to the DOM
     */
    render() {
        if (typeof window === "object") { //Make sure we are in a web browser by testing for the window object

            //create a <table> HTML element
            let htmlTableGrid = document.createElement('table');
            htmlTableGrid.id = 'grid';

            //create html table with this.width and this.height cells
            for (let i = 0; i < this.height; i++) { // create this.height rows

                let tr = htmlTableGrid.appendChild(document.createElement('tr'));

                for (let j = 0; j < this.width; j++) { // create this.width cells

                    let td = tr.appendChild(document.createElement('td'));

                    let node = this.get(this.getId(j, i)); //get the node by coordinates
                    td.id = node.id; //set the cell id to the node id

                    let div = document.createElement('div'); //create a div element to display the node id and cost
                    div.classList.add(node.state, 'circle');

                    if(this.options.mod == "player" && node.state == "black-grey") {
                        td.addEventListener('click', (event) => this.handleCellClick(event));
                    }
                    else if (this.options.mod == "multiplayer" && node.state) {
                        td.addEventListener('click', (event) => this.handleCellClick(event));
                    }
                    
                    td.appendChild(div);
                }
            }
            
            //append grid to the DOM
            let gridContainer = document.getElementById('grid-container');

            if(gridContainer != null) {
                gridContainer.innerHTML = "";
                document.getElementById('grid-container').appendChild(htmlTableGrid);
            }
        }
    }

    /**
     * Handle the cell click event
     */
    handleCellClick(event) {
        let self = this;
        let target = event.currentTarget;
        let node = self.get(target.id);

        console.log('Player played');

        nodeUpdateEventTarget.node = node;
        nodeUpdateEventTarget.dispatchEvent(new Event('NodeUpdateEvent', node));
    }
}