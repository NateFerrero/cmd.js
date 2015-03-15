### cmd.filter

| name       | return value    | description   |
|------------|-----------------|---------------|
| `filter`   | `[mixed, ...]`  | Filters out values based on arguments. |

The following example filters the values to only even numbers greater than 5:

```js
cmd.filter(function (x) {
    return x % 2 === 0;
}, function (x) {
    return x > 5;
}).with(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
// [6, 8, 10]
```
