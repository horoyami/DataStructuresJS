'use strict';

class List {

    constructor(arr) {
        this._root = null;
        this._last = null;
        this.size = 0;

        if (arr instanceof Array) {
            for (let i = 0; i < arr.length; i++)
                this.back = arr[i];
        }

        this[Symbol.iterator] = function () {

            let current = this._root;

            return {
                next() {
                    if (current !== null) {
                        let x = current;
                        current = current.right;
                        return {
                            done: false,
                            value: x
                        }
                    } else {
                        return {
                            done: true
                        }
                    }
                }
            };
        };
    }

    insert(node, value) {
        if (node !== null) {
            let left = node;
            let right = node.right;
            let newNode = List._createNode(value);
            this.size++;
            left.right = newNode;
            newNode.left = left;
            if (right !== null) {
                right.left = newNode;
                newNode.right = right;
            } else {
                this._last = newNode;
            }
        }
    }

    remove(node) {
        if (node == null)
            return;
        let left = node.left;
        let right = node.right;
        this.size--;
        if (left !== null) {
            left.right = right;
            node.left = null;
        }
        if (right !== null) {
            right.left = left;
            node.right = null;
        }
        if (node === this._last)
            this._last = left;
        if (node === this._root)
            this._root = right;

    }

    isEmpty() {
        return (this.size === 0);
    }

    popBack() {
        this._delElem(function (self) {
            self._last = self._last.left;
            self._last.right = null;
        });
    }

    popFront() {
        this._delElem(function (self) {
            self._root = self._root.right;
            self._root.left = null;
        });
    }

    set back(value) {
        this._add(value, function (newNode, self) {
            self._last.right = newNode;
            newNode.left = self._last;
            self._last = newNode;
        });
    }

    set front(value) {
        this._add(value, function (newNode, self) {
            self._root.left = newNode;
            newNode.right = self._root;
            self._root = newNode;
        });
    }

    get front() {
        return this._root;
    }

    get back() {
        return this._last;
    }

    _add(elem, where) {
        let newNode = List._createNode(elem);
        this.size++;
        if (this._root === null) {
            this._root = newNode;
            this._last = newNode;
        } else {
            where(newNode, this);
        }
    }

    _delElem(where) {
        if (this.size === 1) {
            this._root = null;
            this._last = null;
            this.size = 0;
        } else if (this.size !== 0) {
            where(this);
            this.size--;
        }
    }

    static _createNode(value = undefined) {
        return {
            left: null,
            right: null,
            value: value
        };
    }
}

module.exports = List;