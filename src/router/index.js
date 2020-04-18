import Vue from 'vue'
import VueRouter from 'vue-router'
import EventCreate from '@/views/EventCreate.vue'
import EventList from '@/views/EventList.vue'
import EventShow from '@/views/EventShow.vue'
import NotFound from '@/components/NotFound.vue'
import NetworkIssue from '@/components/NetworkIssue.vue'

import NProgress from 'nprogress'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter(to, _from, next) {
      store
        .dispatch('event/fetchEvent', to.params.id)
        .then(event => {
          to.params.event = event
          next()
        })
        .catch(err => {
          if (err.response && err.response.status === 404) {
            next({ name: '404', params: { resource: 'event' } })
          } else {
            next({ name: 'network-issue' })
          }
        })
    }
  },
  {
    path: '/event-create',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } }
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((_to, _from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
