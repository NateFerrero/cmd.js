# cmd.js

### JavaScript Logic Framework

[![NPM](https://nodei.co/npm/cmd.js.png?downloads=true&stars=true)](https://nodei.co/npm/cmd.js/)
&nbsp;
[![NPM](https://nodei.co/npm-dl/cmd.js.png?months=6&height=2)](https://nodei.co/npm/cmd.js/)

[![Code Climate](https://codeclimate.com/github/NateFerrero/cmd.js/badges/gpa.svg)](https://codeclimate.com/github/NateFerrero/cmd.js)
[![Test Coverage](https://codeclimate.com/github/NateFerrero/cmd.js/badges/coverage.svg)](https://codeclimate.com/github/NateFerrero/cmd.js)

Ever find yourself handling complex data structures in JavaScript? With cmd.js, one can assemble small blocks of logic, and easily pass data through them for processing. Here's a sample task, and how it's made clearer with cmd.js:

### The Task

Sort the users by increasing age, and display the name and id of each user.

### Data Set

```js
var users = [
    {name: 'John',     id: 1, age: 37},
    {name: 'Kimberly', id: 2, age: 35},
    {name: 'Janine',   id: 3, age: 33},
    {name: 'Justin',   id: 4, age: 31},
];
```

### Vanilla JavaScript

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

Pretty simple, right?

### cmd.js

```js
// Enable all cmd plugins
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

The benefits of this style include reusability, clear logical flow, and less code in general. By composing commands you keep your functionality completely isolated from your data.

### Developer Notes

Installation is done with `npm install` or `make install` for convenience.

Testing is accomplished with mocha, and can be run with `npm test` or `make test`. There's also a handy `make test-watch` to see live test results during development.

This project is built with [gulp](http://gulpjs.com/). Make all changes/additions in `lib/*.js` while running `make build-watch` from the command line.

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
