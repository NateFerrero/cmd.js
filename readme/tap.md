### cmd.tap

| name        | return value  | description   |
|-------------|---------------|---------------|
| `tap`       | `[1, ...]`    | Modify each value mid-stream with a function. |

The following example converts numbers to 2n + 1:

```js
var doublePlus1 = cmd.tap(function (x) {
    return 2 * x + 1;
});

doublePlus1.with(1, 2, 3, 4, 5);
// [3, 5, 7, 9, 11]
```
