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
var opt = new M.Some(document.getElementById("foobar"));
var id = opt.match(
    M.case(M.Some, function(element){ return element.getAttribute("id") }),
    M.case(N.None, function(){ return createFoobar(); }
); //elementId

</script>
```


## Documentation
Monad.js brings the concepts of monads to javascript language. The goal is to abstract a lot of the common cases in Javscript, like checking if variables are null, or having the ability to be two different states.  Using some of the cool features of Javascript, we can bring over the ideas of Scala Monads to make our code clean and concise. Check out some of the examples to see how the Monads are used.  The test file also contains awesome examples.

I varied from the exact specifications of the Scala monads to embrace javascript style and syntax. This will make the ideas more easily used and applied to javascript code. There is no reason to force another languages conventions. So the goal is to keep it as natural as possible.





## Examples
####Option:

```javascript
var option = new M.Option(3);
nullOption.isDefined(); // true
nullOption.getOrElse("String is Null"); // 3
nullOption.map(function(item){ return item * 3}; // M.Some(9)
```

```javascript
var nullOption = new M.Option(null);
nullOption.isDefined(); // false
nullOption.getOrElse("String is Null"); // "String is Null"
nullOption.map(function(item){ return item * 3}; // M.None
```
Matching:
```javascript
var opt = new M.Some(document.getElementById("foobar"));
var id = opt.match(
    M.case(M.Some, function(element){ return element.getAttribute("id") }),
    M.case(N.None, function(){ return createFoobar(); }
); //elementId
```
####Either:
_(To be completed)_


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" subdirectory as they are generated via Grunt. You'll find source code in the "lib" subdirectory!_

## Release History
08/29/13 - version 0.1
09/16/13 - version 0.3

## License
Copyright (c) 2013 Michael Seid  
Licensed under the MIT license.
