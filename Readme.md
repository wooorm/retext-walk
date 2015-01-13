# retext-walk [![Build Status](https://img.shields.io/travis/wooorm/retext-walk.svg?style=flat)](https://travis-ci.org/wooorm/retext-walk) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-walk.svg?style=flat)](https://coveralls.io/r/wooorm/retext-walk?branch=master)

**[retext](https://github.com/wooorm/retext "Retext")** node walker.

## Installation

npm:

```bash
$ npm install retext-walk
```

Component:

```bash
$ component install wooorm/retext-walk
```

Bower:

```bash
$ bower install retext-walk
```

## Usage

```javascript
var Retext = require('retext');
var walk = require('retext-walk');
var inspect = require('retext-inspect');

var retext = new Retext().use(walk).use(inspect);

/**
 * See each method below.
 */
```

## API

### `callback`: `function(node): false?`

All methods accept a `callback` parameter, which receives a `node` when invoked, and can return `false` to stop the **walk\*** method from continuing.

### Node#walkForwards(type?, callback)

```javascript
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

```javascript
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
  tree.tail.walkBackwards(console.log);
  /**
   * WhiteSpaceNode: '\n\n'
   *
   * ParagraphNode[1]
   * └─ SentenceNode[6]
   *    ├─ WordNode[1]
   *    │  └─ TextNode: 'Some'
   *    ├─ WhiteSpaceNode: ' '
   *    ├─ WordNode[1]
   *    │  └─ TextNode: 'simple'
   *    ├─ WhiteSpaceNode: ' '
   *    ├─ WordNode[1]
   *    │  └─ TextNode: 'text'
   *    └─ PunctuationNode: '.'
   *
   * SentenceNode[6]
   * ├─ WordNode[1]
   * │  └─ TextNode: 'Some'
   * ├─ WhiteSpaceNode: ' '
   * ├─ WordNode[1]
   * │  └─ TextNode: 'simple'
   * ├─ WhiteSpaceNode: ' '
   * ├─ WordNode[1]
   * │  └─ TextNode: 'text'
   * └─ PunctuationNode: '.'
   *
   * PunctuationNode: '.'
   *
   * WordNode[1]
   * └─ TextNode: 'text'
   *
   * TextNode: 'text'
   *
   * WhiteSpaceNode: ' '
   *
   * WordNode[1]
   * └─ TextNode: 'simple'
   *
   * TextNode: 'simple'
   *
   * WhiteSpaceNode: ' '
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

```javascript
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
   * ├─ WhiteSpaceNode: ' '
   * ├─ WordNode[1]
   * │  └─ TextNode: 'simple'
   * ├─ WhiteSpaceNode: ' '
   * ├─ WordNode[1]
   * │  └─ TextNode: 'text'
   * └─ PunctuationNode: '.'
   */
});
```

- walkUpwards(type, callback) - Visit every upwards node of `type`;
- walkUpwards(callback) - Visit every upwards node.

## Performance

```text
              Forwards from a document's first paragraph
  14,225 op/s » A section
     915 op/s » An article
  
              Forwards over paragraphs from a document's first paragraph
  10,699 op/s » A section
     754 op/s » An article
  
              Backwards from a document's last paragraph
  10,032 op/s » A section
     708 op/s » An article
  
              Backwards over paragraphs from a document's last paragraph
   8,566 op/s » A section
     594 op/s » An article
```

## License

MIT © [Titus Wormer](http://wooorm.com)
