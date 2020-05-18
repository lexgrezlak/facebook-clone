import { arg, core, stringArg } from "@nexus/schema";

export const requiredDateTimeArg = (options: core.NexusArgConfig<'DateTime'>) => arg({...options, type: "DateTime", required: true})
export const requiredGenderArg = (options: core.NexusArgConfig<'Gender'>) => arg({...options, type: "Gender", required: true})
export const requiredStringArg = (options: core.ScalarArgConfig<string>) => stringArg({...options, required: true})
