import { nodeUpdateEventTarget } from '../events.mjs';
import Pruning from '../algorithm.mjs';

export class Robot {
    constructor(game, grid, player) {
        this.game = game;
        this.grid = grid;
        this.player = player;
        this.listenToGridUpdates();
    }

    // Écoute les événements de mise à jour des nœuds
    listenToGridUpdates() {
        // Sélectionnez l'élément que vous souhaitez observer
        let gridContainer = document.getElementById('grid-container');

        // Créez un MutationObserver
        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    this.handleGridUpdate();
                }
            }
        });

        observer.observe(gridContainer, { childList: true, subtree: true, characterData: true });
    }

    // Gère les mises à jour d'un nœud
    handleGridUpdate() {
        if (this.game.currentPlayer === this.player) {
            this.play();
        }
    }

    // Joue un coup
    play() {
        let contextContainer = document.getElementById('context');
        contextContainer.innerHTML = "";

        let p = document.createElement('p');
        p.innerHTML = 'Thinking...';

        contextContainer.appendChild(p);
        contextContainer.style.display = 'flex';

        //recuperer dans la grid les nodes qui ont le state 'white-grey'
        let whiteGreyNodes = this.grid.nodes.filter(node => node.state === 'white-grey');
        //choix aleatoire d'un node
        let randomNode = whiteGreyNodes[Math.floor(Math.random() * whiteGreyNodes.length)];

        //TODO: implementer l'algorithme de recherche
        // const node = Pruning(this.grid);
       
        setTimeout(() => {
            nodeUpdateEventTarget.node = randomNode;
            nodeUpdateEventTarget.dispatchEvent(new Event('NodeUpdateEvent', randomNode));
            contextContainer.style.display = 'none';
            this.grid.render();
        }
        , 800);

    }

}