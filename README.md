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
    cmd.log(pluck('name'), pluck('id'));

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

