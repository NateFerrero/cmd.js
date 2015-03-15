### cmd.get

| name       | return value    | description   |
|------------|-----------------|---------------|
| `get`      | `[mixed, ...]`  | Surfaces data within a structure of objects or arrays, using arguments as keys. |

The following example gets object properties:

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
cmd.get('pet', 'name').with(people);
// ["Sherlock", "Rosa", "Maxximus"]
```
