import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

export function sign(payload: string | Buffer | object, options?: jwt.SignOptions): string {
    return jwt.sign(payload, JWT_SECRET, options)
}

export function verify(token: string, options?: jwt.VerifyOptions): string | object {
    return jwt.verify(token, JWT_SECRET, options)
}

export function decode(token: string, options?: jwt.DecodeOptions): null | { [key: string]: any } | string {
    return jwt.decode(token, options)
}