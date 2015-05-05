### cmd.gte

| name        | return value  | description   |
|-------------|---------------|---------------|
| `gte`       | `[false, true, ...]`  | Returns the result of comparison. |

The following example returns true for each value greater than or equal to 3:

```js
cmd.gte(3).with(1, 2, 3, 4, 5);
// [false, false, true, true, true]
```
