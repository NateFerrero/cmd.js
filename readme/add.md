### cmd.add

| name        | return value  | description   |
|-------------|---------------|---------------|
| `add`       | `[100, ...]`  | Returns the sum of all arguments added to each given value. |

The following example adds 10 to each value:

```js
cmd.add(10).with(1, 2, 3, 4, 5);
// [11, 12, 13, 14, 15]
```
