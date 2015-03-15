### cmd.divide

| name        | return value  | description   |
|-------------|---------------|---------------|
| `divide`    | `[100, ...]`  | Returns the product of all arguments divided by each given value. |

The following example divides each value by 10:

```js
cmd.divide(10).with(1, 2, 3, 4, 5);
// [0.1, 0.2, 0.3, 0.4, 0.5]
```
