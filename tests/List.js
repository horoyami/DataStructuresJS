const List = require("../scripts/List");
const chai = require("chai");

describe("List test", function () {

    it("should be created", function () {
        let list = new List();
        chai.assert.equal(list instanceof List, true);
    });

    it("Created List should be empty", function () {
        let list = new List();
        chai.assert.equal(list.front, undefined);
        chai.assert.equal(list.back, undefined);
    });

    it("push first element by back", function () {
        let list = new List();
        list.back = 5;
        chai.assert.equal(list.front, 5);
        chai.assert.equal(list.back, 5);
    });

    it("push first element by front", function () {
        let list = new List();
        list.front = 5;
        chai.assert.equal(list.front, 5);
        chai.assert.equal(list.back, 5);
    });

    it("push back many elems", function () {
        let list = new List();
        list.back = 1;
        list.back = 2;
        list.back = 3;
        list.back = 4;
        list.back = 5;
        chai.assert.equal(list.front, 1);
        chai.assert.equal(list.back, 5);
    });

    it("push front many elems", function () {
        let list = new List();
        list.front = 1;
        list.front = 2;
        list.front = 3;
        list.front = 4;
        list.front = 5;
        chai.assert.equal(list.front, 5);
        chai.assert.equal(list.back, 1);
    });

    it("size", function () {
        let list = new List();
        list.front = 1;
        list.back = 2;
        list.front = 3;
        list.back = 4;
        list.front = 5;
        chai.assert.equal(list.size, 5);
    });

    it("push random many elems", function () {
        let list = new List();
        list.front = 1;
        list.back = 2;
        list.front = 3;
        list.back = 4;
        list.front = 5;
        chai.assert.equal(list.front, 5);
        chai.assert.equal(list.back, 4);
    });

    it("popBack", function () {
        let list = new List();
        list.front = 5;
        list.front = 4;
        list.front = 3;
        list.front = 2;
        list.front = 1;
        list.popBack();
        list.popBack();
        chai.assert.equal(list.back, 3);
    });

    it("popFront", function () {
        let list = new List();
        list.back = 5;
        list.back = 4;
        list.back = 3;
        list.back = 2;
        list.back = 1;
        list.popFront();
        list.popFront();
        chai.assert.equal(list.front, 3);
    });

    it("1 element after many ops", function () {
        let list = new List();
        list.back = 5;
        list.front = 4;
        list.back = 3;
        list.front = 2;
        list.back = 1;
        list.popFront();
        list.popFront();
        list.popBack();
        list.popBack();
        chai.assert.equal(list.size, 1);
        chai.assert.equal(list.back, list.front);
    });

    it("0 element after many ops", function () {
        let list = new List();
        list.back = 5;
        list.front = 4;
        list.back = 3;
        list.front = 2;
        list.back = 1;
        list.popFront();
        list.popFront();
        list.popBack();
        list.popBack();
        list.popBack();
        chai.assert.equal(list.size, 0);
        chai.assert.equal(list.back, undefined);
        chai.assert.equal(list.back, undefined);
    });

    it("more pop than size", function () {
        let list = new List();
        list.back = 5;
        list.popBack();
        list.popBack();
        list.popBack();
        chai.assert.equal(list.size, 0);
        chai.assert.equal(list.back, undefined);
        chai.assert.equal(list.back, undefined);
    });

    it("isEmpty", function () {
        let list = new List();
        chai.assert.equal(list.isEmpty(), true);
        list.back = 5;
        chai.assert.equal(list.isEmpty(), false);
        list.popBack();
        chai.assert.equal(list.isEmpty(), true);
    });

});