<template>

  <div class="grid-container">

    <aside>

      <div class="algorithms-container">
        <h2>Algorithms</h2>
        <button class="algorithms" id="bfs">Breadth First Search</button>
        <button class="algorithms" id="dfs">Depth First Search</button>
        <button class="algorithms" id="dijkstra">Dijkstra</button>
        <button class="algorithms" id="bestfirst">Best First Search</button>
        <button class="algorithms" id="astar">A*</button>
      </div>

      <div id="statsDiv"></div>

      <div class="controls">
        <h2>Grid controls</h2>

        <ul>
          <label for="width">
            <div>Width :</div> <input type="number" name="width" id="width" value="10" min="2" />
          </label>
          <label for="height">
            <div>Height :</div> <input type="number" name="height" id="height" value="10" min="2" />
          </label>

          <label for="cost">
            <div>Random cost</div> <input type="checkbox" name="cost" id="cost">
          </label>
          <label for="time">
            <div>Slow</div> <input type="checkbox" name="time" id="time">
          </label>

          <label for="root">
            <div>Start :</div> <input type="number" name="root" id="root" value="53" min="0">
          </label>
          <label for="goal">
            <div>Goal :</div> <input type="number" name="goal" id="goal" value="95" min="0">
          </label>

          <label for="console">
            <div>DevTools logs</div> <input type="checkbox" name="console" id="console" checked>
          </label>
        </ul>

        <button id="init">Initialize with options</button>
        <button id="reset">Reset Grid</button>
        <button id="resetKeep">Keep Walls Reset</button>
        <button id="initRandom">New Random Grid</button>
      </div>

      <div class="heuristics">
        <h2>Heuristic</h2>

        <label for="manhattanDistance">
          <div>Manhattan</div> <input type="radio" name="heuristic" id="manhattanDistance" value="manhattanDistance" checked>
        </label>
        <label for="euclideanDistance">
          <div>Euclidian</div> <input type="radio" name="heuristic" id="euclideanDistance" value="euclideanDistance">
        </label>
        <label for="chebyshevDistance">
          <div>Chebyshev</div> <input type="radio" name="heuristic" id="chebyshevDistance" value="chebyshevDistance">
        </label>
      </div>


      <div class="legend">
        <h2>Legend</h2>
        <ul>
          <li>Start <span class="start"></span></li>
          <li>Goal <span class="goal"></span></li>
          <li>Path <span class="path"></span></li>
          <li>Wall <span class="wall"></span></li>
          <li>No cost <span class=""></span></li>
          <li>Road <span class="road"></span></li>
          <li>Forest <span class="forest"></span></li>
          <li>Mountain <span class="mountain"></span></li>
        </ul>
      </div>

      </aside>

      <section class="content">
      <div id="grid-container"></div>
      </section>


  </div>
    
</template>

<script>
  import dom from './../logic/dom.mjs';

  export default {
    name: 'Grid-Component',
    methods: {
      goBack() {
        this.$router.go(-1);
      },
    },
    mounted() {
      dom();
    }
  };
</script>

<style>
  @import './../assets/grid.css';
</style>