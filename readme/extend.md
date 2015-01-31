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
