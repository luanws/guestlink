import axios from 'axios'

export const defaultApiUrl = 'https://invitation-maker.vercel.app/api'

export const api = axios.create({
    baseURL: defaultApiUrl,
})