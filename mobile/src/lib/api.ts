import axios from 'axios'

export const api = axios.create({
  // baseURL: 'https://invitation-maker.vercel.app/api',
  baseURL: 'http://192.168.100.115:3000/api',
})