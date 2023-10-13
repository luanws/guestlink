import { Guest } from './guest'

export interface Invitation {
    id: string
    imageUri: string | null
    name: string
    eventName: string
    date: string
    address: string
    time: string
    guests?: { [id: string]: Guest }
}

export interface NewInvitation {
    imageFile: File | null
    name: string
    eventName: string
    date: string
    address: string
    time: string
}