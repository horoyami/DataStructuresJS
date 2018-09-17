const assert = require("chai").assert;

function sum(a, b) {
    return a + b;
}

describe("Внутренние тесты sum", function () {

    it("2 + 3 = 5", function () {
        let x = sum(2, 3);
        assert.equal(x, 5);
    });

    it("2 + 3 = 5", function () {
        let x = sum(2, 3);
        assert.equal(x, 6);
    });

});