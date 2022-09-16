const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err)

    let lines = data.split('\n')
        .map(line => line.split('->')
            .map(l => l.trim().split(',')
                .map(num => parseInt(num)))
            .flat());

    // to store the Point class        
    let points = []

    // to make sure we don't create dupes
    let pointSet = new Set()

    for (let line of lines) {
        // checking the if y1 = y2
        if (line[1] === line[3]) {
            if (line[0] < line[2]) {
                for (let start = line[0]; start <= line[2]; start++) {
                    if (pointSet.has(`${start},${line[1]}`)) {
                        addPoint(points, start, line[1])
                    } else {
                        pointSet.add(`${start},${line[1]}`)
                        points.push(new Point(start, line[1]))
                    }
                }
            } else {
                for (let start = line[2]; start <= line[0]; start++) {
                    if (pointSet.has(`${start},${line[1]}`)) {
                        addPoint(points, start, line[1])
                    } else {
                        pointSet.add(`${start},${line[1]}`)
                        points.push(new Point(start, line[1]))
                    }
                }
            }
            // checking if x1 = x2    
        } else if (line[0] === line[2]) {
            if (line[1] < line[3]) {
                for (let start = line[1]; start <= line[3]; start++) {
                    if (pointSet.has(`${line[0]},${start}`)) {
                        addPoint(points, line[0], start)
                    } else {
                        pointSet.add(`${line[0]},${start}`)
                        points.push(new Point(line[0], start))
                    }
                }
            } else {
                for (let start = line[3]; start <= line[1]; start++) {
                    if (pointSet.has(`${line[0]},${start}`)) {
                        addPoint(points, line[0], start)
                    } else {
                        pointSet.add(`${line[0]},${start}`)
                        points.push(new Point(line[0], start))
                    }
                }
            }
        }
        // check diagonals    
        else if (line[0] < line[2] && line[1] < line[3]) {
            for (let x = line[0], y = line[1]; x <= line[2], y <= line[3]; x++, y++) {
                if (pointSet.has(`${x},${y}`)) {
                    addPoint(points, x, y)
                } else {
                    pointSet.add(`${x},${y}`)
                    points.push(new Point(x, y))
                }
            }
        } else if (line[0] > line[2] && line[1] > line[3]) {
            for (let x = line[2], y = line[3]; x <= line[0], y <= line[1]; x++, y++) {
                if (pointSet.has(`${x},${y}`)) {
                    addPoint(points, x, y)
                } else {
                    pointSet.add(`${x},${y}`)
                    points.push(new Point(x, y))
                }
            }
        } else if (line[0] < line[2] && line[1] > line[3]) {
            for (let x = line[2], y = line[3]; x >= line[0], y <= line[1]; x--, y++) {
                if (pointSet.has(`${x},${y}`)) {
                    addPoint(points, x, y)
                } else {
                    pointSet.add(`${x},${y}`)
                    points.push(new Point(x, y))
                }
            }
        } else if (line[0] > line[2] && line[1] < line[3]) {
            for (let x = line[2], y = line[3]; x <= line[0], y >= line[1]; x++, y--) {
                if (pointSet.has(`${x},${y}`)) {
                    addPoint(points, x, y)
                } else {
                    pointSet.add(`${x},${y}`)
                    points.push(new Point(x, y))
                }
            }
        }
    }

    // once we finish pushing points and adding the overlapping lines
    // we loop through the points and check each overlap count if it's 2 or more, count those
    // and return that result             
    let count_overlaps = 0;

    for (let point of points) {
        if (point.overlap_count >= 2) {
            count_overlaps += 1
        }
    }

    //console.log(points);
    console.log(count_overlaps);
})

// creating a Point to make it 'easier' to track Points
class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.overlap_count = 1
    }
}

// This is still bad, this algo might be an O(!N) or close
function addPoint(points, x, y) {
    for (let point of points) {
        if (point.x === x && point.y === y) {
            point.overlap_count += 1;
        }
    }
}