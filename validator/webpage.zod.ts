import {string, z} from 'zod';

export const loginSchema = z.object({
    email : z.email().nonempty(),
    password : z.string().nonempty()
})
export const registerSchema = z.object({
    name : z.string().nonempty(),
    email : z.email().nonempty(),
    password : z.string().nonempty()
})
export const resetSchema = z.object({
    email : z.email().nonempty(),
    password: z.string().nonempty(),
    conformpassword : z.string().nonempty()
})
export const emailverifySchema = z.object({
    email : z.email().nonempty()
})