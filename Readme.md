# retext-walk [![Build Status](https://travis-ci.org/wooorm/retext-walk.svg?branch=master)](https://travis-ci.org/wooorm/retext-walk) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-walk.svg)](https://coveralls.io/r/wooorm/retext-walk?branch=master)

**[retext](https://github.com/wooorm/retext "Retext")** node walker.

## Installation

npm:
```sh
$ npm install retext-walk
```

Component:
```sh
$ component install wooorm/retext-walk
```

Bower:
```sh
$ bower install retext-walk
```

## Usage

```js
var Retext,
    retext,
    inspect,
    walk;

Retext = require('retext');
walk = require('retext-walk');
inspect = require('retext-inspect');

retext = new Retext().use(walk).use(inspect);

/**
 * See each method below.
 */
```

## API

### `callback`: `function(node): false?`

All methods accept a `callback` parameter, which receives a `node` when invoked, and can return `false` to stop the **walk\*** method from continuing.

### Node#walkForwards(type?, callback)

```js
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
  tree.head.head.head.head.walkForwards(tree.WORD_NODE, console.log);
  /**
   * WordNode[1]
   * └─ TextNode: 'simple'
   *
   * WordNode[1]
   * └─ TextNode: 'text'
   *
   * WordNode[1]
   * └─ TextNode: 'Another'
   *
   * WordNode[1]
   * └─ TextNode: 'paragraph'
   */
});
```

- walkForwards(type, callback) - Visit every following node of `type`;
- walkForwards(callback) - Visit every following node.

### Node#walkBackwards(type?, callback)

```js
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
  tree.tail.walkBackwards(console.log);
  /**
   * WhiteSpaceNode[1]
   * └─ TextNode: '\n\n'
   *
   * TextNode: '\n\n'
   *
   * ParagraphNode[1]
   * └─ SentenceNode[6]
   *    ├─ WordNode[1]
   *    │  └─ TextNode: 'Some'
   *    ├─ WhiteSpaceNode[1]
   *    │  └─ TextNode: ' '
   *    ├─ WordNode[1]
   *    │  └─ TextNode: 'simple'
   *    ├─ WhiteSpaceNode[1]
   *    │  └─ TextNode: ' '
   *    ├─ WordNode[1]
   *    │  └─ TextNode: 'text'
   *    └─ PunctuationNode[1]
   *       └─ TextNode: '.'
   *
   * SentenceNode[6]
   * ├─ WordNode[1]
   * │  └─ TextNode: 'Some'
   * ├─ WhiteSpaceNode[1]
   * │  └─ TextNode: ' '
   * ├─ WordNode[1]
   * │  └─ TextNode: 'simple'
   * ├─ WhiteSpaceNode[1]
   * │  └─ TextNode: ' '
   * ├─ WordNode[1]
   * │  └─ TextNode: 'text'
   * └─ PunctuationNode[1]
   *    └─ TextNode: '.'
   *
   * PunctuationNode[1]
   * └─ TextNode: '.'
   *
   * TextNode: '.'
   *
   * WordNode[1]
   * └─ TextNode: 'text'
   *
   * TextNode: 'text'
   *
   * WhiteSpaceNode[1]
   * └─ TextNode: ' '
   *
   * TextNode: ' '
   *
   * WordNode[1]
   * └─ TextNode: 'simple'
   *
   * TextNode: 'simple'
   *
   * WhiteSpaceNode[1]
   * └─ TextNode: ' '
   *
   * TextNode: ' '
   *
   * WordNode[1]
   * └─ TextNode: 'Some'
   *
   * TextNode: 'Some'
   */
});
```

- walkBackwards(type, callback) - Visit every preceding node of `type`;
- walkBackwards(callback)

### Node#walkUpwards(type?, callback)

```js
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
  tree.head.head.head.head.walkUpwards(function (node) {
      console.log(node);

      if (node.type === node.SENTENCE_NODE) {
          return false;
      }
  });
  /**
   * WordNode[1]
   * └─ TextNode: 'Some'
   *
   * SentenceNode[6]
   * ├─ WordNode[1]
   * │  └─ TextNode: 'Some'
   * ├─ WhiteSpaceNode[1]
   * │  └─ TextNode: ' '
   * ├─ WordNode[1]
   * │  └─ TextNode: 'simple'
   * ├─ WhiteSpaceNode[1]
   * │  └─ TextNode: ' '
   * ├─ WordNode[1]
   * │  └─ TextNode: 'text'
   * └─ PunctuationNode[1]
   *    └─ TextNode: '.'
   */
});
```

- walkUpwards(type, callback) - Visit every upwards node of `type`;
- walkUpwards(callback) - Visit every upwards node.

## License

MIT © Titus Wormer
