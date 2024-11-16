import { Grid } from './Grid.mjs';
import { nodeUpdateEventTarget } from '../events.mjs';

export class GridDOM extends Grid {

    /**
     * Builds a grid object
     * @param {*} options {
     * width: number, width of the grid,
     * height: number, height of the grid,
     * walls: [number], array of node ids that are walls,
     * cost: boolean, true if the nodes should have a cost
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

                    let innerDiv = document.createElement('div'); //create a div element to display the node id and cost
                    
                    //init white and black circles in the middle of the grid 
                    if(i == this.options.height/2 - 1 && j == this.options.width/2 - 1 || i == this.options.height/2 && j == this.options.width/2) {
                        innerDiv.className = 'circle white';
                    }
                    else if (i == this.options.height/2 && j == this.options.width/2 - 1 || i == this.options.height/2 - 1 && j == this.options.width/2) {
                        innerDiv.className = 'circle black';
                    }
                    else {
                        innerDiv.className = 'circle';
                    
                        //add event listener to toggle
                        let self = this;
                        function handleClick(event) {
                            let target = event.currentTarget;
                            let node = self.get(target.id);
                            self.pawnToggle(node, target); 
                            nodeUpdateEventTarget.node = node; 
                            nodeUpdateEventTarget.dispatchEvent(new Event('nodeUpdateEvent', node));
                            target.removeEventListener('click', handleClick);
                        }
                        td.addEventListener('click', handleClick);
                    }

                    td.appendChild(innerDiv);
                }
            }

            //append grid to the DOM
            document.getElementById('grid-container').appendChild(htmlTableGrid);
        }
    }

    //temporaire à faire proprement
    pawnToggle(node, target) {
        console.log('node', node);
        const div = target.querySelector('div');

        compteur = compteur + 1;

        if (compteur%2 == 0) {
            div.classList.add('white');
            div.classList.remove('black');
        }
        else {
            div.classList.add('black');
            div.classList.remove('white');
        }
    }
}

let compteur = 0;