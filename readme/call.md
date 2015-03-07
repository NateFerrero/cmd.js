### cmd.call

| name          | return value    | description   |
|---------------|-----------------|---------------|
| `call`        | `[mixed, ...]`  | Invokes and returns the specified method on each value. |

The following example converts numbers to precision 3 strings:

```js
cmd.call('toPrecision', 3)(1, 10, 100);
// [1.00, 10.0, 100]
```
