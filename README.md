# cmd.js

### JavaScript Logic Framework

[![cmd.js on npm](https://nodei.co/npm/cmd.js.png?downloads=true&stars=true)](https://nodei.co/npm/cmd.js/)
[![cmd.js on npm](https://nodei.co/npm-dl/cmd.js.png?months=6&height=2)](https://nodei.co/npm/cmd.js/)

[![Github Stars](https://img.shields.io/github/stars/NateFerrero/cmd.js.svg)](https://github.com/NateFerrero/cmd.js)
[![Package Version](https://img.shields.io/npm/v/cmd.js.svg)](https://www.npmjs.com/package/cmd.js)
[![Package License](https://img.shields.io/npm/l/cmd.js.svg)](https://www.npmjs.com/package/cmd.js)
[![Code Climate](https://img.shields.io/codeclimate/github/NateFerrero/cmd.js.svg)](https://codeclimate.com/github/NateFerrero/cmd.js)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/NateFerrero/cmd.js.svg)](https://codeclimate.com/github/NateFerrero/cmd.js)
[![Build Status](https://img.shields.io/travis/NateFerrero/cmd.js.svg)](https://travis-ci.org/NateFerrero/cmd.js)

Ever find yourself handling complex data structures in JavaScript? With cmd.js, one can assemble small blocks of logic, and easily pass data through them for processing.

## Quickstart

### Node.js

Install with [npm](https://www.npmjs.com/package/cmd.js):

```bash
npm install cmd.js
```

```js
var cmd = require('cmd.js');

// Enable all cmd modules
cmd.use('*');

// Test
cmd.log('Hello World');
```

### Browser

```html
<script src="src/cmd.js"></script>
<script src="build/cmd.lib.js"></script>
<script>
    // Enable all cmd modules
    cmd.use('*');

    // Test
    cmd.log('Hello World');
</script>
```

## Chaining Example

Goal: sort the users by increasing age, and display the name and id of each user.

#### Data Set

```js
var users = [
    {name: 'John',     id: 1, age: 37},
    {name: 'Kimberly', id: 2, age: 35},
    {name: 'Janine',   id: 3, age: 33},
    {name: 'Justin',   id: 4, age: 31},
];
```

#### Vanilla JavaScript

```js
users.sort(function (a, b) {
    return a.age > b.age;
});

users.forEach(function (user) {
    console.log(user.name, user.id);
});

// The output:
// Justin 4
// Janine 3
// Kimberly 2
// John 1
```

Pretty simple, right? With cmd.js, it's even simpler:

#### cmd.js

```js
// Enable all cmd modules
cmd.use('*');

var pluck = cmd.pluck;

var sortAndPrint = cmd.sort(pluck('age')).
    and.logger(pluck('name'), pluck('id'));

sortAndPrint(users);

// The output:
// Justin 4
// Janine 3
// Kimberly 2
// John 1
```

The benefits of this style include reusability, clear logical flow, and less code in general. By chaining commands you create reusable logic isolated from specifc data variables.

### Developer Notes

Development dependencies can be installed with `npm install` or `make install` for convenience.

Testing is accomplished with [mocha](http://mochajs.org/), and can be run with `npm test` or `make test`. There's also a handy `make test-watch` to see live test results during development.

This project is built with [gulp](http://gulpjs.com/). Make all changes/additions in `src/lib/*.js` while running `make build-watch` from the command line.

# API Reference

## Structure of a Command

```js
cmd.name(... args ...)(... vals ...);
```

Some commands do not accept args, and you are given the command with empty args already provided.

```js
cmd.sum(... vals ...);
```

## Argument Merging

Arguments are automatically merged one level deep for maximum convenience. For example, you can provide an array of arguments or individual arguments, or any combination thereof. The following are all identical:

```js
cmd.use('max');

cmd.max(1, 2, 3, 4, 5); // [5]

cmd.max([1, 2, 3, 4, 5]); // [5]

cmd.max(1, [2, 3], 4, 5); // [5]

cmd.max([1], 2, [3, 4, 5]); // [5]

cmd.max([1], [2], [3], [4], [5]); // [5]
```

Because of this, if you absolutely need to work with an array as-is, pass it in like `[[1, 2, 3]]` to avoid automatic argument merging.

## All Modules

### cmd.alert

| name     | return value        |
|----------|---------------------|
| `alert`  | `[undefined, ...]`  |

Causes a browser alert for each value passed in. Does nothing in a Node.js environment.

#### Example

The following example displays two alerts in sequence:

```js
cmd.alert('Hello World!', 'Will Smith here.');
// two alerts displayed (only in browser)
```

### cmd.case.*

| name          | return value                   |
|---------------|--------------------------------|
| `case.lower`  | `['change string case', ...]`  |
| `case.title`  | `['Change String Case', ...]`  |
| `case.upper`  | `['CHANGE STRING CASE', ...]`  |

Converts strings to various cases.

#### Example

The following example converts strings to lowercase:

```js
cmd.case.lower('Hello World!', 'Will Smith here.');
// ["hello world!", "will smith here."]
```

### cmd.compare

| name       | return value    |
|------------|-----------------|
| `compare`  | `-1 or 0 or 1`  |

Compare is a unique command in that it only accepts 2 values. Any further values will be ignored. It is used internally for `cmd.sort` but available for custom sorting as well. It defines a sort order for any two JavaScript types:

#### Example

The following example compares two values.

```js
cmd.compare(8, 5);
// 3

cmd.compare(1000, 'a');
// -1

cmd.compare('boo', 'apple');
// 1

cmd.compare('hello', false);
// 1
```

### cmd.exists

| name       | return value            |
|------------|-------------------------|
| `exists`   | `[true or false, ...]`  |

Checks if each value passed in exists (not null or undefined).

#### Example

The following example checks the existence of the values. Only null and undefined count as not existing:

```js
cmd.exists(null, undefined, false, '', 0, true);
// [false, false, true, true, true, true]
```

### cmd.extend

| name       | return value    |
|------------|-----------------|
| `extend`   | `[{...}, ...]`  |

Extends each value with each argument, in order.

#### Example

The following example adds the color red to each value passed in:

```js
cmd.extend({color: 'red'})({item: 'wrench'}, {item: 'apple'});
// [{item: 'wrench', color: 'red'}, {item: 'apple', color: 'red'}]
```

### cmd.filter

| name       | return value    |
|------------|---------------- |
| `filter`   | `[mixed, ...]`  |

Filters out values based on arguments.

#### Example

The following example filters the values to only even numbers greater than 5:

```js
cmd.filter(function (x) {
    return x % 2 === 0;
}, function (x) {
    return x > 5;
})(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
// [6, 8, 10]
```

### cmd.format

| name       | return value                 |
|------------|----------------------------- |
| `format`   | `['formatted string', ...]`  |

Formats string arguments using positional `{}` targets.

#### Example

The following example formats two strings using positional targets:

```js
cmd.format('I love {}pples, {}lueberries, and {}ake', '{} + {} = {}')('a', 'b', 'c');
// ["I love apples, blueberries, and cake", "a + b = c"]
```

### cmd.join

| name     | return value              |
|----------|-------------------------- |
| `join`   | `['joined string', ...]`  |

Joins values provided with arguments as glue.

#### Example

The following example joins the values using the glue provided in initial arguments:

```js
cmd.join('-', '+')('a', 'b', 'c');
// ["a-b-c", "a+b+c"]
```



### cmd.obj

| name     | return value     |
|----------|----------------- |
| `obj`   | `[{ ... }, ...]`  |

Zips up an object using arguments as keys and values as values.

#### Example

The following example builds an object with keys and repeated values. Note the `[[wrapped array]]` syntax to avoid spreading the array as arguments:

```js
cmd.obj('name', 'age', 'city', 'interests')(
    'Nate', 25, 'Los Angeles, CA', [['tech', 'javascript', 'node.js', 'space']]
);
// [{
//     "name": "Nate",
//     "age": 25,
//     "city": "Los Angeles, CA",
//     "interests": ["tech", "javascript", "node.js", "space"]
// }]
```

### cmd.pluck

| name       | return value    |
|------------|---------------- |
| `pluck`    | `[mixed, ...]`  |

Surfaces data within a structure of objects or arrays, using arguments as keys.

#### Example

The following example plucks object properties:

```js
var people = [{
    name: 'Adam',
    pet: {
        type: 'bird',
        name: 'Sherlock'
    }
}, {
    name: 'Shannon',
    pet: {
        type: 'snake',
        name: 'Rosa'
    }
}, {
    name: 'Upgrayyed',
    pet: {
        type: 'dog',
        name: 'Maxximus'
    }
}];
cmd.pluck('pet', 'name')(people);
// ["Sherlock", "Rosa", "Maxximus"]
```

### cmd.push.to

| name       | return value    |
|------------|---------------- |
| `push.to`  | `[mixed, ...]`  |

Pushes provided values to each argument array. The use of `.to` avoids having to `[[double wrap]]` array arguments.

#### Example

The following example pushes to an array:

```js
var people = [];
var add = cmd.push.to(people);

add({
    name: 'Adam'
});

add({
    name: 'Blake'
});

console.log(people);
// [{"name":"Adam"}, {"name":"Blake"}]
```

Push returns the value(s) passed in, so it can be used perfectly while chaining commands:

```js
add.and.log({name: 'Charlie'});
// Object {name: "Charlie"}

people.length;
// 3
```



