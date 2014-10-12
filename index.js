'use strict';

/**
 * Define `walk`.
 */

function walk() {}

function findNextParent(node) {
    while (node) {
        node = node.parent;

        if (node && node.next) {
            return node.next;
        }
    }

    return null;
}

function findPrevParent(node) {
    while (node) {
        node = node.parent;

        if (node && node.prev) {
            return node.prev;
        }
    }

    return null;
}

/**
 * Walk the tree forwards.
 *
 * @param {string} [type]
 * @param {function(node): false?} callback
 */

function walkForwards(type, callback) {
    var node;

    if (!callback) {
        callback = type;
        type = null;
    }

    node = this.next || findNextParent(this);

    while (node) {
        if (!type || node.type === type) {
            if (callback(node) === false) {
                return;
            }
        }

        node = node.head || node.next || findNextParent(node);
    }
}

/**
 * Walk the tree backwards.
 *
 * @param {string} [type]
 * @param {function(node): false?} callback
 */

function walkBackwards(type, callback) {
    var node;

    if (!callback) {
        callback = type;
        type = null;
    }

    node = this.prev || findPrevParent(this);

    while (node) {
        if (!type || node.type === type) {
            if (callback(node) === false) {
                return;
            }
        }

        node = node.tail || node.head || node.prev || findPrevParent(node);
    }
}

/**
 * Walk the tree upwards.
 *
 * @param {string} [type]
 * @param {function(node): false?} callback
 */

function walkUpwards(type, callback) {
    var node;

    node = this.parent;

    if (!callback) {
        callback = type;
        type = null;
    }

    while (node) {
        if (!type || node.type === type) {
            if (callback(node) === false) {
                return;
            }
        }

        node = node.parent;
    }
}

/**
 * Define `attach`.
 *
 * @param {Retext} retext
 */

function attach(retext) {
    var nodePrototype;

    nodePrototype = retext.TextOM.Node.prototype;

    nodePrototype.walkForwards = walkForwards;
    nodePrototype.walkBackwards = walkBackwards;
    nodePrototype.walkUpwards = walkUpwards;
}

/**
 * Expose `attach`.
 */

walk.attach = attach;

/**
 * Expose `walk`.
 */

exports = module.exports = walk;
