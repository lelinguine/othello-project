import { GridDOM } from './classes/GridDOM.mjs';

export default function dom() {
  if (typeof window === "object") {

    let grid;
    let options = {
      width: 8,
      height: 8,
    }

    let newGrid = async function () {
      grid = new GridDOM(options);
    }

    newGrid(options);
  }
}