### cmd.group

| name       | return value                    | description   |
|------------|---------------------------------|---------------|
| `group`    | `[[mixed, ...], [mixed, ...]]`  | Groups values into like categories such as position in list or result of a function call. |

The following examples group numbers in two different ways:

```js
cmd.group(2).with(1, 2, 3, 4);
// [[1, 2], [3, 4]]

cmd.group(function (x) {
    return x > 2;
}).with(1, 2, 3, 4);
// [[1, 2], [3, 4]]
```
