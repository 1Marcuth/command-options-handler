export enum CommandOptionTypes {
    string,
    number,
    integer,
    float,
    boolean,
    yesOrNo
}

export type CommandOptionChoice = {
    name: string
    value: any
}

export type CommandOption = {
    name: string
    type: keyof typeof CommandOptionTypes
    choices?: CommandOptionChoice[]
    description: string
}

export type Command = {
    name: string
    options?: CommandOption[]
    description: string
}