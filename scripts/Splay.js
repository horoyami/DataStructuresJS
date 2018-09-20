"use strict";

class Splay {

    constructor() {
        this._root = null;
    }

    remove(x) {
        this._splay(x);
        if (this._root !== null && this._root.v === x) {
            let left = this._root.left;
            let right = this._root.right;
            if (left !== null)
                left.parent = null;
            if (right !== null)
                right.parent = null;
            if (left === null) {
                this._root = right;
                return;
            }
            this._root = left;
            this.merge(right);
        }
    }

    add(x) {
        let newNode = Splay._createNode(x, null);
        if (this._root == null) {
            this._root = newNode;
            return;
        }
        let pair = this.split(x);
        newNode.left = pair.left;
        newNode.right = pair.right;
        if (pair.left != null)
            pair.left.parent = newNode;
        if (pair.right != null)
            pair.right.parent = newNode;
        this._root = newNode;
    }

    merge(t2) {
        if (t2 === null)
            return;
        let node = this._root;
        while (node.right !== null)
            node = node.right;
        this._splay(node.v);
        this._root.right = t2;
        t2.parent = this._root;
    }

    split(x) {
        this._splay(x);
        if (this._root === null)
            return {left: null, right: null};
        let p;
        if (this._root.v < x) {
            let left = this._root;
            let right = this._root.right;
            left.right = null;
            if (right !== null)
                right.parent = null;
            p = {
                left: left,
                right: right
            };
        } else {
            let left = this._root.left;
            let right = this._root;
            if (left !== null)
                left.parent = null;
            right.left = null;
            p = {
                left: left,
                right: right
            };
        }
        return p;
    }

    find(x) {
        this._splay(x);
        return this._root;
    }

    print(node = this._root) {
        if (node == null)
            return "(null)";
        let str = "(" + node.v + ":";
        str += this.print(node.left);
        str += ",";
        str += this.print(node.right);
        str += ")";
        return str;
    }

    _splay(x) {
        if (this._root === null)
            return;

        let node = this._find(x);

        while (true) {
            if (node.parent === null) {
                this._root = node;
                return;
            }

            if (this._root === node.parent) {
                Splay._zig(node);
                continue;
            }

            if ((node === node.parent.left && node.parent === node.parent.parent.left) ||
                (node === node.parent.right && node.parent === node.parent.parent.right)) {
                Splay._zig(node.parent);
                Splay._zig(node);
                continue;
            }

            if ((node === node.parent.left && node.parent === node.parent.parent.right) ||
                (node === node.parent.right && node.parent === node.parent.parent.left)) {
                Splay._zig(node, node.parent.parent);
                Splay._zig(node);
            }
        }
    }

    static _zig(node, parent = null) {
        if (node === node.parent.left) {
            let tmp = node.right;
            node.right = node.parent;
            node.parent = parent;
            if (parent !== null)
                parent.right = node;
            node.right.parent = node;
            node.right.left = tmp;
            if (tmp !== null) {
                tmp.parent = node.right;
            }
        } else {
            let tmp = node.left;
            node.left = node.parent;
            node.parent = parent;
            if (parent !== null)
                parent.left = node;
            node.left.parent = node;
            node.left.right = tmp;
            if (tmp !== null) {
                tmp.parent = node.left;
            }
        }
    }

    _find(n, tree = this._root) {
        if (tree === null || tree.v === n)
            return tree;
        if (tree.v > n) {
            if (tree.left == null)
                return tree;
            else
                return this._find(n, tree.left);
        } else {
            if (tree.right === null)
                return tree;
            else
                return this._find(n, tree.right);
        }
    }

    static _createNode(x, parent = null) {
        return {
            v: x,
            left: null,
            right: null,
            parent: parent
        }
    }
}

module.exports = Splay;