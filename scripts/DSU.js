'use strict';

class DSU {

    constructor(n) {
        this._parent = [];
        this._rank = [];

        if (typeof n === "number" && n >= 0) {
            for (let i = 0; i < n; i++) {
                this.addElem();
            }
        }

        this[Symbol.iterator] = function () {

            let current = 0;
            let n = this._parent.length;
            let self = this;

            return {
                next() {
                    if (current >= n) {
                        return {
                            done: true
                        }
                    }
                    current++;
                    return {
                        done: false,
                        value: {
                            index: current - 1,
                            parent: self.root(current - 1)
                        }
                    }
                }
            }
        };
    };


    addElem() {
        let num = this._parent.length;
        this._parent.push(num);
        this._rank.push(0);
        return num;
    }

    root(elem) {
        if (elem < 0 || elem >= this._parent.length)
            return -1;
        if (elem === this._parent[elem])
            return elem;
        return this._parent[elem] = this.root(this._parent[elem]);
    }

    combine(elem1, elem2) {
        elem1 = this.root(elem1);
        elem2 = this.root(elem2);
        if (elem1 === -1 || elem2 === -1)
            return;
        if (elem1 !== elem2) {
            if (this._rank[elem1] < this._rank[elem2]) {
                let tmp = elem1;
                elem1 = elem2;
                elem2 = tmp;
            }
            this._parent[elem2] = elem1;
            if (this._rank[elem1] === this._rank[elem2])
                this._rank[elem1]++;
        }
    }
}

module.exports = DSU;
