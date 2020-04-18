import EventService from '@/services/EventService.js'

export const namespaced = true
export const state = {
  perPage: 3,
  eventsCount: 0,
  events: [],
  event: {}
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_COUNT(state, count) {
    state.eventsCount = count
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  createEvent({ commit, rootState, dispatch }, event) {
    console.log('User', rootState.user.user.name)
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        dispatch(
          'notification/add',
          {
            type: 'success',
            message: 'Your event has been created!'
          },
          { root: true }
        )
      })
      .catch(err => {
        dispatch(
          'notification/add',
          {
            type: 'error',
            message: 'There was an error creating an event: ' + err.message
          },
          { root: true }
        )
        throw err
      })
  },
  fetchEvents({ commit, dispatch, state }, { pageNum }) {
    return EventService.getEvents(state.perPage, pageNum)
      .then(res => {
        commit('SET_EVENTS', res.data)
        commit('SET_EVENTS_COUNT', res.headers['x-total-count'])
      })
      .catch(err =>
        dispatch(
          'notification/add',
          {
            type: 'error',
            message: 'There was an error fetching events: ' + err.message
          },
          { root: true }
        )
      )
  },
  fetchEvent({ commit, getters }, id) {
    const event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id).then(({ data }) => {
        commit('SET_EVENT', data)
        return data
      })
    }
  }
}

export const getters = {
  getEventById: state => id => state.events.find(event => event.id === id)
}
