const { match } = require("assert");
const fs = require("fs");

const lines = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n')

function createTree(lines) {
    /* Tree will have properties of name, directory, filesize, children, parent 
     */
    const tree = {
        name: '/',
        isDirectory: true,
        children: []
    }

    let currentNode = tree;
    let currentCommand = null;

    for (const line of lines) {
        if (line[0] === '$') {
            // will match cd .. or cd a
            const match = /^\$ (?<command>\w+)(?: (?<arg>.+))?$/.exec(line)
            currentCommand = match.groups.command

            // if we get a cd (change directory command) we update the current node
            if (currentCommand === 'cd') {
                // capture the target
                const target = match.groups.arg;
                switch (target) {
                    case '/':
                        currentNode = tree;
                        break;
                    case '..':
                        currentNode = currentNode.parent;
                        break;
                    default:
                        currentNode = currentNode.children.find(folder => folder.isDirectory && folder.name === target);
                }
            }
        } else {
            // for now a file/directory from ls command
            if (currentCommand === 'ls') {
                // regex that matches to files
                const fileMatch = /^(?<size>\d+) (?<name>.+)$/.exec(line);
                if (fileMatch) {
                    const node = {
                        name: fileMatch.groups.name,
                        size: parseInt(fileMatch.groups.size),
                        isDirectory: false,
                        parent: currentNode
                    }
                    currentNode.children.push(node)
                }
                const dirMatch = /^dir (?<name>.+)$/.exec(line)
                if (dirMatch) {
                    const node = {
                        name: dirMatch.groups.name,
                        isDirectory: true,
                        children: [],
                        parent: currentNode
                    }
                    currentNode.children.push(node)

                }
            } else {
                throw new Error("unknown state")
            }
        }
    }

    return tree;
}

function printTree(node, depth = 0) {
    console.log(`${' '.repeat(depth * 1)}- ${node.name} (${node.isDirectory ? 'dir' : `file, size=${node.size}`})`);
    if (node.isDirectory) {
        for (const child of node.children) {
            printTree(child, depth + 2)
        }
    }
}

function getSize(node, directoryCallback) {
    if (!node.isDirectory) {
        return node.size
    }
    const directorySize = node.children.map(child => getSize(child, directoryCallback)).reduce((a, b) => a + b, 0)

    directoryCallback(node.name, directorySize)

    return directorySize;
}

function part1() {
    const tree = createTree(lines)
    printTree(tree)

    let total = 0

    getSize(tree, (name, size) => {
        if (size < 100000) {
            total += size
        }
    })

    console.log(total);

    return total

}

function part2() {
    const tree = createTree(lines)
    printTree(tree)

    const spaceAvailable = 70000000
    const spaceNeeded = 30000000
    let unused;
    let sizeNeededToBeDeleted;

    let directoriesBigEnough = []

    getSize(tree, (name, size) => {
        if (name === '/') {
            unused = spaceAvailable - size
            sizeNeededToBeDeleted = spaceNeeded - unused
            //console.log(sizeNeededToBeDeleted);
        }
    })

    // calling again so we have the sizeNeededToBeDeleted defined
    getSize(tree, (name, size) => {

        if (sizeNeededToBeDeleted && size >= sizeNeededToBeDeleted) {
            directoriesBigEnough.push(size)
            console.log(directoriesBigEnough);
        }
    })

    console.log(Math.min(...directoriesBigEnough));

    return Math.min(...directoriesBigEnough);
}

part1()
part2()

module.exports = { part1, part2 }