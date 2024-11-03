import * as functions from '../functions.mjs';
import { nodeUpdateEventTarget, statsEventTarget } from '../events.mjs';

export function dfs(graph, options) {
  let algorithm = 'DFS';
  let stats = { nodesVisited: 0 }; // for stats
  let visited = []; // for storing already visited nodes
  let stack = []; // use a stack instead of a queue
  stack.push(graph.root); // add the root node to the stack
  graph.root.found = true;
  statsEventTarget.goal = false;

  return (async function () {
    while (stack.length > 0) {
      let currentNode = stack.pop(); // extract node from stack (LIFO)
      visited.push(currentNode); // add node to visited nodes
      currentNode.visited = true; // mark node as visited
      currentNode.found = true; // mark node as found
      stats.nodesVisited++; // increment nodes visited

      nodeUpdateEventTarget.node = currentNode; // dispatch event to update node in DOM
      nodeUpdateEventTarget.dispatchEvent(new Event('nodeUpdateEvent', currentNode)); // dispatch event to update node in DOM

      if (options?.time?true:false) await functions.timer(options.time); //if time option is set, wait to slow down execution

      if (currentNode.id === graph.goal.id) { //if the current node if the goal we break the loop
        statsEventTarget.stats = { 'algorithm': algorithm, 'message': 'Goal found !', 'nodesVisited': stats.nodesVisited };
        statsEventTarget.goal = graph.goal;
        break;
      }

      currentNode.children = graph.getChildren(currentNode); //get children of current node
      stack = stack.concat(currentNode.children.reverse()); // reverse to maintain DFS order (left-to-right)
    }

    if (!statsEventTarget.goal) {
      statsEventTarget.stats = { 'algorithm': algorithm, 'message': 'Goal NOT found !', 'nodesVisited': stats.nodesVisited };
      statsEventTarget.goal = false;
    }
    statsEventTarget.dispatchEvent(new Event('statsEvent'));

    return;
  })();
}
