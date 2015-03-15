### cmd.obj

| name     | return value     | description   |
|----------|------------------|---------------|
| `obj`    | `[{ ... }, ...]` | Zips up an object using arguments as keys and values as values. |

The following example builds an object with keys and repeated values. Note the `[[wrapped array]]` syntax to avoid spreading the array as arguments:

```js
cmd.obj('name', 'age', 'city', 'interests').with(
    'Nate', 25, 'Los Angeles, CA', [['tech', 'javascript', 'node.js', 'space']]
);
// [{
//     "name": "Nate",
//     "age": 25,
//     "city": "Los Angeles, CA",
//     "interests": ["tech", "javascript", "node.js", "space"]
// }]
```
