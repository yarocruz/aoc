const fs = require('fs');
const path = require('path');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    const edges = data.split('\n').map(edge => edge.split('-'));

    const graph = buildGraph(edges);
    console.log(graph);

    let currentPath = ['start']
    let allPaths = []
    let visitedArray = [];

    findPaths(graph, 'start', 'end', currentPath, allPaths, visitedArray, false)
    console.log(allPaths, allPaths.length);

    // maked data into nodes
    /** Can be an object like so
     * 
     * {
     *  start: ['A', 'b'],
     *  A: ['c', 'b', 'end'],
     *  b: ['A', 'd', 'end'],
     *  c: ['A'],
     * }
     */

    // visit all posible paths
    // exception is start, end, and small caves can only be visited once

    // DFS or BFS

    // 1. start at the start node
    // 2. mark as visited
    // 3. visit next node
    // 4. if node is small (a-z), mark as visited
    // 5. if next node is end, add to path count, and backtrack

    /**
     * Learned how to solve this problem by using the following resources on Graph Problems
     * 
     * Graph Algorithms for Technical Interviews https://www.youtube.com/watch?v=tWVWeAqZ0WU&t=6830s
     * Graph Count number of Paths between nodes https://www.youtube.com/watch?v=TlYExiAAbHo
     * AllPathsBetween two Nodes https://thealgorists.com/Algo/AllPathsBetweenTwoNodes
     * 
     */

})

function findPaths(graph, start, end, currentPath, paths, visitedArray, visitedTwice) {

    visitedArray.push(start)

    if (start === end) {
        paths.push(visitedArray.join`,`);
        return
    }

    for (let neighbor of graph[start]) {
        if (neighbor === 'start') {
            continue;
        }
        if (/[a-z]/.test(neighbor) && visitedArray.includes(neighbor)) {

            if (visitedTwice) continue;

            if (visitedArray.filter(x => x === neighbor).length > 2) {
                continue;
            }

            findPaths(graph, neighbor, end, currentPath, paths, [...visitedArray], true)

        } else {
            findPaths(graph, neighbor, end, currentPath, paths, [...visitedArray], visitedTwice)
        }
    }

}

/**
 * Learned how to created this helper function by watching 
 * Graph Algorithms for Technical Interviews https://www.youtube.com/watch?v=tWVWeAqZ0WU&t=6830s
 * 
 * It takes the edges, which is an array of arrays, where each array has the pairs
 * ex [['start', 'b'], ['start', 'A']]
 * It makes each pair into a key, and each value into array. 
 * They key would a node in the graph, and the values the neighbors
 */
function buildGraph(edges) {
    const graph = {}

    for (let edge of edges) {
        const [a, b] = edge;
        if (!(a in graph)) graph[a] = [];
        if (!(b in graph)) graph[b] = [];
        graph[a].push(b)
        graph[b].push(a)
    }

    return graph;
}