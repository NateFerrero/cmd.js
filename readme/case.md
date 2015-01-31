## Case

### `cmd.case.*(val1, ...)`

| name          | all or each?  | accepts args?  | return value        |
|---------------|---------------|----------------|---------------------|
| `case.lower`  | each          | no             | `['change string case', ...]`  |
| `case.title`  | each          | no             | `['Change String Case', ...]`  |
| `case.upper`  | each          | no             | `['CHANGE STRING CASE', ...]`  |

#### Example

The following example converts strings to lowercase:

```js
cmd.case.lower('Hello World!', 'Will Smith here.');
// ["hello world!", "will smith here."]
```
