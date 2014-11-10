## Exists

### `cmd.exists(val1, ...)`

| name       | all or each?  | accepts args?  | return value            |
|------------|---------------|----------------|-------------------------|
| `exists`   | each          | no             | `[true or false, ...]`  |

#### Example

The following example checks the existence of the values. Only null and undefined count as not existing.

```js
cmd.exists(null, undefined, false, '', 0, true);
// [false, false, true, true, true, true]
```
