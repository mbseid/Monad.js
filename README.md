# Monad

Bringing Monads to JS -- Heavily Inspired by Scala

## Getting Started
### On the server
Install the module with: `npm install Monad`

```javascript
var M = require('Monad');
var opt = new M.Option(null);
opt.getOrElse( "monads are awesome"); // "monads are awesome"
```

### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/mbseid/Monad.js/master/dist/Monad.min.js
[max]: https://raw.github.com/mbseid/Monad.js/master/dist/Monad.js

In your web page:

```html
<script src="dist/Monad.min.js"></script>
<script>
var opt = new Some(document.getElementById("foobar"));
var id = opt.match(
    M.case(M.Some, function(element){ return element.getAttribute("id") }),
    M.case(N.None, function(){ return createFoobar(); }
); //elementId

</script>
```

In your code, you can attach Monad's methods to any object.

```html
<script>
var exports = M;
</script>
<script src="dist/Monad.min.js"></script>
<script>
var left = new M.Left("lefty value");
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" subdirectory as they are generated via Grunt. You'll find source code in the "lib" subdirectory!_

## Release History
08/29/13 - version 0.1

## License
Copyright (c) 2013 Michael Seid  
Licensed under the MIT license.
