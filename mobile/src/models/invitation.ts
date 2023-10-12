export interface Invitation {
  id: string
  imageUri: string | null
  name: string
  eventName: string
  date: string
  address: string
  time: string
}

export interface NewInvitation {
  imageUri: string | null
  name: string
  eventName: string
  date: string
  address: string
  time: string
}