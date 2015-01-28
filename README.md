# cmd.js

### JavaScript Logic Framework

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

This project uses gulp. Make all changes/additions in `lib/*.js` while running `gulp` from the command line.

# API Reference

## Structure of a Command

```js
cmd.name(... args ...)(... vals ...);
```

Some commands do not accept args, and you are given the command with empty args already provided.

```js
cmd.sum(... vals ...);
```

## Alert

### `cmd.alert(val1, ...)`

| name     | all or each?  | accepts args?  | return value        |
|----------|---------------|----------------|---------------------|
| `alert`  | each          | no             | `[undefined, ...]`  |

#### Example

The following example displays two alerts in sequence.

```js
cmd.alert('Hello World!', 'Will Smith here.');
```

## Compare

### `cmd.compare(val1, val2)`

| name       | all or each?  | accepts args?  | return value    |
|------------|---------------|----------------|-----------------|
| `compare`  | all           | no             | `-1 or 0 or 1`  |

Compare is a unique command in that it only accepts 2 values. Any further values will be ignored.

#### Example

The following example compares two values.

```js
console.log(cmd.compare(8, 5)); // logs 3
```

## Exists

### `cmd.exists(val1, ...)`

| name       | all or each?  | accepts args?  | return value            |
|------------|---------------|----------------|-------------------------|
| `exists`   | each          | no             | `[true or false, ...]`  |

#### Example

The following example checks the existence of the values. Only null and undefined count as not existing.

```js
cmd.exists(null, undefined, false, '', 0, true);
// [false, false, true, true, true, true]
```

## Extend

### `cmd.extend(arg1, ...)(val1, ...)`

| name       | all or each?  | accepts args?  | return value    |
|------------|---------------|----------------|-----------------|
| `extend`   | each          | yes            | `[{...}, ...]`  |

Extends each value with each argument, in order.

#### Example

```js
cmd.extend({color: 'red'})({item: 'wrench'}, {item: 'apple'});
// [{item: 'wrench', color: 'red'}, {item: 'apple', color: 'red'}]
```












