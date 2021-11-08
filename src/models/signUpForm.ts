import * as yup from 'yup'
import type { SchemaOf } from "yup"

export interface SignUpForm {
    name: string
    lastname: string
    email: string
    password: string
    passwordConfirmation: string
}

export const signUpValidationSchema: SchemaOf<SignUpForm> = yup.object({
    name: yup
        .string()
        .required('Please inform your name.'),
    lastname: yup
        .string()
        .required('Please inform your lastname.'),
    email: yup
        .string()
        .required('Please inform your email.')
        .email('Please inform a valid email.'),
    password: yup
        .string()
        .required('Please inform a password.')
        .min(6, `The password must have six or more characters.`),
    passwordConfirmation: yup
        .string()
        .required('Please confirm the password.')
        .oneOf([yup.ref('password'), null], 'Passwords must match.')
}).defined()