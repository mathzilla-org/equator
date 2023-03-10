# API Methods

To use the Equator API, first get the latest version of the interface:

```js
var MQ = Equator.getInterface(2);
```

By default, Equator overwrites the global `Equator` variable when loaded. If you do not want this behavior, you can use `.noConflict()` ([similar to `jQuery.noConflict()`](http://api.jquery.com/jQuery.noConflict)):

```html
<script src="/path/to/first-equator.js"></script>
<script src="/path/to/second-equator.js"></script>
<script>
var secondMQ = Equator.noConflict().getInterface(2);
secondMQ.MathField(...);

var firstMQ = Equator.getInterface(2);
firstMQ.MathField(...);
</script>
```

This lets different copies of Equator each power their own math fields, but using different copies on the same DOM element won't work. `.noConflict()` is primarily intended to help you reduce globals.



# Constructors

## MQ.StaticMath(html_element)

Creates a non-editable Equator initialized with the contents of the HTML element and returns a [StaticMath object](#equator-base-methods).

If the given element is already a static math instance, this will return a new StaticMath object with the same `.id`. If the element is a different type of Equator, this will return `null`.

## MQ.MathField(html_element, [ config ])

Creates an editable Equator initialized with the contents of the HTML element and returns a [MathField object](#editable-mathfield-methods).

If the given element is already an editable math field, this will return a new editable MathField object with the same `.id`. If the element is a different type of Equator, this will return `null`.

## \EquatorMathField LaTeX command

`\EquatorMathField` can be used to embed editable math fields inside static math, like:

```html
<span id="fill-in-the-blank">\sqrt{ \EquatorMathField{x}^2 + \EquatorMathField{y}^2 }</span>
<script>
  var fillInTheBlank = MQ.StaticMath(document.getElementById('fill-in-the-blank'));
  fillInTheBlank.innerFields[0].latex() // => 'x'
  fillInTheBlank.innerFields[1].latex() // => 'y'
</script>
```

As you can see, they can be accessed on the StaticMath object via `.innerFields`.

## MQ(html_element)

`MQ` itself is a function that takes an HTML element and, if it's the root
HTML element of a static math or math field, returns an API object for it
(if not, `null`):

```js
MQ(mathFieldSpan) instanceof MQ.MathField // => true
MQ(otherSpan) // => null
```

## MQ.config(config)

Updates the global [configuration options](Config.md) (which can be overridden on a per-field basis).



# Comparing MathFields

## Checking Type
```js
var staticMath = MQ.StaticMath(staticMathSpan);
mathField instanceof MQ.StaticMath // => true
mathField instanceof MQ // => true
mathField instanceof Equator // => true

var mathField = MQ.MathField(mathFieldSpan);
mathField instanceof MQ.MathField // => true
mathField instanceof MQ.EditableField // => true
mathField instanceof MQ // => true
mathField instanceof Equator // => true
```

## Comparing IDs
API objects for the same Equator instance have the same `.id`, which will always be a unique truthy primitive value that can be used as an object key (like an ad hoc [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) or [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)):

```js
MQ(mathFieldSpan).id === mathField.id // => true

var setOfMathFields = {};
setOfMathFields[mathField.id] = mathField;
MQ(mathFieldSpan).id in setOfMathFields // => true
staticMath.id in setOfMathFields // => false
```

## Data Object
Similarly, API objects for the same Equator instance share a `.data` object (which can be used like an ad hoc [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) or [`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)):

```js
MQ(mathFieldSpan).data === mathField.data // => true
mathField.data.foo = 'bar';
MQ(mathFieldSpan).data.foo // => 'bar'
```



# Equator base methods

The following are methods that every Equator object has. These are the only methods that static math instances have and a subset of the methods that editable fields have.

## .revert()

Any element that has been turned into a Equator instance can be reverted:
```html
<span id="revert-me" class="equator-static-math">
  some <code>HTML</code>
</span>
```
```js
mathfield.revert().html(); // => 'some <code>HTML</code>'
```

## .reflow()

Equator uses computed dimensions, so if they change (because an element was equator-ified before it was in the visible HTML DOM, or the font size changed), then you'll need to tell Equator to recompute:

```js
var mathFieldSpan = $('<span>\\sqrt{2}</span>');
var mathField = MQ.MathField(mathFieldSpan[0]);
mathFieldSpan.appendTo(document.body);
mathField.reflow();
```

## .el()

Returns the root HTML element.

## .latex()

Returns the contents as LaTeX.

## .latex(latex_string)

This will render the argument as LaTeX in the Equator instance.



# Editable MathField methods

Editable math fields have all of the [above](#equator-base-methods) methods in addition to the ones listed here.

## .focus()

Puts the focus on the editable field.

## .blur()

Removes focus from the editable field.

## .write(latex_string)

Write the given LaTeX at the current cursor position. If the cursor does not have focus, writes to last position the cursor occupied in the editable field.

```javascript
mathField.write(' - 1'); // writes ' - 1' to mathField at the cursor position
```

## .cmd(latex_string)

Enter a LaTeX command at the current cursor position or with the current selection. If the cursor does not have focus, it writes it to last position the cursor occupied in the editable field.

```javascript
mathField.cmd('\\sqrt'); // writes a square root command at the cursor position
```

## .select()

Selects the contents (just like [on `textarea`s](http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-48880622) and [on `input`s](http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-34677168)).

## .clearSelection()

Clears the selection.

## .moveToLeftEnd(), .moveToRightEnd()

Move the cursor to the left/right end of the editable field, respectively. These are shorthand for [`.moveToDirEnd(L/R)`](#movetodirenddirection), respectively.

## .moveToDirEnd(direction)

Moves the cursor to the end of the mathfield in the direction specified. The direction can be one of `MQ.L` or `MQ.R`. These are constants, where `MQ.L === -MQ.R` and vice versa. This function may be easier to use than [moveToLeftEnd or moveToRightEnd](#movetoleftend-movetorightend) if used in the [`moveOutOf` handler](Config.md#outof-handlers).

```javascript
var config = {
  handlers: {
    moveOutOf: function(direction) {
      nextMathFieldOver.movetoDirEnd(-direction);
    }
  }
});
```

## .keystroke(keys)

Simulates keystrokes given a string like `"Ctrl-Home Del"`, a whitespace-delimited list of [key inputs](http://www.w3.org/TR/2012/WD-DOM-Level-3-Events-20120614/#fixed-virtual-key-codes) with optional prefixes.

```javascript
mathField.keystroke('Shift-Left'); // Selects character before the current cursor position
```

## .typedText(text)

Simulates typing text, one character at a time from where the cursor currently is. This is supposed to be identical to what would happen if a user were typing the text in.

```javascript
// Types part of the demo from equator.com without delays between keystrokes
mathField.typedText('x=-b\\pm \\sqrt b^2 -4ac');
```

## .config(new_config)

Changes the [configuration](Config.md) of just this math field.

## .dropEmbedded(pageX, pageY, options) **[???x??????????????????????????](#note-on-experimental-features)**

Insert a custom embedded element at the given coordinates, where `options` is an object like:
```js
{
  htmlString: '<span class="custom-embed"></span>',
  text: function() { return 'custom_embed'; },
  latex: function() { return '\\customEmbed'; }
}
```

## .registerEmbed('name', function(id){ return options; }) **[???x??????????????????????????](#note-on-experimental-features)**

Allows Equator to parse custom embedded objects from latex, where `options` is an object like the one defined above in `.dropEmbedded()`. This will parse the following latex into the embedded object you defined: `\embed{name}[id]}`.

## Note on Experimental Features

Methods marked as experimental may be altered drastically or removed in future versions. They may also receive less maintenance than other non-experimental features.

# Inner MathField methods

Inner math fields have all of the [above](#editable-mathfield-methods) methods in addition to the ones listed here.

## makeStatic()

Converts the editable inner field into a static one.

## makeEditable()

Converts the static inner field into an editable one.
