import { nodeUpdateEventTarget, gridUpdateEventTarget } from '../events.mjs';
import Pruning from '../algorithm.mjs';

export class Robot {
    constructor(game, grid, player, mod, heuristic) {
        this.game = game;
        this.grid = grid;
        this.player = player;
        this.mod = mod;
        this.heuristic = heuristic; //"pruning" or "random"
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
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    play() {
        if (this.game.currentPlayer === this.player && this.isPlaying && !this.game.gameOver) {
    
            let contextContainer = document.getElementById('context');
            if (this.mod === "player" && contextContainer) {
                contextContainer.innerHTML = "<p>Thinking...</p>";
                contextContainer.style.display = 'flex';
            }
    
            let validMoves = this.grid.nodes.filter(node => node.state === this.player + '-grey');
            if (validMoves.length === 0) {
                return;
            }

            // Algorithme de recherche
            let node;
            // Pruning
            if(this.heuristic === "pruning") {
                node = Pruning(validMoves, this.grid);
            }
            // Random
            else {
                node = validMoves[Math.floor(Math.random() * validMoves.length)];
            }
    
            setTimeout(() => {

                if (this.mod === "player" && contextContainer) {
                    contextContainer.style.display = 'none';
                }
        
                nodeUpdateEventTarget.node = node;
                nodeUpdateEventTarget.dispatchEvent(new Event('NodeUpdateEvent', node));
            }, 200);
        }
    }

    stop() {
        this.isPlaying = false;
    }
}