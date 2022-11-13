const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    const edges = data.split('\n').map(edge => edge.split('-'));

    const graph = buildGraph(edges);
    console.log(graph);

    let currentPath = ['start']
    let allPaths = []

    findPaths(graph, 'start', 'end', new Set(), currentPath, allPaths)
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

function findPaths(graph, start, end, visited, currentPath, paths) {

    if (start === end) {
        return
    }

    // only mark the lowercase letters(small caves) as visited
    if (start === start.toLowerCase()) visited.add(start)

    for (let neighbor of graph[start]) {
        if (!(visited.has(neighbor))) {

            currentPath.push(neighbor)

            // create copy of currentPath
            let copy = currentPath.map(element => element);
            // we only push the copy of a current path once we reach the end
            if (neighbor === end) paths.push(copy)

            findPaths(graph, neighbor, end, visited, currentPath, paths)

            currentPath.pop(neighbor)
        }
    }

    visited.delete(start)
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