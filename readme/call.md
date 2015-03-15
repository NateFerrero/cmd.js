### cmd.call

| name          | return value    | description   |
|---------------|-----------------|---------------|
| `call`        | `[mixed, ...]`  | Invokes and returns the specified method on each value. |

The following example converts numbers to precision 3 strings:

```js
cmd.call('toPrecision', 3).with(1, 10, 100);
// [1.00, 10.0, 100]
```

You can also just provide any function to call for each value. The reference `cmd.it` is used to refer to the current value in the given arguments:

```js
cmd.call(Math.pow, 2, cmd.it).with(1, 2, 3);
// [2, 4, 8]

cmd.call(Math.pow, cmd.it, 2).with(1, 2, 3);
// [1, 4, 9]
```
