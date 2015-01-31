### `cmd.format(val1, ...)`

| name       | return value                 |
|------------|----------------------------- |
| `format`   | `['formatted string', ...]`  |

#### Example

The following example formats two strings using positional targets.

```js
cmd.format('I love {}pples, {}lueberries, and {}ake', '{} + {} = {}')('a', 'b', 'c');
// ["I love apples, blueberries, and cake", "a + b = c"]
```
