### cmd.count

| name        | return value  | description   |
|-------------|---------------|---------------|
| `count`     | `1`           | Return a count of all values in process. |

The following example counts the number of values provided:

```js
cmd.count.with(1, [2, 3, 4], 5, [6]);
// 6
```
