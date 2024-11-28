import { Grid } from './Grid.mjs';
import { nodeUpdateEventTarget } from '../events.mjs';

export class GridDOM extends Grid {

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

        this.init();
    }

    /**
     * Init the grid to the DOM
     */
    init() {
        //render the grid
        this.render();
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
                    
                    td.addEventListener('click', (event) => this.handleCellClick(event));
                    td.appendChild(div);
                }
            }

            //append grid to the DOM
            let gridContainer = document.getElementById('grid-container');
            gridContainer.innerHTML = "";
            document.getElementById('grid-container').appendChild(htmlTableGrid);
        }
    }

    handleCellClick(event) {
        let self = this;
        let target = event.currentTarget;
        let node = self.get(target.id);
        
        nodeUpdateEventTarget.node = node;
        nodeUpdateEventTarget.dispatchEvent(new Event('nodeUpdateEvent', node));

        const div = target.querySelector('div');
        div.classList.add(node.state);

        this.render();

        target.removeEventListener('click', this.handleCellClick);
    }

}