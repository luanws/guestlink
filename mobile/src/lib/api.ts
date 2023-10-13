import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://invitation-maker.vercel.app/api',
})