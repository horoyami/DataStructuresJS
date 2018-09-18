const Euclid = require("../scripts/Euclid");
const chai = require("chai");

describe("Euclid test", function () {

    it("GCD(2, 4) = 2", function () {
        let x = Euclid.gcd(2, 4);
        chai.assert.equal(x, 2);
    });

    it("GCD(2, 4) = 2", function () {
        let x = Euclid.gcd(2, 3);
        chai.assert.equal(x, 1);
    });

    it("GCD(2, 4) = 2", function () {
        let x = Euclid.gcd(1, 1);
        chai.assert.equal(x, 1);
    });

    it("GCD(2, 4) = 2", function () {
        let x = Euclid.gcd(6, 4);
        chai.assert.equal(x, 2);
    });

    it("LCM(2, 4) = 4", function () {
        let x = Euclid.lcm(2, 4);
        chai.assert.equal(x, 4);
    });

    it("LCM(2, 3) = 6", function () {
        let x = Euclid.lcm(2, 3);
        chai.assert.equal(x, 6);
    });

    it("LCM(1, 1) = 1", function () {
        let x = Euclid.lcm(1, 1);
        chai.assert.equal(x, 1);
    });

    it("LCM(6, 4) = 12", function () {
        let x = Euclid.lcm(6, 4);
        chai.assert.equal(x, 12);
    });

    it("Inverse(2, 3) = 2", function () {
        let x = Euclid.inverseModule(2, 3);
        chai.assert.equal(x, 2);
    });

    it("Inverse(7, 23) = 10", function () {
        let x = Euclid.inverseModule(7, 23);
        chai.assert.equal(x, 10);
    });

    it("Inverse(5, 23) = 14", function () {
        let x = Euclid.inverseModule(5, 23);
        chai.assert.equal(x, 14);
    });

    it("Inverse(17, 23) = 19", function () {
        let x = Euclid.inverseModule(17, 23);
        chai.assert.equal(x, 19);
    });

    it("Inverse(5, 10) = null", function () {
        let x = Euclid.inverseModule(5, 10);
        chai.assert.equal(x, null);
    });
});