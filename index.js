'use strict';

/**
 * Dependencies.
 */

var retextFind;

retextFind = require('retext-find');

/**
 * Define `walk`.
 */

function walk() {}

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

    node = this.next || this.findAfterUpwards();

    while (node) {
        if (!type || node.type === type) {
            if (callback(node) === false) {
                return;
            }
        }

        node = node.head || node.next || node.findAfterUpwards();
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

    node = this.prev || this.findBeforeUpwards();

    while (node) {
        if (!type || node.type === type) {
            if (callback(node) === false) {
                return;
            }
        }

        node = node.tail || node.head || node.prev ||
            node.findBeforeUpwards();
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

    retext.use(retextFind);

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
