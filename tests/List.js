const List = require("../scripts/List");
const chai = require("chai");

describe("List test", function () {

    it("Should be created", function () {
        let list = new List();
        chai.assert.equal(list instanceof List, true);
    });

    it("Created List should be empty", function () {
        let list = new List();
        chai.assert.equal(list.front, null);
        chai.assert.equal(list.back, null);
    });

    it("Push first element by back", function () {
        let list = new List();
        list.back = 5;
        chai.assert.equal(list.front.value, 5);
        chai.assert.equal(list.back.value, 5);
    });

    it("Push first element by front", function () {
        let list = new List();
        list.front = 5;
        chai.assert.equal(list.front.value, 5);
        chai.assert.equal(list.back.value, 5);
    });

    it("Push back many elems", function () {
        let list = new List();
        list.back = 1;
        list.back = 2;
        list.back = 3;
        list.back = 4;
        list.back = 5;
        chai.assert.equal(list.front.value, 1);
        chai.assert.equal(list.back.value, 5);
    });

    it("Push front many elems", function () {
        let list = new List();
        list.front = 1;
        list.front = 2;
        list.front = 3;
        list.front = 4;
        list.front = 5;
        chai.assert.equal(list.front.value, 5);
        chai.assert.equal(list.back.value, 1);
    });

    it("Size", function () {
        let list = new List();
        list.front = 1;
        list.back = 2;
        list.front = 3;
        list.back = 4;
        list.front = 5;
        chai.assert.equal(list.size, 5);
    });

    it("Push random many elems", function () {
        let list = new List();
        list.front = 1;
        list.back = 2;
        list.front = 3;
        list.back = 4;
        list.front = 5;
        chai.assert.equal(list.front.value, 5);
        chai.assert.equal(list.back.value, 4);
    });

    it("PopBack", function () {
        let list = new List();
        list.front = 5;
        list.front = 4;
        list.front = 3;
        list.front = 2;
        list.front = 1;
        list.popBack();
        list.popBack();
        chai.assert.equal(list.back.value, 3);
    });

    it("PopFront", function () {
        let list = new List();
        list.back = 5;
        list.back = 4;
        list.back = 3;
        list.back = 2;
        list.back = 1;
        list.popFront();
        list.popFront();
        chai.assert.equal(list.front.value, 3);
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
        chai.assert.equal(list.back, null);
        chai.assert.equal(list.back, null);
    });

    it("More pop than size", function () {
        let list = new List();
        list.back = 5;
        list.popBack();
        list.popBack();
        list.popBack();
        chai.assert.equal(list.size, 0);
        chai.assert.equal(list.back, null);
        chai.assert.equal(list.back, null);
    });

    it("IsEmpty", function () {
        let list = new List();
        chai.assert.equal(list.isEmpty(), true);
        list.back = 5;
        chai.assert.equal(list.isEmpty(), false);
        list.popBack();
        chai.assert.equal(list.isEmpty(), true);
    });

    it("Iteration by for .. of ..", function () {
        let list = new List();
        list.back = 1;
        list.back = 2;
        list.back = 3;
        list.back = 4;
        list.back = 5;
        let mas = [];

        for (let v of list) {
            mas.push(v.value);
        }

        chai.assert.equal(mas.length, 5);

        for (let i = 0; i < mas.length; i++) {
            chai.assert.equal(mas[i], i + 1);
        }
    });

    it("Second iteration starts over", function () {
        let list = new List();
        list.back = 1;
        list.back = 2;
        list.back = 3;
        list.back = 4;
        list.back = 5;
        let mas = [];

        for (let v of list) {
            let x = v.value;
            x = x + x;
        }

        for (let v of list) {
            mas.push(v.value);
        }

        chai.assert.equal(mas.length, 5);

        for (let i = 0; i < mas.length; i++) {
            chai.assert.equal(mas[i], i + 1);
        }

    });

    it("Create list by Array", function () {
        let list = new List([1, 2, 3]);
        chai.assert.equal(list.size, 3);
        chai.assert.equal(list.front.value, 1);
        chai.assert.equal(list.back.value, 3);
    });

    it("0 is not special", function () {
        let list = new List([0, 0, 0]);
        let mas = [];

        for (let v of list) {
            mas.push(v.value);
        }

        chai.assert.equal(mas.length, 3);

        for (let i = 0; i < mas.length; i++) {
            chai.assert.equal(mas[i], 0);
        }
    });

    it("insert in center", function () {
        let list = new List([1, 2]);
        let left = list.front;
        list.insert(left, 5);
        chai.assert.equal(list.size, 3);
        chai.assert.equal(list.front.value, 1);
        chai.assert.equal(list.front.right.value, 5);
        chai.assert.equal(list.front.right.right.value, 2);
        chai.assert.equal(list.front.right.right.right, null);
    });

    it("insert in end", function () {
        let list = new List([1, 2]);
        let left = list.back;
        list.insert(left, 5);
        chai.assert.equal(list.size, 3);
        chai.assert.equal(list.front.value, 1);
        chai.assert.equal(list.front.right.value, 2);
        chai.assert.equal(list.front.right.right.value, 5);
        chai.assert.equal(list.front.right.right.right, null);
    });

    it("remove from center", function () {
        let list = new List([1, 2, 3]);
        let node = list.front.right;
        list.remove(node);
        chai.assert.equal(list.size, 2);
        chai.assert.equal(list.front.value, 1);
        chai.assert.equal(list.front.right.value, 3);
        chai.assert.equal(list.front.right.right, null);
    });

    it("remove from end", function () {
        let list = new List([1, 2, 3]);
        let node = list.front.right.right;
        list.remove(node);
        chai.assert.equal(list.size, 2);
        chai.assert.equal(list.front.value, 1);
        chai.assert.equal(list.front.right.value, 2);
        chai.assert.equal(list.front.right.right, null);
        chai.assert.equal(list.back.value, 2);
    });

    it("remove from start", function () {
        let list = new List([1, 2, 3]);
        let node = list.front;
        list.remove(node);
        chai.assert.equal(list.size, 2);
        chai.assert.equal(list.front.value, 2);
        chai.assert.equal(list.front.right.value, 3);
        chai.assert.equal(list.front.right.right, null);
    });

    it("remove all", function () {
        let list = new List([1, 2, 3]);
        list.remove(list.front);
        list.remove(list.back);
        list.remove(list.front);
        chai.assert.equal(list.front, null);
        chai.assert.equal(list.back, null);
        chai.assert.equal(list.size, 0);
    });

});