import { expect } from 'chai';
import { Game } from '../src/logic/classes/Game.mjs';
import { Grid } from '../src/logic/classes/Grid.mjs';
import { JSDOM } from 'jsdom'; // JSDOM pour simuler le navigateur

describe('Game', function () {
    // Avant chaque test, on crée une nouvelle instance de Grid et de Game
    beforeEach(function () {
        const dom = new JSDOM('<!DOCTYPE html><html><body><div id="grid-container"></div><div id="context"></div></body></html>');
        
        global.document = dom.window.document;
        global.window = dom.window;

        // Définir navigator via Object.defineProperty
        Object.defineProperty(global, 'navigator', {
            value: { userAgent: 'node.js' },
            writable: true
        });

        this.grid = new Grid({ width: 8, height: 8 }); // Crée une grille 8x8
        this.game = new Game(this.grid); // Crée une nouvelle partie avec la grille
    });

    it('should initialize the board correctly', function () {
        // Vérifier que les cases centrales ont bien été initialisées
        const middle = Math.floor(this.grid.width / 2);
        expect(this.grid.getById(middle * this.grid.width + middle).state).to.equal('white');
        expect(this.grid.getById((middle - 1) * this.grid.width + (middle - 1)).state).to.equal('white');
        expect(this.grid.getById(middle * this.grid.width + (middle - 1)).state).to.equal('black');
        expect(this.grid.getById((middle - 1) * this.grid.width + middle).state).to.equal('black');
        expect(this.game.currentPlayer).to.equal('black');
    });

    it('should display the correct winner at the end of the game', function () {
        // Créer une fin de partie
        this.game.endGame();

        const contextContainer = document.getElementById('context');
        expect(contextContainer.innerHTML).to.include('<p>It\'s a tie!</p>'); // Vérifier qu'il y a un message de match nul
    });
});
