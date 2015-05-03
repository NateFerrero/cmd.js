### cmd.lt

| name        | return value  | description   |
|-------------|---------------|---------------|
| `lt`        | `[false, true, ...]`  | Returns the result of comparison. |

The following example returns true for each value less than 4:

```js
cmd.lt(4).with(8, 2, 3, 4, 5);
// [false, true, true, false, false]
```
