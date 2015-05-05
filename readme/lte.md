### cmd.lte

| name        | return value  | description   |
|-------------|---------------|---------------|
| `lte`       | `[false, true, ...]`  | Returns the result of comparison. |

The following example returns true for each value less than or equal to 3:

```js
cmd.lte(3).with(7, 2, 3, 4, 1);
// [false, true, true, false, true]
```
