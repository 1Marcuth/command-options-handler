import CommandHandler, { HandlingResult, OptionValidationIsValid, OptionValidationResult, CommandWithOptions } from "./command-handler"
import { Command, CommandOption, CommandOptionChoice, CommandOptionTypes } from "./types"
import Parser, { ParseResult, ParseResultValue } from "./parser"

export {
    Command,
    CommandOption,
    CommandOptionChoice,
    CommandOptionTypes,
    Parser,
    ParseResult,
    ParseResultValue,
    HandlingResult,
    OptionValidationIsValid,
    OptionValidationResult,
    CommandWithOptions
}

export default CommandHandler