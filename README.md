# [Equator](http://equator.com)

by [David Amirkhanov](http://github.com/websofter) (<mail.websofter@gmail.com>) [<img alt="slackin.equator.com" src="http://slackin.equator.com/badge.svg" align="top">](http://slackin.equator.com)

Equator is a web formula editor designed to make typing math easy and beautiful.

[<img alt="homepage demo" src="https://cloud.githubusercontent.com/assets/225809/15163580/1bc048c4-16be-11e6-98a6-de467d00cff1.gif" width="260">](http://equator.com)

The Equator project is supported by its [partners](http://equator.com/partners.html). We hold ourselves to a compassionate [Code of Conduct](http://docs.equator.com/en/latest/Code_of_Conduct/).

Equator is resuming active development and we're committed to getting things running smoothly. Find a dusty corner? [Let us know in Slack.](http://slackin.equator.com) (Prefer IRC? We're `#equator` on Freenode.)

## Getting Started

Equator has a simple interface. This brief example creates a Equator element and renders, then reads a given input:
```javascript
var htmlElement = document.getElementById('some_id');
var config = {
  handlers: { edit: function(){ ... } },
  restrictMismatchedBrackets: true
};
var mathField = MQ.MathField(htmlElement, config);

mathField.latex('2^{\\frac{3}{2}}'); // Renders the given LaTeX in the Equator field
mathField.latex(); // => '2^{\\frac{3}{2}}'
```

Check out our [Getting Started Guide](http://docs.equator.com/en/latest/Getting_Started/) for setup instructions and basic Equator usage.

## Docs

Most documentation for Equator is located on [ReadTheDocs](http://docs.equator.com/en/latest/).

Some older documentation still exists on the [Wiki](https://github.com/equator/equator/wiki).

## Open-Source License

The Source Code Form of Equator is subject to the terms of the Mozilla Public
License, v. 2.0: [http://mozilla.org/MPL/2.0/](http://mozilla.org/MPL/2.0/)

The quick-and-dirty is you can do whatever if modifications to Equator are in
public GitHub forks. (Other ways to publicize modifications are also fine, as
are private use modifications. See also: [MPL 2.0 FAQ](https://www.mozilla.org/en-US/MPL/2.0/FAQ/))
