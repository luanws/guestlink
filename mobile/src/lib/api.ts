import axios from 'axios'

export const defaultApiUrl = 'https://guestlink.vercel.app/api'

export const api = axios.create({
    baseURL: defaultApiUrl,
})