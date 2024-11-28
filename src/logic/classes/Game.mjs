import { Timer } from './Timer.mjs';
import { nodeUpdateEventTarget } from '../events.mjs';

export class Game {

    constructor(grid) {
        this.grid = grid;
        this.currentPlayer = 'black'; // Le joueur noir commence
        this.laps = 0;
        this.timer = new Timer();
        this.listenToNodeUpdates();
        this.initializeBoard();
    }

    // Écoute les événements de mise à jour des nœuds
    listenToNodeUpdates() {
        nodeUpdateEventTarget.addEventListener('NodeUpdateEvent', (event) => {
            const node = event.target.node; // Récupère le nœud mis à jour
            this.handleNodeUpdate(node);   // Traite le nœud mis à jour
        });
    }

    // Initialisation de la grille avec les 4 pions de départ
    initializeBoard() {
        const middle = Math.floor(this.grid.width / 2);
        this.grid.getById(middle * this.grid.width + middle).state = 'white';
        this.grid.getById((middle - 1) * this.grid.width + (middle - 1)).state = 'white';
        this.grid.getById(middle * this.grid.width + (middle - 1)).state = 'black';
        this.grid.getById((middle - 1) * this.grid.width + middle).state = 'black';
        this.markValidMoves();
    }

    // Gère les mises à jour d'un nœud
    handleNodeUpdate(node) {
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

            // Vérifier si le joueur peut encore jouer
            if (!this.hasValidMoves(this.currentPlayer)) {
                this.skipTurn();
            }

            // Vérifier la fin de la partie
            if (this.isGameOver()) {
                this.timer.stop();
                this.endGame();
            }

            this.markValidMoves();
        }
    }

    // -------------------------------------------------------------------------------------------------------------------


    // -------------------------------------------------------------------------------------------------------------------

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

                if (this.isNextMove(neighbor)) {
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
        if (!this.isNextMove(node)) {
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

                if (this.isNextMove(neighbor)) {
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

    // Vérifie si un joueur a des coups valides à jouer
    hasValidMoves(player) {
        for (let x = 0; x < this.grid.width; x++) {
            for (let y = 0; y < this.grid.height; y++) {
                if (this.isValidMove(x, y)) {
                    return true;
                }
            }
        }
        return false;
    }

    // Marquer les cases valides où le joueur actuel peut jouer
    markValidMoves() {
        // Réinitialiser les cases valides
        this.resetValidMoves();

        for (let x = 0; x < this.grid.width; x++) {
            for (let y = 0; y < this.grid.height; y++) {
                const node = this.grid.getById(y * this.grid.width + x);
                if (this.isValidMove(x, y)) {
                    node.state = this.currentPlayer === 'black' ? 'black-grey' : 'white-grey';
                }
            }
        }
    }

    isNextMove(node) {
        return node.state === null || node.state === 'black-grey' || node.state === 'white-grey';
    }

    // Réinitialiser les cases valides à leur état d'origine
    resetValidMoves() {
        for (let x = 0; x < this.grid.width; x++) {
            for (let y = 0; y < this.grid.height; y++) {
                const node = this.grid.getById(y * this.grid.width + x);
                if (this.isNextMove(node)) {
                    node.state = null;  // Réinitialiser l'état de la case
                }
            }
        }
    }

    // Sauter le tour du joueur actuel si aucun coup valide
    skipTurn() {
        // Passer au joueur suivant
        this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black';
        this.laps++; // Incrémenter les tours même si le joueur ne joue pas

        this.markValidMoves();
    }

    // -------------------------------------------------------------------------------------------------------------------

    // Vérifie si la partie est terminée (aucun coup valide possible pour les deux joueurs)
    isGameOver() {
        // Vérifie si l'un des joueurs ne peut plus jouer
        const blackMoves = this.hasValidMoves('black');
        const whiteMoves = this.hasValidMoves('white');
        return !blackMoves && !whiteMoves;
    }

    // Gère la fin de la partie et affiche le gagnant
    endGame() {
        const blackCount = this.countPawns('black');
        const whiteCount = this.countPawns('white');

        let contextContainer = document.getElementById('context');
        contextContainer.innerHTML = "";

        let p = document.createElement('p');
        if (blackCount > whiteCount) {
            p.innerHTML = 'Black wins!';
        } else if (whiteCount > blackCount) {
            p.innerHTML = 'White wins!';
        } else {
            p.innerHTML = 'It\'s a tie!';
        }

        contextContainer.appendChild(p);
        contextContainer.style.display = 'flex';
    }

    // Compte le nombre de pions d'un joueur
    countPawns(player) {
        let count = 0;
        for (let x = 0; x < this.grid.width; x++) {
            for (let y = 0; y < this.grid.height; y++) {
                const node = this.grid.getById(y * this.grid.width + x);
                if (node.state === player) {
                    count++;
                }
            }
        }
        return count;
    }
}
