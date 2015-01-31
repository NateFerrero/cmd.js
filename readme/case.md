### cmd.case.*

| name          | return value                   |
|---------------|--------------------------------|
| `case.lower`  | `['change string case', ...]`  |
| `case.title`  | `['Change String Case', ...]`  |
| `case.upper`  | `['CHANGE STRING CASE', ...]`  |

Converts strings to various cases.

#### Example

The following example converts strings to lowercase:

```js
cmd.case.lower('Hello World!', 'Will Smith here.');
// ["hello world!", "will smith here."]
```
