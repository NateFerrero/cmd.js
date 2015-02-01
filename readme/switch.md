### cmd.switch

| name       | return value    | description   |
|------------|-----------------|---------------|
| `switch`   | `[mixed, ...]`  | Switches based on a matching when condition. |

The following example uses `cmd.switch` to choose an appropriate sentence:

```js
var msgSwitch = cmd.switch(function (when, x) {
    when(x > 5,     'You have lots of messages');
    when(x === 5,   'You have five messages');
    when(x > 1,     'You have a few messages');
    when(x === 1,   'You have a message');
    when(x === 0,   'You have no messages');
    when(true,      'Unknown');
});

msgSwitch(0, 1, 2, 3, 4, 5, 6, 'x');
// ["You have no messages",
//  "You have a message",
//  "You have a few messages",
//  "You have a few messages",
//  "You have a few messages",
//  "You have five messages",
//  "You have lots of messages",
//  "Unknown"]
```
