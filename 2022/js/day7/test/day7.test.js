const { part1, part2 } = require('../index');


describe('Part 1', () => {

    it('Should sum all the directory sizes that are up to 100000', () => {

        const result = part1();

        expect(result).toEqual(95437);
    })
});

describe('Part 2', () => {

    it('Should return directory min size of dir to free up space', () => {

        const result = part2();

        expect(result).toEqual(24933642);
    })
});