const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    // we need to find a marker and where it occurs
    // a marker is the first 4 chars in the stream that aren't repeated
    // and we need to return the position + 1 of the last char in the stream

    let stream = data.trim()

    // find marker
    for (let i = 0; i < stream.length; i++) {
        let marker;
        // capture first 4 chars
        // make sure we don't get out of bounds
        if (i < stream.length - 3) {
            marker = stream[i] + stream[i + 1] + stream[i + 2] + stream[i + 3]
            // verify when we find the first that are all different and break
            let arrMarker = marker.split('')

            if (isMarker(arrMarker)) {
                console.log(i + 4)
                break;
            }

        }

    }

})

function isMarker(marker) {
    return new Set(marker).size === marker.length
}