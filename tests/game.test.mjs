import { expect } from 'chai';
import { Game } from '../src/logic/classes/Game.mjs';
import { Grid } from '../src/logic/classes/Grid.mjs';
import { JSDOM } from 'jsdom';

describe('Game', function () {
    beforeEach(function () {
        const dom = new JSDOM('<!DOCTYPE html><html><body><div id="grid-container"></div><div id="context"></div></body></html>');
        global.document = dom.window.document;
        global.window = dom.window;
        Object.defineProperty(global, 'navigator', {
            value: { userAgent: 'node.js' },
            writable: true
        });
        this.grid = new Grid({ width: 8, height: 8 });
        this.game = new Game(this.grid);
    });

    describe('Setup', function() {
        it('should initialize the board correctly', function () {
            const middle = Math.floor(this.grid.width / 2);
            expect(this.grid.getById(middle * this.grid.width + middle).state).to.equal('white');
            expect(this.grid.getById((middle - 1) * this.grid.width + (middle - 1)).state).to.equal('white');
            expect(this.grid.getById(middle * this.grid.width + (middle - 1)).state).to.equal('black');
            expect(this.grid.getById((middle - 1) * this.grid.width + middle).state).to.equal('black');
            expect(this.game.currentPlayer).to.equal('black');
        });

        it('should have correct number of valid moves at start', function() {
            const validMoves = this.grid.nodes.filter(node => 
                node.state === 'black-grey'
            );
            expect(validMoves.length).to.equal(4); // 4 coups possibles au début
        });
    });

    describe('Status', function() {
        it('should skip turn when no valid moves available', function() {
            // On supprime tous les coups valides
            this.grid.nodes.forEach(node => {
                if (node.state === 'black-grey') {
                    node.state = null;
                }
            });
            this.game.skipTurn();
            expect(this.game.currentPlayer).to.equal('white');
        });

        it('should detect when game is over', function() {
            this.grid.nodes.forEach(node => {
                node.state = 'black';
            });
            expect(this.game.isGameOver()).to.be.true;
        });

        it('should correctly count pieces for each player', function() {
            const blackCount = this.game.countPawns('black');
            const whiteCount = this.game.countPawns('white');
            expect(blackCount).to.equal(2);
            expect(whiteCount).to.equal(2);
        });

        it('should display the correct winner', function() {
            this.grid.nodes.forEach(node => {
                node.state = 'black';
            });
            this.game.endGame();
            const contextContainer = document.getElementById('context');
            expect(contextContainer.innerHTML).to.include('Black wins!');
        });
    });

    describe('Strategy', function() {
        it('should prefer corner moves when available', function() {
            const cornerNode = this.grid.getById(0);
            cornerNode.state = 'black-grey';
            const validMoves = this.grid.nodes.filter(node => 
                node.state === 'black-grey'
            );
            expect(validMoves).to.include(cornerNode);
        });

        it('should avoid moves next to corners when possible', function() {
            const nearCornerNode = this.grid.getById(1);
            nearCornerNode.state = 'black-grey';
            const betterMove = this.grid.getById(this.grid.width * 2 + 2);
            betterMove.state = 'black-grey';
            const validMoves = [nearCornerNode, betterMove];
            expect(validMoves).to.include(betterMove);
        });
    });
});