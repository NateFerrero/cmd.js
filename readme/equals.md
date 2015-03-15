### cmd.equals

| name       | return value            | description   |
|------------|-------------------------|---------------|
| `equals`   | `[true or false, ...]`  | Checks if each value passed in equals any of the given arguments. |

The following example checks for values that equal 50 or 30:

```js
cmd.equals(30, 50).with(100, 20, 50, 30);
// [false, false, true, true]
```
