### cmd.format

| name       | return value                 | description   |
|------------|------------------------------|---------------|
| `format`   | `['formatted string', ...]`  | Formats string arguments using positional `{}` targets. |

The following example formats two strings using positional targets:

```js
cmd.format('I love {}pples, {}lueberries, and {}ake', '{} + {} = {}').with('a', 'b', 'c');
// ["I love apples, blueberries, and cake", "a + b = c"]
```
