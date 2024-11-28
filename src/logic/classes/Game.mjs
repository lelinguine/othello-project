import { nodeUpdateEventTarget } from '../events.mjs';

export class Game {

    constructor(grid) {
        this.grid = grid;
        this.currentPlayer = 'black'; // Le joueur noir commence
        this.laps = 0;
        this.listenToNodeUpdates();
        this.initializeBoard();
    }

    // Écoute les événements de mise à jour des nœuds
    listenToNodeUpdates() {
        nodeUpdateEventTarget.addEventListener('nodeUpdateEvent', (event) => {
            const updatedNode = event.target.node; // Récupère le nœud mis à jour
            this.handleNodeUpdate(updatedNode);   // Traite le nœud mis à jour
        });
    }

    // Initialisation de la grille avec les 4 pions de départ
    initializeBoard() {
        const middle = Math.floor(this.grid.width / 2);
        this.grid.getById(middle * this.grid.width + middle).state = 'white';
        this.grid.getById((middle - 1) * this.grid.width + (middle - 1)).state = 'white';
        this.grid.getById(middle * this.grid.width + (middle - 1)).state = 'black';
        this.grid.getById((middle - 1) * this.grid.width + middle).state = 'black';
    }

    // Gère les mises à jour d'un nœud
    handleNodeUpdate(node) {
        console.log(`Nœud mis à jour :`, node);

        // Vérification si le coup est valide avant de placer le pion
        if (this.isValidMove(node.x, node.y)) {
            // On place un pion du joueur actuel
            node.state = this.currentPlayer;

            // Vérification des captures
            this.capturePawns(node);

            // Changer de joueur
            this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black';

            // Incrémenter le compteur de tours
            this.laps++;
        } else {
            console.log('Coup invalide, vous ne pouvez pas poser un pion ici');
        }
    }

    // Capture des pions selon les règles du jeu
    capturePawns(node) {
        const directions = [
            { x: 1, y: 0 },  // droite
            { x: -1, y: 0 }, // gauche
            { x: 0, y: 1 },  // bas
            { x: 0, y: -1 }, // haut
            { x: 1, y: 1 },  // diagonale bas droite
            { x: -1, y: -1 }, // diagonale haut gauche
            { x: -1, y: 1 },  // diagonale bas gauche
            { x: 1, y: -1 },  // diagonale haut droite
        ];

        // Parcours de toutes les directions
        directions.forEach(direction => {
            let captured = [];
            let x = node.x + direction.x;
            let y = node.y + direction.y;

            // On continue de chercher dans la direction jusqu'à ce qu'on dépasse les limites
            while (this.isValidPosition(x, y)) {
                let neighbor = this.grid.getById(y * this.grid.width + x);

                if (neighbor.state === null) {
                    break;
                }

                if (neighbor.state === this.currentPlayer) {
                    // Si on trouve un pion du joueur actuel, on capture tous les pions entre les deux
                    captured.forEach(capturedNode => capturedNode.state = this.currentPlayer);
                    break;
                }

                // Sinon, on ajoute le pion à la liste des pions capturables
                captured.push(neighbor);

                x += direction.x;
                y += direction.y;
            }
        });
    }

    // Vérifie si une position est valide pour jouer un coup
    isValidMove(x, y) {
        // La cellule doit être vide
        const node = this.grid.getById(y * this.grid.width + x);
        if (node.state !== null) {
            return false;
        }

        // Vérifie si le coup peut capturer des pions adverses
        return this.isValidMoveInDirection(x, y);
    }

    // Vérifie si un coup est valide dans une direction donnée
    isValidMoveInDirection(x, y) {
        const directions = [
            { x: 1, y: 0 },  // droite
            { x: -1, y: 0 }, // gauche
            { x: 0, y: 1 },  // bas
            { x: 0, y: -1 }, // haut
            { x: 1, y: 1 },  // diagonale bas droite
            { x: -1, y: -1 }, // diagonale haut gauche
            { x: -1, y: 1 },  // diagonale bas gauche
            { x: 1, y: -1 },  // diagonale haut droite
        ];

        for (const direction of directions) {
            let captured = [];
            let newX = x + direction.x;
            let newY = y + direction.y;

            while (this.isValidPosition(newX, newY)) {
                const neighbor = this.grid.getById(newY * this.grid.width + newX);

                if (neighbor.state === null) {
                    break;
                }

                if (neighbor.state === this.currentPlayer) {
                    // S'il y a des pions capturables entre le pion joué et un pion de même couleur, c'est un coup valide
                    if (captured.length > 0) {
                        return true;
                    }
                    break;
                }

                // Ajouter à la liste des pions à capturer
                captured.push(neighbor);

                newX += direction.x;
                newY += direction.y;
            }
        }

        return false; // Aucun coup valide trouvé
    }

    // Vérifie si une position est valide (dans les limites de la grille)
    isValidPosition(x, y) {
        return x >= 0 && x < this.grid.width && y >= 0 && y < this.grid.height;
    }
}
