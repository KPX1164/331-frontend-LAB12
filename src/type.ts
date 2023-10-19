export interface EventItem {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  organiser: Organiser
  images: string[]
}

export interface Organiser {
  id: number
  name: string
  address: string
  images: string[]
  roles: string[]

}
