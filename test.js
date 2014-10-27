'use strict';

var walk,
    inspect,
    Retext,
    assert;

/**
 * Dependencies.
 */

walk = require('./');
inspect = require('retext-inspect');
Retext = require('retext');
assert = require('assert');

/**
 * Fixtures.
 */

var paragraph;

paragraph = 'Some simple text. Other sentence.';

/**
 * Retext.
 */

var retext,
    TextOM;

retext = new Retext().use(walk).use(inspect);
TextOM = retext.TextOM;

/**
 * Check if `Node` and its sub-classers have a method.
 *
 * @param {string} methodName
 */

function assertNodeHasMethod(methodName) {
    assert(typeof new TextOM.Parent()[methodName] === 'function');
    assert(typeof new TextOM.Element()[methodName] === 'function');
    assert(typeof new TextOM.Child()[methodName] === 'function');
    assert(typeof new TextOM.Text()[methodName] === 'function');

    assert(typeof new TextOM.RootNode()[methodName] === 'function');
    assert(typeof new TextOM.ParagraphNode()[methodName] === 'function');
    assert(typeof new TextOM.SentenceNode()[methodName] === 'function');
    assert(typeof new TextOM.WordNode()[methodName] === 'function');
    assert(typeof new TextOM.SymbolNode()[methodName] === 'function');
    assert(typeof new TextOM.WhiteSpaceNode()[methodName] === 'function');
    assert(typeof new TextOM.PunctuationNode()[methodName] === 'function');
    assert(typeof new TextOM.TextNode()[methodName] === 'function');
    assert(typeof new TextOM.SourceNode()[methodName] === 'function');
}

/**
 * Tests.
 */

describe('retext-walk()', function () {
    it('should be a `function`', function () {
        assert(typeof walk === 'function');
    });

    it('should attach a `walkForwards` method on `Node#`', function () {
        assertNodeHasMethod('walkForwards');
    });

    it('should attach a `walkBackwards` method on `Node#`', function () {
        assertNodeHasMethod('walkBackwards');
    });

    it('should attach a `walkUpwards` method on `Node#`', function () {
        assertNodeHasMethod('walkUpwards');
    });
});

describe('Node#walkForwards', function () {
    var tree;

    before(function (done) {
        retext.parse(paragraph, function (err, node) {
            tree = node;

            done(err);
        });
    });

    describe('Node#walkForwards(callback)', function () {
        it('should invoke callback for every forward node', function () {
            var counter;

            counter = 0;

            function callback() {
                counter++;
            }

            tree.head.head.head.walkForwards(callback);

            assert(counter === 15);
        });

        it('should work when no direct sibling exists', function () {
            var counter;

            counter = 0;

            function callback() {
                counter++;
            }

            tree.head.head.tail.walkForwards(callback);

            assert(counter === 8);
        });

        it('should stop invoking when callback returns false', function () {
            var counter;

            counter = 0;

            function callback() {
                counter++;

                return false;
            }

            tree.head.head.head.walkForwards(callback);

            assert(counter === 1);
        });
    });

    describe('Node#walkForwards(type, callback)', function () {
        it('should invoke callback for every `type` node',
            function () {
                var counter;

                counter = 0;

                function callback() {
                    counter++;
                }

                tree.head.head.head.walkForwards(tree.WORD_NODE, callback);

                assert(counter === 4);
            }
        );
    });
});

describe('Node#walkBackwards', function () {
    var tree;

    before(function (done) {
        retext.parse(paragraph, function (err, node) {
            tree = node;

            done(err);
        });
    });

    describe('Node#walkBackwards(callback)', function () {
        it('should invoke callback for every backward node', function () {
            var counter;

            counter = 0;

            function callback() {
                counter++;
            }

            tree.head.tail.tail.walkBackwards(callback);

            assert(counter === 16);
        });

        it('should work when no direct sibling exists', function () {
            var counter;

            counter = 0;

            function callback() {
                counter++;
            }

            tree.head.tail.head.walkBackwards(callback);

            assert(counter === 11);
        });

        it('should stop invoking when callback returns false', function () {
            var counter;

            counter = 0;

            function callback() {
                counter++;

                return false;
            }

            tree.head.tail.tail.walkBackwards(callback);

            assert(counter === 1);
        });
    });

    describe('Node#walkBackwards(type, callback)', function () {
        it('should invoke callback for every `type` node',
            function () {
                var counter;

                counter = 0;

                function callback() {
                    counter++;
                }

                tree.head.tail.tail.walkBackwards(tree.WORD_NODE, callback);

                assert(counter === 5);
            }
        );
    });
});

describe('Node#walkUpwards', function () {
    var tree;

    before(function (done) {
        retext.parse(paragraph, function (err, node) {
            tree = node;

            done(err);
        });
    });

    describe('Node#walkUpwards(callback)', function () {
        it('should invoke callback for every upward node', function () {
            var counter;

            counter = 0;

            function callback() {
                counter++;
            }

            tree.head.head.head.walkUpwards(callback);

            assert(counter === 3);
        });

        it('should stop invoking when callback returns false', function () {
            var counter;

            counter = 0;

            function callback() {
                counter++;

                return false;
            }

            tree.head.head.head.walkUpwards(callback);

            assert(counter === 1);
        });
    });

    describe('Node#walkUpwards(type, callback)', function () {
        it('should invoke callback for every `type` node',
            function () {
                var counter;

                counter = 0;

                function callback() {
                    counter++;
                }

                tree.head.head.head.walkUpwards(
                    tree.PARAGRAPH_NODE, callback
                );

                assert(counter === 1);
            }
        );
    });
});
