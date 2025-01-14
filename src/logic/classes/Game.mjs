import { Timer } from './Timer.mjs';
import { nodeUpdateEventTarget } from '../events.mjs';

export class Game {
    constructor(grid) {
        this.grid = grid;
        this.currentPlayer = 'black'; // Le joueur noir commence
        this.isThinking = false;     // Indique si l'IA réfléchit
        this.isTurnInProgress = false; // Indique si un tour est en cours
        this.laps = 0;
        this.timer = new Timer();
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        this.aiPlayers = ['white']; // Liste des joueurs IA
=======
        this.aiPlayers = ['white']; // Liste des joueurs IA (ajustez selon vos besoins)
>>>>>>> Stashed changes
=======
        this.aiPlayers = ['white']; // Liste des joueurs IA (ajustez selon vos besoins)
>>>>>>> Stashed changes
        this.listenToNodeUpdates();
        this.initializeBoard();

        // Si le joueur actuel est une IA, elle joue tout de suite
        if (this.isAI(this.currentPlayer)) {
            this.playAI();
        }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    }

=======

    }
>>>>>>> Stashed changes
=======

    }
>>>>>>> Stashed changes
    // Détermine si le joueur actuel est une IA
    isAI(player) {
        return this.aiPlayers.includes(player);
    }

    listenToNodeUpdates() {
        nodeUpdateEventTarget.addEventListener('NodeUpdateEvent', (event) => {
            const node = event.target.node;
            this.handleNodeUpdate(node);
        });
    }

    initializeBoard() {
        const middle = Math.floor(this.grid.width / 2);
        this.grid.getById(middle * this.grid.width + middle).state = 'white';
        this.grid.getById((middle - 1) * this.grid.width + (middle - 1)).state = 'white';
        this.grid.getById(middle * this.grid.width + (middle - 1)).state = 'black';
        this.grid.getById((middle - 1) * this.grid.width + middle).state = 'black';
        this.markValidMoves();
    }

    handleNodeUpdate(node) {
        if (this.isTurnInProgress) return;
        this.isTurnInProgress = true;

        if (this.isValidMove(node.x, node.y)) {
            node.state = this.currentPlayer;
            this.capturePawns(node);

            // Émettre les scores mis à jour
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            this.emitScoreUpdate();
=======
            this.emitScoreUpdate();       
>>>>>>> Stashed changes
=======
            this.emitScoreUpdate();       
>>>>>>> Stashed changes

            // Changer de joueur
            this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black';

            // Vérifier si le prochain joueur est une IA
            if (this.isAI(this.currentPlayer)) {
                this.playAI();
            }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes

            // Incrémenter le compteur de tours
            this.laps++;
>>>>>>> Stashed changes

            this.laps++;
            if (!this.hasValidMoves(this.currentPlayer)) {
                this.skipTurn();
            }
            if (this.isGameOver()) {
                this.timer.stop();
                this.endGame();
            }
            this.markValidMoves();
        }
<<<<<<< Updated upstream
<<<<<<< Updated upstream

        this.isTurnInProgress = false;
=======
        
>>>>>>> Stashed changes
=======
        
>>>>>>> Stashed changes
    }

    emitScoreUpdate() {
        const score = this.getScore();
        const event = new CustomEvent('score-update', { detail: score });
        window.dispatchEvent(event);
    }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
    // Une méthode pour émettre les scores vers le composant Vue.js
    emitScoreUpdate() {
        const score = this.getScore(); // Calculer les scores actuels
        const event = new CustomEvent('score-update', { detail: score }); // Créer un événement avec les scores
        window.dispatchEvent(event); // Émettre l'événement au niveau global
    }
    

    // -------------------------------------------------------------------------------------------------------------------

    // Capture des pions selon les règles du jeu
