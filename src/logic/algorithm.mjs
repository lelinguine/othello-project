// export default Pruning;
function Pruning(nodes, grid) {
    // Si un seul coup possible, le jouer
    if (nodes.length === 1) {
        return nodes[0];
    }

    // Fonction pour créer une copie profonde de la grille
    function deepCopyGrid(originalGrid) {
        return {
            width: originalGrid.width,
            height: originalGrid.height,
            nodes: originalGrid.nodes.map(node => ({
                ...node,
                children: [...node.children],
                state: node.state
            }))
        };
    }

    // Fonction pour évaluer une position
    function evaluatePosition(gridCopy) {
        const weights = [
            [100, -20, 10, 5, 5, 10, -20, 100],
            [-20, -50, -2, -2, -2, -2, -50, -20],
            [10, -2, -1, -1, -1, -1, -2, 10],
            [5, -2, -1, -1, -1, -1, -2, 5],
            [5, -2, -1, -1, -1, -1, -2, 5],
            [10, -2, -1, -1, -1, -1, -2, 10],
            [-20, -50, -2, -2, -2, -2, -50, -20],
            [100, -20, 10, 5, 5, 10, -20, 100]
        ];

        let score = 0;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const node = gridCopy.nodes[y * gridCopy.width + x];
                if (node.state === 'black') {
                    score += weights[y][x];
                } else if (node.state === 'white') {
                    score -= weights[y][x];
                }
            }
        }
        return score;
    }

    // Fonction pour simuler la capture des pions
    function simulateCapture(gridCopy, move, player) {
        const directions = [
            { x: 1, y: 0 }, { x: -1, y: 0 }, 
            { x: 0, y: 1 }, { x: 0, y: -1 },
            { x: 1, y: 1 }, { x: -1, y: -1 }, 
            { x: -1, y: 1 }, { x: 1, y: -1 }
        ];

        // Place le pion
        const nodeIndex = move.y * gridCopy.width + move.x;
        gridCopy.nodes[nodeIndex].state = player;

        // Pour chaque direction
        directions.forEach(dir => {
            let captured = [];
            let x = move.x + dir.x;
            let y = move.y + dir.y;

            // Tant qu'on est dans la grille
            while (x >= 0 && x < gridCopy.width && y >= 0 && y < gridCopy.height) {
                const node = gridCopy.nodes[y * gridCopy.width + x];
                
                // Si case vide ou même couleur, on arrête
                if (!node.state || node.state === player) {
                    if (node.state === player) {
                        // On capture tous les pions entre les deux
                        captured.forEach(pos => {
                            gridCopy.nodes[pos.y * gridCopy.width + pos.x].state = player;
                        });
                    }
                    break;
                }
                
                // Ajoute le pion à capturer
                captured.push({x: x, y: y});
                x += dir.x;
                y += dir.y;
            }
        });
    }

    // Algorithme Alpha-Beta
    function alphaBeta(gridCopy, depth, alpha, beta, maximizingPlayer, currentPlayer) {
        if (depth === 0) {
            return evaluatePosition(gridCopy);
        }

        // Trouve les coups valides (pions grisés)
        const validMoves = gridCopy.nodes.filter(node => 
            node.state === currentPlayer + '-grey'
        ).map(node => ({
            x: node.x,
            y: node.y
        }));

        if (validMoves.length === 0) {
            return evaluatePosition(gridCopy);
        }

        if (maximizingPlayer) {
            let maxEval = -Infinity;
            for (const move of validMoves) {
                // Copie la grille pour la simulation
                const newGridCopy = deepCopyGrid(gridCopy);
                // Simule le coup
                simulateCapture(newGridCopy, move, currentPlayer);
                // Récursion
                const evalScore = alphaBeta(
                    newGridCopy, 
                    depth - 1, 
                    alpha, 
                    beta, 
                    false, 
                    currentPlayer === 'black' ? 'white' : 'black'
                );
                maxEval = Math.max(maxEval, evalScore);
                alpha = Math.max(alpha, evalScore);
                if (beta <= alpha) break;
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (const move of validMoves) {
                const newGridCopy = deepCopyGrid(gridCopy);
                simulateCapture(newGridCopy, move, currentPlayer);
                const evalScore = alphaBeta(
                    newGridCopy, 
                    depth - 1, 
                    alpha, 
                    beta, 
                    true, 
                    currentPlayer === 'black' ? 'white' : 'black'
                );
                minEval = Math.min(minEval, evalScore);
                beta = Math.min(beta, evalScore);
                if (beta <= alpha) break;
            }
            return minEval;
        }
    }

    // Trouve le meilleur coup
    let bestMove = null;
    let bestScore = -Infinity;
    const searchDepth = 3;  // Profondeur de recherche

    for (const node of nodes) {
        const gridCopy = deepCopyGrid(grid);
        simulateCapture(gridCopy, node, node.state.replace('-grey', ''));
        const score = alphaBeta(
            gridCopy,
            searchDepth,
            -Infinity,
            Infinity,
            false,
            node.state.replace('-grey', '') === 'black' ? 'white' : 'black'
        );

        if (score > bestScore) {
            bestScore = score;
            bestMove = node;
        }
    }

    // Retourne le meilleur coup ou un coup aléatoire si aucun bon coup trouvé
    return bestMove || nodes[Math.floor(Math.random() * nodes.length)];
}

export default Pruning;