function Pruning(robot, nodes) {
    // Obtenir le joueur actuel
    let player = robot.player;

    // Obtenir la grille actuelle
    let grid = robot.grid;

    // Obtenir le nœud actuel (coup en cours)
    let node = nodes[0];

    // Profondeur de recherche
    let depth = 3;

    // Valeurs d'Alpha et Beta pour l'élagage
    let alpha = -Infinity;
    let beta = Infinity;

    // Meilleur mouvement et score
    let bestMove = null;
    let bestScore = -Infinity;

    // Obtenir les enfants du nœud actuel
    let children = grid.getChildren(node);

    // Pour chaque enfant, calculer l'évaluation
    for (let child of children) {
        // Simuler le coup en modifiant l'état du jeu
        
        // Appeler minimax pour évaluer la position
        let score = minimax(nodes, robot, depth, alpha, beta, false, player);
        
        // Réinitialiser l'état de la case après simulation

        // Mettre à jour le meilleur coup si nécessaire
        if (score > bestScore) {
            bestScore = score;
            bestMove = child;
        }

        // Alpha-Beta Pruning
        alpha = Math.max(alpha, score);
        if (beta <= alpha) {
            break; // Élagage
        }
    }

    return bestMove;
}

function minimax(nodes, robot, depth, alpha, beta, maximizingPlayer, currentPlayer) {
    // Condition d'arrêt : profondeur 0 ou fin du jeu
    if (depth === 0) {
        return evaluateScore(robot.grid, currentPlayer);
    }

    let possibleMoves = nodes;
    
    if (maximizingPlayer) {
        let maxEval = -Infinity;
        for (let move of possibleMoves) {
            // Simuler le coup
            let evalScore = minimax(nodes, robot, depth - 1, alpha, beta, false, currentPlayer);

            maxEval = Math.max(maxEval, evalScore);
            alpha = Math.max(alpha, evalScore);
            if (beta <= alpha) return maxEval; // Élagage Alpha
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let move of possibleMoves) {
            // Simuler le coup de l'adversaire
            let evalScore = minimax(nodes, robot, depth - 1, alpha, beta, true, currentPlayer);

            minEval = Math.min(minEval, evalScore);
            beta = Math.min(beta, evalScore);
            if (beta <= alpha) break; // Élagage Beta
        }
        return minEval;
    }
}

// Fonction d'évaluation : calcule l'écart entre le nombre de jetons du joueur et de l'adversaire
function evaluateScore(grid, player) {
    let playerCount = 0;
    let opponentCount = 0;
    let opponent = player === 'white' ? 'black' : 'white';

    grid.nodes.forEach(node => {
        if (node.state === player) {
            playerCount++;
        } else if (node.state === opponent) {
            opponentCount++;
        }
    });

    return playerCount - opponentCount; // Retourne l'écart entre les jetons du joueur et de l'adversaire
}

export default Pruning;