>>>>>>> Stashed changes
    capturePawns(node) {
        const directions = [
            { x: 1, y: 0 }, { x: -1, y: 0 },
            { x: 0, y: 1 }, { x: 0, y: -1 },
            { x: 1, y: 1 }, { x: -1, y: -1 },
            { x: -1, y: 1 }, { x: 1, y: -1 }
        ];

        directions.forEach(direction => {
            let captured = [];
            let x = node.x + direction.x;
            let y = node.y + direction.y;

            while (this.isValidPosition(x, y)) {
                const neighbor = this.grid.getById(y * this.grid.width + x);

                if (neighbor.state === this.currentPlayer) {
                    captured.forEach(n => n.state = this.currentPlayer);
                    break;
                }

                if (neighbor.state === null) break;

                captured.push(neighbor);
                x += direction.x;
                y += direction.y;
            }
        });
    }

    isValidMove(x, y) {
        const node = this.grid.getById(y * this.grid.width + x);
        if (node.state !== null) return false;

        const directions = [
            { x: 1, y: 0 }, { x: -1, y: 0 },
            { x: 0, y: 1 }, { x: 0, y: -1 },
            { x: 1, y: 1 }, { x: -1, y: -1 },
            { x: -1, y: 1 }, { x: 1, y: -1 }
        ];

        return directions.some(direction => this.isValidMoveInDirection(x, y, direction));
    }

    isValidMoveInDirection(x, y, direction) {
        let foundOpponent = false;
        let newX = x + direction.x;
        let newY = y + direction.y;

        while (this.isValidPosition(newX, newY)) {
            const neighbor = this.grid.getById(newY * this.grid.width + newX);

            if (neighbor.state === null) return false;
            if (neighbor.state === this.currentPlayer) return foundOpponent;

            foundOpponent = true;
            newX += direction.x;
            newY += direction.y;
        }

        return false;
    }

    isValidPosition(x, y) {
        return x >= 0 && x < this.grid.width && y >= 0 && y < this.grid.height;
    }

    hasValidMoves(player) {
        for (let x = 0; x < this.grid.width; x++) {
            for (let y = 0; y < this.grid.height; y++) {
                if (this.isValidMove(x, y)) return true;
            }
        }
        return false;
    }

    markValidMoves() {
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

    resetValidMoves() {
        for (let x = 0; x < this.grid.width; x++) {
            for (let y = 0; y < this.grid.height; y++) {
                const node = this.grid.getById(y * this.grid.width + x);
                if (node.state === 'black-grey' || node.state === 'white-grey') {
                    node.state = null;
                }
            }
        }
    }

    skipTurn() {
        this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black';
        this.laps++;
        this.markValidMoves();
    }

<<<<<<< Updated upstream
    playAI() {
        if (this.isThinking || this.isTurnInProgress) return;
        this.isThinking = true;
=======
    // -------------------------------------------------------------------------------------------------------------------
        // Joue automatiquement pour l'IA en choisissant le meilleur coup
playAI() {
    let validMoves = this.getValidMoves();
    if (validMoves.length > 0) {
        // Évaluer et choisir le meilleur coup
        let bestMove = validMoves[0];
        let bestScore = -Infinity;
<<<<<<< Updated upstream
=======

        validMoves.forEach(move => {
            let score = this.evaluateMove(move);
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        });

        this.handleNodeUpdate(bestMove); // Effectue le meilleur coup trouvé
    }

    console.log("L'IA réfléchit...");

    // Ajoutez un délai avant que l'IA joue
    setTimeout(() => {
        let validMoves = this.getValidMoves(); // Trouver les coups valides
        if (validMoves.length > 0) {
            // Choisir un coup, ici basé sur votre logique existante
            let bestMove = validMoves[0];
            let bestScore = -Infinity;

            validMoves.forEach(move => {
                let score = this.evaluateMove(move);
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            });

            this.handleNodeUpdate(bestMove); // L'IA joue le coup choisi
        }
    }, 5000); // Délai de 5000ms (5 secondes)
}

// Récupère tous les coups valides pour le joueur actuel
getValidMoves() {
    let moves = [];
    for (let x = 0; x < this.grid.width; x++) {
        for (let y = 0; y < this.grid.height; y++) {
            if (this.isValidMove(x, y)) {
                moves.push(this.grid.getById(y * this.grid.width + x));
            }
        }
    }
    return moves;
}

// Évalue un coup pour l'IA
evaluateMove(node) {
    // Donne un score aux coins
    const corners = [
        { x: 0, y: 0 },
        { x: 0, y: this.grid.height - 1 },
        { x: this.grid.width - 1, y: 0 },
        { x: this.grid.width - 1, y: this.grid.height - 1 }
    ];

    for (let corner of corners) {
        if (node.x === corner.x && node.y === corner.y) {
            return 100; // Score élevé pour un coin
        }
    }

    // Calculer un score basé sur le nombre de captures potentielles
    let captureScore = this.getPotentialCaptures(node).length;
    return captureScore;
}

// Retourne les pions capturables pour un coup donné
getPotentialCaptures(node) {
    const directions = [
        { x: 1, y: 0 },  // droite
        { x: -1, y: 0 }, // gauche
        { x: 0, y: 1 },  // bas
        { x: 0, y: -1 }, // haut
        { x: 1, y: 1 },  // diagonale bas droite
        { x: -1, y: -1 }, // diagonale haut gauche
        { x: -1, y: 1 },  // diagonale bas gauche
        { x: 1, y: -1 }   // diagonale haut droite
    ];

    let captured = [];

    directions.forEach(direction => {
        let tempCaptured = [];
        let x = node.x + direction.x;
        let y = node.y + direction.y;

        while (this.isValidPosition(x, y)) {
            let neighbor = this.grid.getById(y * this.grid.width + x);

            if (this.isNextMove(neighbor)) {
                break;
            }

            if (neighbor.state === this.currentPlayer) {
                captured = captured.concat(tempCaptured);
                break;
            }

            tempCaptured.push(neighbor);

            x += direction.x;
            y += direction.y;
        }
    });

    return captured;
}

getScore() {
    let blackCount = 0;
    let whiteCount = 0;

    for (let x = 0; x < this.grid.width; x++) {
        for (let y = 0; y < this.grid.height; y++) {
            const node = this.grid.getById(y * this.grid.width + x);
            if (node.state === 'black') {
                blackCount++;
            } else if (node.state === 'white') {
                whiteCount++;
            }
        }
    }

    return { black: blackCount, white: whiteCount };
}

    // -------------------------------------------------------------------------------------------------------------------
>>>>>>> Stashed changes

        validMoves.forEach(move => {
            let score = this.evaluateMove(move);
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        });

        this.handleNodeUpdate(bestMove); // Effectue le meilleur coup trouvé
    }

    console.log("L'IA réfléchit...");

    // Ajoutez un délai avant que l'IA joue
    setTimeout(() => {
        let validMoves = this.getValidMoves(); // Trouver les coups valides
        if (validMoves.length > 0) {
            // Choisir un coup, ici basé sur votre logique existante
            let bestMove = validMoves[0];
            let bestScore = -Infinity;

            validMoves.forEach(move => {
                let score = this.evaluateMove(move);
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            });

            this.handleNodeUpdate(bestMove); // L'IA joue le coup choisi
        }
    }, 5000); // Délai de 5000ms (5 secondes)
}

