import { nodeUpdateEventTarget, gridUpdateEventTarget } from '../events.mjs';

export class Robot {
    constructor(game, grid, player) {
        this.game = game;
        this.grid = grid;
        this.player = player;
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
        if (this.game.currentPlayer === this.player) {
            let contextContainer = document.getElementById('context');
            contextContainer.innerHTML = "";
    
            let p = document.createElement('p');
            p.innerHTML = 'Thinking...';
    
            contextContainer.appendChild(p);
            //contextContainer.style.display = 'flex';
    
            //recuperer dans la grid les nodes qui ont le state 'white-grey'
            let whiteGreyNodes = this.grid.nodes.filter(node => node.state === 'white-grey');
    
            if (whiteGreyNodes.length === 0) {
                console.log('Problem skip turn robot');
                return;  // Sortie si aucun coup n'est disponible
            }
    
            //choix aleatoire d'un node
            let randomNode = whiteGreyNodes[Math.floor(Math.random() * whiteGreyNodes.length)];
    
            //TODO: implementer l'algorithme de recherche
            // const node = Pruning(this.grid);
           
      
            console.log('Robot played' + randomNode);
            nodeUpdateEventTarget.node = randomNode;
            nodeUpdateEventTarget.dispatchEvent(new Event('NodeUpdateEvent', randomNode));
            
            contextContainer.style.display = 'none';
            this.grid.render();
        }
    }
}