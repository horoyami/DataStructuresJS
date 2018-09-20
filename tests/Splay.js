const Splay = require("../scripts/Splay");
const chai = require("chai");

function createEmptyTree() {
    return new Splay();
}

function createBalanceTree() {
    let tree = new Splay();
    tree._root = Splay._createNode(4, null);
    tree._root.left = Splay._createNode(2, tree._root);
    tree._root.right = Splay._createNode(6, tree._root);
    tree._root.left.left = Splay._createNode(1, tree._root.left);
    tree._root.left.right = Splay._createNode(3, tree._root.left);
    tree._root.right.left = Splay._createNode(5, tree._root.right);
    tree._root.right.right = Splay._createNode(7, tree._root.right);
    return tree;
}

function createBamboo() {
    let tree = new Splay();
    tree._root = Splay._createNode(1, null);
    tree._root.right = Splay._createNode(2, tree._root);
    tree._root.right.right = Splay._createNode(3, tree._root.right);
    tree._root.right.right.right = Splay._createNode(4, tree._root.right.right);
    return tree;
}

function isCorrectTree(tree, parent = null) {
    let ok = true;
    let root = tree;

    if (root === null)
        return ok;

    ok &= isCorrectTree(root.left, root);
    ok &= isCorrectTree(root.right, root);

    if ((root.parent === parent) &&
        (root.left === null || root.left.v < root.v) &&
        (root.right === null || root.right.v >= root.v)) {
        return ok;
    }

    return false;
}

function isTop(tree, x) {
    let root = tree._root;
    return !(root === null || root.v !== x);

}

