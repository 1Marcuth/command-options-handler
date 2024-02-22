import Parser, { ParseResultValue } from "./parser"
import { Command, CommandOption } from "./types"

export type HandlingResult = {
    isValid: boolean
    reason?: string
    argumentsExpected: number
    argumentsReceived: number
    optionsValidation: OptionValidationResult[]
}

export type OptionValidationIsValid = {
    type: boolean
    value: boolean
}

export type OptionValidationResult = {
    name: string
    isValid: OptionValidationIsValid
    value: ParseResultValue
}

export type CommandWithOptions = {
    options: CommandOption[]
} & Command

class CommandHandler {
    public command: CommandWithOptions

    public constructor(command: Command) {
        this.command = !command.options ? {
            ...command,
            options: []
        } : command as CommandWithOptions
    }

    public validateOption(option: CommandOption, stringOption: string): OptionValidationResult {
        const validationTypeResult = Parser.parse(option.type, stringOption)

        const optionValidationResult: OptionValidationResult = {
            name: option.name,
            isValid: {
                type: validationTypeResult.isValid,
                value: validationTypeResult.isValid
            },
            value: validationTypeResult.value
        }

        if (option.choices && validationTypeResult.isValid) {
            const choiceValues = option.choices.map(option => option.value)
            optionValidationResult.isValid.value = choiceValues.includes(validationTypeResult.value.parsed)
        }

        return optionValidationResult
    }

    public handleStringOptions(stringOptions: string[]): HandlingResult {
        const handlingResult: HandlingResult = { 
            isValid: true,
            argumentsExpected: this.command.options.length,
            argumentsReceived: stringOptions.length,
            optionsValidation: []
        }

        if (stringOptions.length < this.command.options.length) {
            handlingResult.isValid = false
            handlingResult.reason = "Fewer arguments were received than expected."
        }

        for (
            let stringOptionIndex = 0;
            stringOptionIndex < Math.min(stringOptions.length, this.command.options.length);
            stringOptionIndex++
        ) {
            const stringOption = stringOptions[stringOptionIndex]
            const option = this.command.options[stringOptionIndex]
            const optionValidationResult = this.validateOption(option, stringOption)

            handlingResult.optionsValidation[stringOptionIndex] = optionValidationResult

            if (!optionValidationResult.isValid.type || !optionValidationResult.isValid.value) {
                handlingResult.isValid = false
            }
        }

        return handlingResult
    }
}

export default CommandHandler