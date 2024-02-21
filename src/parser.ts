import { z } from "zod"

import { CommandOptionTypes } from "./types"

export type ParseResultValue<ParsedValueType = any> = {
    raw: string
    parsed: ParsedValueType | null
}

export type ParseResult<ParsedValueType = any> = {
    isValid: boolean
    value: ParseResultValue<ParsedValueType>
}

class Parser {
    private static readonly schemas = {
        string: z.string().trim().min(1),
        yesOrNo: z.string().trim().transform(value => value.toLocaleLowerCase()).transform(value => ["yes", "no"].includes(value) ? value : null),
        boolean: z.string().trim().transform(value => value.toLocaleLowerCase()).transform(value => value === "true" ? true : value === "false" ? false : null),
        number: z.string().trim().transform(value => !isNaN(parseFloat(value)) ? parseFloat(value) : null),
        integer: z.string().trim().transform(value => Number.isInteger(parseFloat(value)) ? parseInt(value) : null),
        float: z.string().trim().transform(value => !isNaN(parseFloat(value)) ? parseFloat(value) : null)
    }

    public static parse<DataType extends keyof typeof CommandOptionTypes>(dataType: DataType, dataString: string): ParseResult<any> {
        try {
            const schema = Parser.schemas[dataType]
            const data = schema.parse(dataString)

            if (data === null) {
                throw new Error("Invalid input data!")
            }

            const parseResult: ParseResult<any> = {
                isValid: true,
                value: {
                    raw: dataString,
                    parsed: data
                }
            }

            return parseResult
        } catch(error: any) {
            const parseResult: ParseResult<any> = {
                isValid: false,
                value: {
                    raw: dataString,
                    parsed: null
                }
            }

            return parseResult
        }
    }
}

export default Parser