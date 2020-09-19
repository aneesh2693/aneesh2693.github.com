const expect = require('chai').expect;
const sinon = require('sinon');
var rewire = require("rewire");
//const { getWinStreak } = require('../game.js');
var gameModule = rewire("../game.js");


describe("Winstreak test", function () {
    it("Succeed if diagonal Left-Right is filled by player in 3x3", function () {
        const revert = gameModule.__set__({
            "gameArray": [
            ['X', 'O', 'O'],
            ['O', 'X', 'O'],
            ['O', 'O', 'X']],
            xyValue: 3
        });
        expect(gameModule.getWinStreak('X')).to.have.property('success', true);
        revert();
    });

    it("Succeed if diagonal Right-Left is filled by player in 3x3", function () {
        const revert = gameModule.__set__({
            gameArray: [
            ['O', 'O', 'X'],
            ['O', 'X', 'O'],
            ['X', 'O', 'O']],
            xyValue: 3
        });
        expect(gameModule.getWinStreak('X')).to.have.property('success', true);
        revert();
    });;

    it("Succeed if horizontal is filled by player in 3x3", function () {
        const revert = gameModule.__set__({
            gameArray: [
            ['O', 'X', 'O'],
            ['X', 'X', 'X'],
            ['X', 'O', 'O']],
            xyValue: 3
        });
        expect(gameModule.getWinStreak('X')).to.have.property('success', true);
        revert();
    })

    it("Succeed if vertical is filled by player in 3x3", function () {
        const revert = gameModule.__set__({
            gameArray: [
            ['O', 'X', 'X'],
            ['O', 'X', 'X'],
            ['X', 'O', 'X']],
            xyValue: 3
        });
        expect(gameModule.getWinStreak('X')).to.have.property('success', true);
        revert();
    })
})