// Récupère tous les coups valides pour le joueur actuel
getValidMoves() {
    let moves = [];
    for (let x = 0; x < this.grid.width; x++) {
        for (let y = 0; y < this.grid.height; y++) {
            if (this.isValidMove(x, y)) {
                moves.push(this.grid.getById(y * this.grid.width + x));
            }
        }
    }
    return moves;
}

// Évalue un coup pour l'IA
evaluateMove(node) {
    // Donne un score aux coins
    const corners = [
        { x: 0, y: 0 },
        { x: 0, y: this.grid.height - 1 },
        { x: this.grid.width - 1, y: 0 },
        { x: this.grid.width - 1, y: this.grid.height - 1 }
    ];

    for (let corner of corners) {
        if (node.x === corner.x && node.y === corner.y) {
            return 100; // Score élevé pour un coin
        }
    }

    // Calculer un score basé sur le nombre de captures potentielles
    let captureScore = this.getPotentialCaptures(node).length;
    return captureScore;
}

// Retourne les pions capturables pour un coup donné
getPotentialCaptures(node) {
    const directions = [
        { x: 1, y: 0 },  // droite
        { x: -1, y: 0 }, // gauche
        { x: 0, y: 1 },  // bas
        { x: 0, y: -1 }, // haut
        { x: 1, y: 1 },  // diagonale bas droite
        { x: -1, y: -1 }, // diagonale haut gauche
        { x: -1, y: 1 },  // diagonale bas gauche
        { x: 1, y: -1 }   // diagonale haut droite
    ];

    let captured = [];

    directions.forEach(direction => {
        let tempCaptured = [];
        let x = node.x + direction.x;
        let y = node.y + direction.y;

        while (this.isValidPosition(x, y)) {
            let neighbor = this.grid.getById(y * this.grid.width + x);

            if (this.isNextMove(neighbor)) {
                break;
            }

            if (neighbor.state === this.currentPlayer) {
                captured = captured.concat(tempCaptured);
                break;
            }

            tempCaptured.push(neighbor);

            x += direction.x;
            y += direction.y;
        }
    });

    return captured;
}

