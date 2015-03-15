### cmd.subtract

| name        | return value  | description   |
|-------------|---------------|---------------|
| `subtract`  | `[100, ...]`  | Returns the sum of all arguments subtracted from each given value. |

The following example subtracts 10 from each value:

```js
cmd.subtract(10).with(1, 2, 3, 4, 5);
// [-9, -8, -7, -6, -5]
```
