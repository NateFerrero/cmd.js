### cmd.pluck

| name       | return value    | description   |
|------------|-----------------|---------------|
| `pluck`    | `[mixed, ...]`  | Surfaces data within a structure of objects or arrays, using arguments as keys. |

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