getScore() {
    let blackCount = 0;
    let whiteCount = 0;

    for (let x = 0; x < this.grid.width; x++) {
        for (let y = 0; y < this.grid.height; y++) {
            const node = this.grid.getById(y * this.grid.width + x);
            if (node.state === 'black') {
                blackCount++;
            } else if (node.state === 'white') {
                whiteCount++;
            }
        }
    }

    return { black: blackCount, white: whiteCount };
}

    // -------------------------------------------------------------------------------------------------------------------
>>>>>>> Stashed changes

        setTimeout(() => {
            if (!this.hasValidMoves(this.currentPlayer)) {
                this.skipTurn();
            } else {
                const validMoves = this.getValidMoves();
                if (validMoves.length > 0) {
                    let bestMove = validMoves[0];
                    let bestScore = -Infinity;

                    validMoves.forEach(move => {
                        const score = this.evaluateMove(move);
                        if (score > bestScore) {
                            bestScore = score;
                            bestMove = move;
                        }
                    });

                    this.handleNodeUpdate(bestMove);
                }
            }
            this.isThinking = false;
        }, 3000); // Temps d'attente : 3 secondes
    }

    getValidMoves() {
        const moves = [];
        for (let x = 0; x < this.grid.width; x++) {
            for (let y = 0; y < this.grid.height; y++) {
                if (this.isValidMove(x, y)) {
                    moves.push(this.grid.getById(y * this.grid.width + x));
                }
            }
        }
        return moves;
    }

    evaluateMove(node) {
        const corners = [
            { x: 0, y: 0 },
            { x: 0, y: this.grid.height - 1 },
            { x: this.grid.width - 1, y: 0 },
            { x: this.grid.width - 1, y: this.grid.height - 1 }
        ];

        if (corners.some(corner => node.x === corner.x && node.y === corner.y)) {
            return 100;
        }

        return this.getPotentialCaptures(node).length;
    }

    stop() {
        console.log("Le jeu est arrêté.");
        this.timer.stop(); // Arrêter le timer si cela est pertinent.
    }

    getPotentialCaptures(node) {
        const directions = [
            { x: 1, y: 0 }, { x: -1, y: 0 },
            { x: 0, y: 1 }, { x: 0, y: -1 },
            { x: 1, y: 1 }, { x: -1, y: -1 },
            { x: -1, y: 1 }, { x: 1, y: -1 }
        ];

        let captured = [];
        directions.forEach(direction => {
            let tempCaptured = [];
            let x = node.x + direction.x;
            let y = node.y + direction.y;

            while (this.isValidPosition(x, y)) {
                const neighbor = this.grid.getById(y * this.grid.width + x);

                if (neighbor.state === this.currentPlayer) {
                    captured = captured.concat(tempCaptured);
                    break;
                }

                if (neighbor.state === null) break;

                tempCaptured.push(neighbor);
                x += direction.x;
                y += direction.y;
            }
        });

        return captured;
    }

    getScore() {
        let blackCount = 0;
        let whiteCount = 0;

        for (let x = 0; x < this.grid.width; x++) {
            for (let y = 0; y < this.grid.height; y++) {
                const node = this.grid.getById(y * this.grid.width + x);
                if (node.state === 'black') blackCount++;
                if (node.state === 'white') whiteCount++;
            }
        }

        return { black: blackCount, white: whiteCount };
    }

    isGameOver() {
        return !this.hasValidMoves('black') && !this.hasValidMoves('white');
    }

    endGame() {
        const score = this.getScore();
        const contextContainer = document.getElementById('context');
        contextContainer.innerHTML = '';

        const p = document.createElement('p');
        if (score.black > score.white) p.innerHTML = 'Black wins!';
        else if (score.white > score.black) p.innerHTML = 'White wins!';
        else p.innerHTML = "It's a tie!";

        contextContainer.appendChild(p);
        contextContainer.style.display = 'flex';
    }
}
