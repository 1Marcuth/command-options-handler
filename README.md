# Command Options Handler

Command Options Handler is a library for handling options/arguments in string format.

### Usage

```ts
import CommandHandler, { Command } from "command-options-handler"

const command: Command = {
    name: "Teste",
    description: "This is the description of the test command.",
    options: [
        {
            name: "want-something",
            description: "This is the description of the first argument/option. The names here have no impact whatsoever. I just put them to fit with my bot development architecture :)",
            type: "yesOrNo"
        }
    ]
}

const commandHandler = new CommandHandler(command)

console.dir(commandHandler.handleStringOptions([ "yes" ]), { depth: null })
console.dir(commandHandler.handleStringOptions([ "YeS ", "x" ]), { depth: null })
console.dir(commandHandler.handleStringOptions([ "yeah", "ok" ]), { depth: null })
```

### Execution result

```js
{
  isValid: true,
  argumentsExpected: 1,
  argumentsReceived: 1,
  optionsValidation: [
    {
      name: 'want-something',
      isValid: { type: true, value: true },
      value: { raw: 'yes', parsed: 'yes' } 
    }
  ]
}
{
  isValid: true,       
  argumentsExpected: 1,
  argumentsReceived: 2,
  optionsValidation: [ 
    {
      name: 'want-something',
      isValid: { type: true, value: true },
      value: { raw: 'YeS ', parsed: 'yes' }
    }
  ]
}
{
  isValid: false,
  argumentsExpected: 1,
  argumentsReceived: 2,
  optionsValidation: [
    {
      name: 'want-something',
      isValid: { type: false, value: false },
      value: { raw: 'yeah', parsed: null }
    }
  ]
}
```