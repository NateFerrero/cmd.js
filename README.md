# cmd.js

### JavaScript Logic Framework

[![cmd.js on npm](https://nodei.co/npm/cmd.js.png?downloads=true&stars=true)](https://nodei.co/npm/cmd.js/)

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
cmd.log.with('Hello World');
```

### Browser

```html
<script src="src/cmd.js"></script>
<script src="build/cmd.lib.js"></script>
<script>
    // Enable all cmd modules
    cmd.use('*');

    // Test
    cmd.log.with('Hello World');
</script>
```

## Index of Commands

### A

[add](readme/add.md)
[alert](readme/alert.md)

### C

[call](readme/call.md)
[case](readme/case.md)
[clone](readme/clone.md)
[compare](readme/compare.md)
[count](readme/count.md)

### D

[default](readme/default.md)
[divide](readme/divide.md)

### E

[equals](readme/equals.md)
[exists](readme/exists.md)
[extend](readme/extend.md)

### F

[filter](readme/filter.md)
[format](readme/format.md)

### G

[get](readme/get.md)
[group](readme/group.md)

### H

[has](readme/has.md)

### J

[join](readme/join.md)

### L

[log](readme/log.md)
[logger](readme/logger.md)

### M

[match](readme/match.md)
[max](readme/max.md)
[min](readme/min.md)
[multiply](readme/multiply.md)

### N

[not](readme/not.md)

### O

[obj](readme/obj.md)

### P

[product](readme/product.md)
[push](readme/push.md)

### R

[reject](readme/reject.md)
[reverse](readme/reverse.md)

### S

[sort](readme/sort.md)
[subtract](readme/subtract.md)
[sum](readme/sum.md)

### T

[tap](readme/tap.md)

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

var sortAndPrint = cmd.sort(cmd.get('age')).
    logger(cmd.get('name'), cmd.get('id'));

sortAndPrint.with(users);

// The output:
// Justin 4
// Janine 3
// Kimberly 2
// John 1
```

The benefits of this style include reusability, clear logical flow, and less code in general. By chaining commands you create reusable logic isolated from specifc data variables.

## Types of Commands

### "Each" Commands

```js
cmd.add(...arguments).with(...values);

cmd.add(100, 200).with(7, 8, 9); // [307, 308, 309]
```

These commands operate on each value passed in and thus do not have access to other values during processing. This also means that every "each" command returns an array at all times. Both arguments and values are subject to argument merging as described below.

Some commands do not accept arguments, and only the values need to be provided.

```js
cmd.exists.with(...values);

cmd.exists.with(0, null); // [true, false]
```

To chain these commands, just leave off the values until the very end. Some examples:

```js
cmd.filter(cmd.exists).with(1, 2, null, 3); // [1, 2, 3]

cmd.filter(function (x) {
    return typeof x !== 'string'
}).exists.with("1", 2, null, "3"); // [true, false]
```

#### Get Raw Value

Each commands always return an array of values. To get the first value not wrapped in an array instead, just use `.raw` immediately before passing in the values:

```js
cmd.use('case');

cmd.case.upper.raw('hello world');
// "HELLO WORLD"

cmd.use('format');

cmd.format('my favorite number is {}').raw(100);
// "my favorite number is 100"
```

#### Map Command

What would you do if you needed to add 1 to each value in many arrays independently? Use `.map`:

```js
cmd.add(1).map.with([1, 2, 3], [10, 20, 30], [100, 200, 300]);
// [[2, 3, 4], [11, 21, 31], [101, 201, 301]]
```

### "All" Commands

Every command is unique, but most all commands take all `...values` and perform some operation that includes all of them. Most "all" commands do not return an array, in direct contrast to "each" commands.

```js
cmd.sum.with(...values);

cmd.sum.with(1, 2, 3); // 6
```

#### Map Command

What would you do if you needed to sum a bunch of arrays independently? Use `.map`:

```js
cmd.sum.with([1, 2, 3], [4, 5, 6], [7, 8, 9]); // 45 - not what we want

cmd.sum.map.with([1, 2, 3], [4, 5, 6], [7, 8, 9]); // [6, 15, 24] - perfect!
```

### Special Commands

Some commands do not fall under either of the above categories, and usually take and return very specific arguments. An example of this is `cmd.compare`, which is described below.

## Argument Merging

Arguments are automatically merged one level deep for maximum convenience. For example, you can provide an array of arguments or individual arguments, or any combination thereof. The following are all identical:

```js
cmd.use('max');

cmd.max.with(1, 2, 3, 4, 5); // 5

cmd.max.with([1, 2, 3, 4, 5]); // 5

cmd.max.with(1, [2, 3], 4, 5); // 5

cmd.max.with([1], 2, [3, 4, 5]); // 5

cmd.max.with([1], [2], [3], [4], [5]); // 5
```

Because of this, if you absolutely need to work with an array as-is, pass it in like `[[1, 2, 3]]` to avoid automatic argument merging.

## Tutorial

Let's start with some data:

```js
var products = [
    {name: 'apple',  type: 'fruit',     q: 5, price: 1.99},
    {name: 'pear',   type: 'fruit',     q: 3, price: 2.59},
    {name: 'carrot', type: 'vegetable', q: 7, price: 0.59}
];
```

How many products are there in total? Luckily, `.sum` takes an array and returns a single number:

```js
cmd.get('q').sum.with(products);
// 15
```

How many apples are there? Use `.raw` to get just the first result unwrapped:

```js
cmd.filter(cmd.get('name').equals('apple')).get('q').raw(products);
// 5
```

How many fruits are there? Use `.filter` and `.sum` together:

```js
cmd.filter(cmd.get('type').equals('fruit')).get('q').sum.with(products);
// 8
```

What is the total extended cost of all items?

```js
cmd.do(cmd.get('q'), cmd.get('price')).map.product.sum.call('toFixed', 2).with(products);
// '21.85'
```

## Developer Notes

Development dependencies can be installed with `npm install` or `make install` for convenience.

Testing is accomplished with [mocha](http://mochajs.org/), and can be run with `npm test` or `make test`. There's also a handy `make test-watch` to see live test results during development.

This project is built with [gulp](http://gulpjs.com/). Make all changes/additions in `src/lib/*.js` while running `make build-watch` from the command line.
