import { Grid } from './Grid.mjs';

import { nodeUpdateEventTarget } from '../events.mjs';

export class Game {

    /**
     * Builds a game object
     */
    constructor(grid) {
        this.grid = grid;
        this.laps = 0;

        this.listenToNodeUpdates();
    }

    /**
     * Écoute les événements de mise à jour des nœuds
     */
    listenToNodeUpdates() {
        nodeUpdateEventTarget.addEventListener('nodeUpdateEvent', (event) => {
            const updatedNode = event.target.node; // Récupère le nœud mis à jour
            this.handleNodeUpdate(updatedNode);   // Traite le nœud mis à jour
        });
    }

    /**
     * Traite les mises à jour d'un nœud
     * @param {Object} node - Le nœud mis à jour
     */
    handleNodeUpdate(node) {
        console.log(`Nœud mis à jour :`, node);

        this.laps++;

        if(node.state == null) {
            if (this.laps%2 == 0) {
                node.state = 'white';
            }
            else {
                node.state = 'black';
            }
        }
    }
}