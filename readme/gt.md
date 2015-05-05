### cmd.gt

| name        | return value  | description   |
|-------------|---------------|---------------|
| `gt`        | `[false, true, ...]`  | Returns the result of comparison. |

The following example returns true for each value greater than 4:

```js
cmd.gt(4).with(1, 2, 3, 4, 5);
// [false, false, false, false, true]
```
