import CryptoJS from 'crypto-js'

const CRIPTO_KEY = process.env.CRYPTO_SECRET as string

function base64Encode(str: string): string {
    const buffer = Buffer.from(str, 'utf8')
    return buffer.toString('base64')
}

function base64Decode(str: string): string {
    const buffer = Buffer.from(str, 'base64')
    return buffer.toString('utf8')
}

export function encrypt(data: string): string {
    const encrypted = CryptoJS.AES.encrypt(data, CRIPTO_KEY).toString()
    return base64Encode(encrypted)
}

export function decrypt(data: string): string {
    const encrypted = base64Decode(data)
    return CryptoJS.AES.decrypt(encrypted, CRIPTO_KEY).toString(CryptoJS.enc.Utf8)
}