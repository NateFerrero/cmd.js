### cmd.extend

| name       | return value    | description   |
|------------|-----------------|---------------|
| `extend`   | `[{...}, ...]`  | Extends each value with each argument, in order. |

The following example adds the color red to each value passed in:

```js
cmd.extend({color: 'red'}).with({item: 'wrench'}, {item: 'apple'});
// [{item: 'wrench', color: 'red'}, {item: 'apple', color: 'red'}]
```
