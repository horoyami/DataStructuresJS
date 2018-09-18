const DSU = require("../scripts/DSU");
const chai = require("chai");

describe("DSU test", function () {

    it("Should be created", function () {
        let dsu = new DSU();
        chai.assert.equal(dsu instanceof DSU, true);
    });

    it("Create empty DSU", function () {
        let dsu = new DSU();
        chai.assert.equal(dsu._parent.length, 0);
    });

    it("Create 2 elem DSU", function () {
        let dsu = new DSU(2);
        chai.assert.equal(dsu._parent.length, 2);
        chai.assert.equal(dsu._parent[0], 0);
        chai.assert.equal(dsu._parent[1], 1);
    });

    it("Create dirty DSU", function () {
        let dsu = new DSU(-1);
        chai.assert.equal(dsu._parent.length, 0);
        dsu = new DSU(null);
        chai.assert.equal(dsu._parent.length, 0);
        dsu = new DSU("15");
        chai.assert.equal(dsu._parent.length, 0);
    });

    it("Add plenty", function () {
        let dsu = new DSU(2);
        dsu.addElem();
        chai.assert.equal(dsu._parent.length, 3);
        chai.assert.equal(dsu._parent[0], 0);
        chai.assert.equal(dsu._parent[1], 1);
        chai.assert.equal(dsu._parent[2], 2);
    });

    it("Combine 2 plenty", function () {
        let dsu = new DSU(2);
        dsu.combine(0, 1);
        chai.assert.equal(dsu._parent[0], dsu._parent[1]);
    });

    it("Combine 3 plenty", function () {
        let dsu = new DSU(3);
        dsu.combine(0, 1);
        dsu.combine(1, 2);
        chai.assert.equal(dsu._parent[0], dsu._parent[1]);
        chai.assert.equal(dsu._parent[0], dsu._parent[2]);
    });

    it("Root combined is the same", function () {
        let dsu = new DSU(4);
        dsu.combine(0, 1);
        dsu.combine(2, 3);
        chai.assert.equal(dsu.root(0), dsu.root(1));
        chai.assert.equal(dsu.root(2), dsu.root(3));
    });

    it("Root not combined is different", function () {
        let dsu = new DSU(4);
        dsu.combine(0, 1);
        dsu.combine(2, 3);
        chai.assert.equal(dsu.root(0) === dsu.root(2), false);
        chai.assert.equal(dsu.root(1) === dsu.root(3), false);
    });

    it("Iteration", function () {
        let dsu = new DSU(5);
        let mas = [];

        for (let v of dsu) {
            mas.push(v);
        }
        chai.assert.equal(mas.length, 5);

        for (let i = 0; i < mas.length; i++) {
            chai.assert.equal(mas[i].index, mas[i].parent);
            chai.assert.equal(mas[i].index, i);
        }
    });

    it('Root for not existent', function () {
        let dsu = new DSU(5);
        let x = dsu.root(9);
        chai.assert.equal(x, -1);
    });
});