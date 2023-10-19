import type { AxiosResponse } from 'axios'
import apiClient from './AxiosClient'
import type { Organiser } from '@/type'


export default {
  getOrganisers(perPage: number, page: number): Promise<AxiosResponse<Organiser[]>> {
    return apiClient.get<Organiser[]>('/organisers?_limit=' + perPage + '&_page=' + page)
},
getOrganiserById(id: number): Promise<AxiosResponse<Organiser>> {
    return apiClient.get<Organiser>('organisers/' + id.toString())
},
saveOrganiser (organizer:Organiser) : Promise<AxiosResponse<Organiser>> {
    return apiClient.post<Organiser>('/organisers', organizer)
},
getOrganisersBy(): Promise<AxiosResponse<Organiser[]>> {
    return apiClient.get<Organiser[]>(`/organisers`)
}
}
