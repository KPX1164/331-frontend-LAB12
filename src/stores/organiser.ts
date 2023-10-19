import type { Organiser } from '@/type'
import { defineStore } from 'pinia'
export const useOrganiserStore = defineStore('organiser', {
  state: () => ({
    orgganiser: null as Organiser | null
  }),
  actions: {
    setOrganiser(organiser: Organiser) {
      this.orgganiser = organiser
    }
  }
})
