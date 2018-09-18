'use strict';

// TODO замыкание и итерирование

class List {

    constructor(arr) {
        this._root = null;
        this._last = null;
        this.size = 0;

        this[Symbol.iterator] = function () {

            let current = this._root;

            return {
                next() {
                    if (current !== null) {
                        let x = current.value;
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
        return List._getNodeValue(this._root);
    }

    get back() {
        return List._getNodeValue(this._last);
    }

    _add(elem, where) {
        let newNode = List._createNode(elem);
        this.size++;
        if (this._root == null) {
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

    static _getNodeValue(node) {
        if (node === null)
            return undefined;
        else
            return node.value;
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