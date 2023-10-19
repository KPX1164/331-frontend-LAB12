
import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import EventDetailView from '../views/event/EventDetailView.vue'
import EventEditView from '@/views/event/EventEditView.vue'
import EventRegisterView from '@/views/event/EventRegisterView.vue'
import EventLayoutView from '@/views/event/EventLayoutView.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'
import  NetworkErrorView  from '@/views/NetworkErrorView.vue';
import  NotFoundView  from '@/views/NotFoundView.vue';
import AddEventView from '@/views/EventFormView.vue'
import AddOrganiserView from '@/views/OrganiserFormView.vue'

import { useOrganiserStore } from '@/stores/organiser'

import OrganiserListView from '@/views/OrganiserListView.vue'
import OrganiserLayoutView from '@/views/organiser/OrganiserLayoutView.vue'
import OrganiserEditView from '@/views/organiser/OrganiserEditView.vue'
import OrganiserRegisterView from '@/views/organiser/OrganiserRegisterView.vue'
import OrganiserDetailView from '../views/organiser/OrganiserDetailView.vue'
import OrganiserService from '@/services/OrganiserService'
import RegisterView from '@/views/RegisterView.vue'

import LoginView from '@/views/LoginView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: (route) => ({ page: parseInt((route.query?.page as string) || '1') })
    },{
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/add-event',
      name: 'add-event',
      component: AddEventView
    },
    {
      path: '/event/:id',
      name: 'event-layout',
      component: EventLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEventById(id)
          .then((response) => {
            // need to set up the data for the component
            eventStore.setEvent(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource',
                params: { resource: 'event' }
              }
            } else {
              return { name: 'network-error' }
            }
          })
      },
      children: [
        {
          path: '',
          name: 'event-detail',
          component: EventDetailView
        },
        {
          path: 'edit',
          name: 'event-edit',

          component: EventEditView
        },
        {
          path: 'register',
          name: 'event-register',

          component: EventRegisterView
        }
      ]
    },{
      path: '/organisers',
      name: 'organiser-list',
      component: OrganiserListView,
      props: (route) => ({ page: parseInt((route.query?.page as string) || '1') })

    },{
      path: '/add-organiser',
      name: 'add-organiser',
      component: AddOrganiserView
    },
    {
      path: '/organiser/:id',
      name: 'organiser-layout',
      component: OrganiserLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const organiserStore = useOrganiserStore()
        return OrganiserService.getOrganiserById(id)
          .then((response) => {
            // need to set up the data for the component
            organiserStore.setOrganiser(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource',
                params: { resource: 'event' }
              }
            } else {
              return { name: 'network-error' }
            }
          })
      },
      children: [
        {
          path: '',
          name: 'organiser-detail',
          component: OrganiserDetailView
        },
        {
          path: 'organiser-edit',
          name: 'organiser-edit',

          component: OrganiserEditView
        },
        {
          path: 'organiser-register',
          name: 'organiser-register',

          component: OrganiserRegisterView
        }
      ]
    },{
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView      
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
