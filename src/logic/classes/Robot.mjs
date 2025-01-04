import { nodeUpdateEventTarget, gridUpdateEventTarget } from '../events.mjs';
import Pruning from '../algorithm.mjs';

export class Robot {
    constructor(game, grid, player, mod) {
        this.game = game;
        this.grid = grid;
        this.player = player;
        this.mod = mod;
        this.isPlaying = true;
        this.listenToNodeUpdates();
    }

    // Écoute les événements de mise à jour des nœuds
    listenToNodeUpdates() {
        gridUpdateEventTarget.addEventListener('GridUpdateEvent', () => {
            this.play();
        });
    }

    // Joue un coup
    play() {
        if (this.game.currentPlayer === this.player && this.isPlaying) {
            let contextContainer = document.getElementById('context');
            if(this.mod == "player") {
                if(contextContainer == null) {
                    return;
                }

                contextContainer.innerHTML = "";

                let p = document.createElement('p');
                p.innerHTML = 'Thinking...';
        
                contextContainer.appendChild(p);
                contextContainer.style.display = 'flex';
            }
    
            // Récupérer dans la grid les nodes qui ont le state
            let whiteGreyNodes = this.grid.nodes.filter(node => node.state === this.player + '-grey');
    
            if (whiteGreyNodes.length === 0) {
                return;  // Sortie si aucun coup n'est disponible
            }
    
            // TODO: implémenter l'algorithme de recherche
            let node = Pruning(this, whiteGreyNodes);
            node.found = false;

            let randomNode = whiteGreyNodes[Math.floor(Math.random() * whiteGreyNodes.length)];

            console.log('Robot played:', node);
            console.log('Robot played:', randomNode);

            setTimeout(() => {
                nodeUpdateEventTarget.node = node;
                nodeUpdateEventTarget.dispatchEvent(new Event('NodeUpdateEvent', node));
                if(this.mod == "player") {
                    contextContainer.style.display = 'none';
                }
            }, 400);
        }
    }

    stop() {
        this.isPlaying = false;
    }
}