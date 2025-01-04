import { Dom } from './dom.mjs';
import { Game } from './classes/Game.mjs';
import { Robot } from './classes/Robot.mjs';

let options = {
  width: 8,
  height: 8,
  mod: null
}

let grid = null;
let game = null;

let robot_black = null;
let robot_white = null;

function board(route) {
  if (typeof window === "object") {
    options.mod = route;

    grid = new Dom(options);
    game = new Game(grid);

    if (!route.includes('multi') && route.includes('player')) {
      robot_white = new Robot(game, grid, "white", route);
    }
    else if (route.includes('spectator')) {
      robot_black = new Robot(game, grid, "black", route);
      robot_white = new Robot(game, grid, "white", route);
      robot_black.play();
    }

    grid.render();
  }
}

function unboard() {
  if (typeof window === "object") {
    game.stop();
    game.grid = new Dom(options);
    if (robot_black) {
      robot_black.stop();
    }
    if (robot_white) {
      robot_white.stop();
    }
  }
}

export {board, unboard};