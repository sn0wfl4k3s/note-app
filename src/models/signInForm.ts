import * as yup from 'yup'
import type { SchemaOf } from "yup"

export interface SignInForm {
  email: string
  password: string
}

export const signInValidation: SchemaOf<SignInForm> = yup.object({
  email: yup
    .string()
    .required('Please inform the email.')
    .email('Please inform a valid email.'),
  password: yup
    .string()
    .required('Please inform the password.')
    .min(6, 'The password must be six characters.')
}).defined()