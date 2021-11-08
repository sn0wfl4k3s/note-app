import * as yup from 'yup'
import type { SchemaOf } from "yup"

export interface NoteForm {
    title: string
    description: string
}


export const noteFormValidationSchema: SchemaOf<NoteForm> = yup.object({
    title: yup
        .string()
        .optional(),
    description: yup
        .string()
        .min(2, 'The description must have 2 or more characters.')
        .required('Please inform the description.')
}).defined()