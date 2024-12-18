import { Dom } from './dom.mjs';
import { Game } from './classes/Game.mjs';
import { Robot } from './classes/Robot.mjs';

export default function board(route) {
  if (typeof window === "object") {

    let options = {
      width: 8,
      height: 8,
    }

    let grid = new Dom(options);
    let game = new Game(grid);

    if (!route.includes('multi') && route.includes('player')) {
        new Robot(game, grid, "white");
    }
    else if (route.includes('spectator')) {
        new Robot(game, grid, "black");
        new Robot(game, grid, "white");
    }

    grid.render();
  }
}