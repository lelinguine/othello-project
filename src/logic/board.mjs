import { Dom } from './dom.mjs';
import { Game } from './classes/Game.mjs';


export default function board() {
  if (typeof window === "object") {

    let options = {
      width: 8,
      height: 8,
    }

    let grid = new Dom(options);
    let game = new Game(grid);

    grid.render();
  }
}