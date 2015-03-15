### cmd.has

| name       | return value          | description   |
|------------|-----------------------|---------------|
| `has`      | `[false, true, ...]`  | Returns true if the entire chain of properties exists. |

The following example inspects deep properties to see if `a` has a `length`:

```js
cmd.has('a', 'length').with({a: 'something'}, {b: 'something'});
// [true, false]
```