describe("Splay test", function () {

    describe("PreTest", function () {

        it('EmptyTree is correct', function () {
            let tree = createEmptyTree();
            chai.assert.equal(isCorrectTree(tree._root), true);
        });

        it('BalanceTree is correct', function () {
            let tree = createEmptyTree();
            chai.assert.equal(isCorrectTree(tree._root), true);
        });

        it('Bamboo is correct', function () {
            let tree = createEmptyTree();
            chai.assert.equal(isCorrectTree(tree._root), true);
        });

        it("Incorrect tree is not correct", function () {
            let tree = new Splay();
            tree._root = Splay._createNode(4, null);
            tree._root.right = Splay._createNode(3, tree._root);
            chai.assert.equal(isCorrectTree(tree._root), false);
        });
    });


    describe("Functional", function () {

        it("Should be created", function () {
            let tree = new Splay();
            chai.assert.equal(tree instanceof Splay, true);
        });

        it("Created List should be empty", function () {
            let tree = new Splay();
            chai.assert.equal(tree._root, null);
        });

        describe("_find", function () {

            it('on EmptyTree', function () {
                let tree = createEmptyTree();
                let a = tree._find(5);
                chai.assert.equal(a, null);
                a = tree._find(0);
                chai.assert.equal(a, null);
            });

            it("on BalanceTree", function () {
                let tree = createBalanceTree();
                let a;
                for (let i = 1; i < 8; i++) {
                    a = tree._find(i);
                    chai.assert.equal(a.v, i);
                }
                a = tree._find(0);
                chai.assert.equal(a.v, 1);
                a = tree._find(9);
                chai.assert.equal(a.v, 7);
            });

            it("on Bamboo", function () {
                let tree = createBamboo();
                let a;
                for (let i = 1; i < 5; i++) {
                    a = tree._find(i);
                    chai.assert.equal(a.v, i);
                }
                a = tree._find(5);
                chai.assert.equal(a.v, 4);
                a = tree._find(0);
                chai.assert.equal(a.v, 1);
            });
        });

        describe("_splay", function () {
            it('on EmptyTree', function () {
                let tree = createEmptyTree();
                tree._splay(5);
                chai.assert.equal(isCorrectTree(tree._root), true);
                tree._splay(0);
                chai.assert.equal(isCorrectTree(tree._root), true);
            });

            it('on BalanceTree', function () {
                let tree = createBalanceTree();
                for (let i = 1; i < 8; i++) {
                    tree._splay(i);
                    chai.assert.equal(isCorrectTree(tree._root) && isTop(tree, i), true);
                }
                tree._splay(100);
                chai.assert.equal(isCorrectTree(tree._root), true);
                tree._splay(0);
                chai.assert.equal(isCorrectTree(tree._root), true);
            });

            it('on Bamboo', function () {
                let tree = createBamboo();
                for (let i = 1; i < 5; i++) {
                    tree._splay(i);
                    chai.assert.equal(isCorrectTree(tree._root) && isTop(tree, i), true);
                }
                tree._splay(100);
                chai.assert.equal(isCorrectTree(tree._root), true);
                tree._splay(0);
                chai.assert.equal(isCorrectTree(tree._root), true);
            });
        });

        describe("split", function () {
            it('on EmptyTree', function () {
                let tree = createEmptyTree();
                let a = tree.split(5);
                chai.assert.equal(isCorrectTree(a.left), true);
                chai.assert.equal(isCorrectTree(a.right), true);
                tree = createEmptyTree();
                a = tree.split(0);
                chai.assert.equal(isCorrectTree(a.left), true);
                chai.assert.equal(isCorrectTree(a.right), true);
            });

            it('on BalanceTree', function () {

                for (let i = 1; i < 8; i++) {
                    let tree = createBalanceTree();
                    let p = tree.split(i);
                    chai.assert.equal(isCorrectTree(p.left), true);
                    chai.assert.equal(isCorrectTree(p.right), true);
                }
                let tree = createBalanceTree();
                let p = tree.split(100);
                chai.assert.equal(isCorrectTree(p.left), true);
                chai.assert.equal(isCorrectTree(p.right), true);
                tree = createBalanceTree();
                p = tree.split(0);
                chai.assert.equal(isCorrectTree(p.left), true);
                chai.assert.equal(isCorrectTree(p.right), true);
            });

            it('on Bamboo', function () {
                for (let i = 1; i < 5; i++) {
                    let tree = createBamboo();
                    let p = tree.split(i);
                    chai.assert.equal(isCorrectTree(p.left), true);
                    chai.assert.equal(isCorrectTree(p.right), true);
                }
                let tree = createBamboo();
                let p = tree.split(100);
                chai.assert.equal(isCorrectTree(p.left), true);
                chai.assert.equal(isCorrectTree(p.right), true);
                tree = createBamboo();
                p = tree.split(0);
                chai.assert.equal(isCorrectTree(p.left), true);
                chai.assert.equal(isCorrectTree(p.right), true);
            });
        });

        describe("merge", function () {

            it('null like one of all arg', function () {
                let tree = createBamboo();
                tree.merge(null);
                chai.assert.equal(isCorrectTree(tree._root), true);
            });

            it('on BalanceTree', function () {

                for (let i = 1; i < 8; i++) {
                    let tree = createBalanceTree();
                    let p = tree.split(i);
                    tree._root = p.left;
                    if (tree._root !== null)
                        tree.merge(p.right);
                    else
                        tree._root = p.right;

                    chai.assert.equal(isCorrectTree(tree._root), true);
                }

                let tree = createBalanceTree();
                let p = tree.split(100);
                tree._root = p.left;
                if (tree._root !== null)
                    tree.merge(p.right);
                else
                    tree._root = p.right;
                chai.assert.equal(isCorrectTree(tree._root), true);

                tree = createBalanceTree();
                p = tree.split(0);
                tree._root = p.left;
                if (tree._root !== null)
                    tree.merge(p.right);
                else
                    tree._root = p.right;
                chai.assert.equal(isCorrectTree(tree._root), true);
            });

            it('on Bamboo', function () {
                for (let i = 1; i < 5; i++) {
                    let tree = createBalanceTree();
                    let p = tree.split(i);
                    tree._root = p.left;
                    if (tree._root !== null)
                        tree.merge(p.right);
                    else
                        tree._root = p.right;

                    chai.assert.equal(isCorrectTree(tree._root), true);
                }

                let tree = createBalanceTree();
                let p = tree.split(100);
                tree._root = p.left;
                if (tree._root !== null)
                    tree.merge(p.right);
                else
                    tree._root = p.right;
                chai.assert.equal(isCorrectTree(tree._root), true);

                tree = createBalanceTree();
                p = tree.split(0);
                tree._root = p.left;
                if (tree._root !== null)
                    tree.merge(p.right);
                else
                    tree._root = p.right;
                chai.assert.equal(isCorrectTree(tree._root), true);
            });

        });

        describe("add", function () {
            it('Random add', function () {
                let tree = new Splay();
                for (let i = 0; i < 100; i++)
                    tree.add(Math.random());
                chai.assert.equal(isCorrectTree(tree._root), true);
            });
        });

        describe("remove", function () {

            it('Remove one', function () {
                let tree = createBalanceTree();
                tree.remove(4);
                chai.assert.equal(isCorrectTree(tree._root), true);
            });

            it('Remove all', function () {
                let tree = createBalanceTree();
                for (let i = 1; i < 8; i++)
                    tree.remove(i);
                chai.assert.equal(isCorrectTree(tree._root), true);
                chai.assert.equal(tree._root, null);
            });

            it("Remove more then all", function () {
                let tree = createBalanceTree();
                for (let i = 1; i < 8; i++)
                    tree.remove(i);
                tree.remove(1);
                tree.remove(2);
                tree.remove(4);
                tree.remove(8);
                chai.assert.equal(isCorrectTree(tree._root), true);
                chai.assert.equal(tree._root, null);
            })

        });

    });

});