### cmd.push.to

| name       | return value    | description   |
|------------|-----------------|---------------|
| `push.to`  | `[mixed, ...]`  | Pushes provided values to each argument array. The use of `.to` avoids having to `[[double wrap]]` array arguments. |

The following example pushes to an array:

```js
var people = [];
var add = cmd.push.to(people);

add.with({
    name: 'Adam'
});

add.with({
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
