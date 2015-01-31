## Compare

### `cmd.compare(val1, val2)`

| name       | all or each?  | accepts args?  | return value    |
|------------|---------------|----------------|-----------------|
| `compare`  | all           | no             | `-1 or 0 or 1`  |

Compare is a unique command in that it only accepts 2 values. Any further values will be ignored.

#### Example

The following example compares two values.

```js
cmd.compare(8, 5);
// 3
```
