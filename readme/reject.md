### cmd.reject

| name       | return value    | description   |
|------------|-----------------|---------------|
| `reject`   | `[mixed, ...]`  | Rejects values based on arguments. |

The following example rejects the even numbers greater than 5:

```js
cmd.reject(function (x) {
    return x % 2 === 0;
}, function (x) {
    return x > 5;
}).with(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
// [1, 2, 3, 4, 5, 7, 9]
```
