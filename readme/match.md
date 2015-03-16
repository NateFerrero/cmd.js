### cmd.match

| name       | return value    | description   |
|------------|-----------------|---------------|
| `match`    | `[mixed, ...]`  | Matches each item based on a condition and replaces the item with the value provided to `then`. |

The following example uses `cmd.match` to choose an appropriate sentence:

```js
var msgMatch = cmd.match(function (it, then) {
    it > 5   && then('You have lots of messages');
    it === 5 && then('You have five messages');
    it > 1   && then('You have a few messages');
    it === 1 && then('You have a message');
    it === 0 && then('You have no messages');
                then('Unknown');
});

msgMatch.with(0, 1, 2, 3, 4, 5, 6, 'x');
// ["You have no messages",
//  "You have a message",
//  "You have a few messages",
//  "You have a few messages",
//  "You have a few messages",
//  "You have five messages",
//  "You have lots of messages",
//  "Unknown"]
```
