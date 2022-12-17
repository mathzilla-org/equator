# Download and Load

Download [the latest release](https://github.com/equator/equator/releases/latest) or [build from source](Contributing.md#building-and-testing).

Equator depends on [jQuery 1.5.2+](http://jquery.com), we recommend the [Google CDN-hosted copy](http://code.google.com/apis/libraries/devguide.html#jquery).

Load Equator with something like (order matters):
```html
<link rel="stylesheet" href="/path/to/equator.css"/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="/path/to/equator.js"></script>
<script>
var MQ = Equator.getInterface(2);
</script>
```

Now you can call our [API methods](Api_Methods.md) on `MQ`.

# Basic Usage

Equator instances are created from HTML elements. For the full list of constructors and API methods, see [API Methods](Api_Methods.md).

## Static Math Rendering

To statically render a formula, call [`MQ.StaticMath()`](Api_Methods.md#mqstaticmathhtml_element) on an HTML element:
```html
<p>Solve <span id="problem">ax^2 + bx + c = 0</span>.</p>

<script>
  var problemSpan = document.getElementById('problem');
  MQ.StaticMath(problemSpan);
</script>
```

## Editable Math Fields

To create an editable math field, call [`MQ.MathField()`](Api_Methods.md#mqmathfieldhtml_element-config) on an HTML element and, optionally, a [config options object](Config.md). The following example features a math field with a handler to check the answer every time an edit may have occurred:
```html
<p><span id="answer">x=</span></p>

<script>
  var answerSpan = document.getElementById('answer');
  var answerMathField = MQ.MathField(answerSpan, {
    handlers: {
      edit: function() {
        var enteredMath = answerMathField.latex(); // Get entered math in LaTeX format
        checkAnswer(enteredMath);
      }
    }
  });
</script>
```

## Get and Set Math

To get and set the contents of a math field, use [`mathField.latex()`](Api_Methods.md#latex).

Math fields are initialized with the text that was in the span, parsed as LaTeX. This can be updated by calling [`mathField.latex(latexString)`](Api_Methods.md#latexlatex_string). To programmatically type text into a math field, use [`.typedText(string)`](Api_Methods.md#typedtexttext),

# Join the Community

[<img alt="slackin.equator.com" src="http://slackin.equator.com/badge.svg" align="top">](http://slackin.equator.com)
(Prefer IRC? We're `#equator` on Freenode.)
