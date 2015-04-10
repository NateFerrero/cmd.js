### cmd.lte

| name        | return value  | description   |
|-------------|---------------|---------------|
| `lte`       | `[false, true, ...]`  | Returns the result of comparison. |

The following example returns boolean for each value less than or equal to 3:

```js
cmd.gte(3).with(7, 2, 3, 4, 1);
// [true, false, true, true, false]
```
