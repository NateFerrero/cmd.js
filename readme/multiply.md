### cmd.multiply

| name        | return value  | description   |
|-------------|---------------|---------------|
| `multiply`  | `[100, ...]`  | Returns the product of all arguments multiplied by each given value. |

The following example multiplies each value by 10:

```js
cmd.multiply(10).with(1, 2, 3, 4, 5);
// [10, 20, 30, 40, 50]
```
