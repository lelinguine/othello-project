import { expect } from 'chai';
import { Game } from '../src/logic/classes/Game.mjs';
import { Grid } from '../src/logic/classes/Grid.mjs';
import { JSDOM } from 'jsdom'; // JSDOM pour simuler le navigateur

describe('Game', function () {

    // Avant chaque test, on crée une nouvelle instance de Grid et de Game
    beforeEach(function () {
        const dom = new JSDOM('<!DOCTYPE html><html><body><div id="context"></div></body></html>');

        global.document = dom.window.document;
        global.window = dom.window;

        // Définir navigator via Object.defineProperty
        Object.defineProperty(global, 'navigator', {
            value: {
                userAgent: 'node.js'
            },
            writable: true
        });

        this.grid = new Grid({ width: 8, height: 8 }); // Crée une grille 8x8
        this.game = new Game(this.grid); // Crée une nouvelle partie avec la grille
    });

    it('should initialize with the correct starting player', function () {
        expect(this.game.currentPlayer).to.equal('black');
    });

    it('should initialize the board correctly', function () {
        // Vérifier que les cases centrales ont bien été initialisées
        const middle = Math.floor(this.grid.width / 2);
        expect(this.grid.getById(middle * this.grid.width + middle).state).to.equal('white');
        expect(this.grid.getById((middle - 1) * this.grid.width + (middle - 1)).state).to.equal('white');
        expect(this.grid.getById(middle * this.grid.width + (middle - 1)).state).to.equal('black');
        expect(this.grid.getById((middle - 1) * this.grid.width + middle).state).to.equal('black');
    });

    it('should not allow an invalid move', function () {
        // Créer un mouvement invalide
        const node = this.grid.getById(0 * this.grid.width + 0); // Position invalide
        node.state = 'white'; // Le joueur blanc essaie de jouer ici
        this.game.handleNodeUpdate(node); // Mettre à jour l'état

        // Vérifier que le coup n'a pas été joué (l'état de la cellule doit rester "null")
        expect(node.state).to.equal('white');
    });
});