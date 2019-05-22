import localforage from 'localforage'
import moment from 'moment'
import shortid from 'shortid'
import { location } from '@hyperapp/router'
import {twilio} from './util'
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

// init firebase
firebase.initializeApp({
  apiKey: 'AIzaSyBtY-TMXxTIvtXighdhoOdcDRu4mHyIxAY',
  authDomain: 'queue-pwa.firebaseapp.com',
  projectId: 'queue-pwa',
})

export const state = {
  isLoggedIn: false,
  queuers: null,
  isNewModalOpen: true,
  isModalOpen: false,
  email: '',
  password: '',
  id: '',
  name: '',
  party: '',
  number: '',
  notes: '',
  showToast: false,
  toastTitle: '',
  toastMessage: '',
  toastType: '',
  location: location.state,
}

export const actions = {
  // init for the entire apps data and or dom manipulations
  init: () => (state, actions) => {
    process.env.ENV !== `production` && console.log(state)
    actions.fetchQueuers()
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        actions.setIsLoggedIn(true)
      }
    })
  },

  initSettings: async () => {
    const fstr = firebase.firestore()
    return await fstr.collection("model-1")
      .get() // get it!
      .then(async querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} => ${doc.data()}`);
        })
        return querySnapshot
      })
  },

  location: location.actions,

  // toast functionality
  toast: ({title, message, type}) => (state, actions) => {
    setTimeout(() => {
      process.env.ENV !== `production` && console.log(state)
      actions.setToast({title, message, type})
      actions.toggleToast()
    }, 300)
    setTimeout(() => {
      actions.toggleToast()
      setTimeout(() => {
        actions.setToast({title: '', message: '', type: ''})
      }, 200)
    }, 3000)
  },
  toggleToast: () => state => ({showToast: !state.showToast}),
  setToast: ({title, message, type}) => () => ({
    toastTitle: title,
    toastMessage: message,
    toastType: type,
  }),

  // set the queuers this is used alot
  setQueuers: queuers => () => ({queuers}),

  home: () => (state, actions) => {
    actions.location.go('/')
  },

  // login the user
  login: () => (state, actions) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then(() => {
        actions.nullifyLoginFields()
        actions.setIsLoggedIn(true)
      })
      .catch(err => {
        actions.toast({
          title: 'Error',
          message: err.message,
          type: 'error',
        })
        console.error(err.message)
      })
  },

  logout: () => actions => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        actions.nullifyLoginFields()
        actions.setIsLoggedIn(false)
        actions.location.go('/')
      })
      .catch(err => {
        actions.toast({
          title: 'Error',
          message: err.message,
          type: 'error',
        })
      })
  },

  settings: () => (state, actions) => {
    actions.location.go('/settings')
  },

  nullifyLoginFields: () => state => ({
    email: '',
    password: '',
  }),

  setIsLoggedIn: val => state => ({isLoggedIn: val}),

  // fetch queuers from localstorage or set to empty array if none are found
  fetchQueuers: () => (state, actions) => {
    localforage
      .getItem('queuers')
      .then(val => {
        if (val === null) {
          localforage.setItem('queuers', []).then(data => {
            actions.setQueuers(data)
          })
        } else {
          actions.setQueuers(val)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },

  // switch save and edit modals
  toggleModal: queuer => (state, actions) => {
    if (queuer === undefined) {
      actions.toggleAddModal()
      setTimeout(() => {
        actions.setModalToggle(true)
      }, 300)
      return
    }
    if ((queuer.target !== undefined) || queuer === '') {
      actions.toggleAddModal()
      setTimeout(() => {
        actions.setModalToggle(true)
      }, 300)
    } else {
      actions.toggleEditModal(queuer)
      actions.setModalToggle(false)
    }
  },
  setModalToggle: isNewModalOpen => state => ({isNewModalOpen}),

  // toggles the edit an existing modal
  toggleEditModal: currentQueuer => (state, actions) => {
    if (state.name !== '' && state.isModalOpen) {
      setTimeout(() => {
        actions.setCurrentQueuer('')
      }, 300)
      return {isModalOpen: !state.isModalOpen}
    } else {
      actions.setCurrentQueuer(currentQueuer)
      return {isModalOpen: !state.isModalOpen}
    }
  },
  setCurrentQueuer: (data) => state => {
    return {
      id: data.id,
      name: data.name,
      party: data.party_size,
      number: data.phone_number,
      notes: data.notes,
    }
  },

  // toggles the save new modal
  toggleAddModal: () => (state, actions) => {
    setTimeout(() => {
      actions.nullifyFields()
    }, 300)
    return {isModalOpen: !state.isModalOpen}
  },

  textQueuer: message => state => {
    if (state.number === '') return
    twilio(state.number, message)
      .then(resp => console.log(resp))
      .catch(err => console.log(err))
  },

  onTextQueuer: message => (state, actions) => {
    const pos = state.queuers.findIndex(obj => obj.id === state.id)
    const queuers = state.queuers

    queuers[pos].texted = true

    localforage
      .setItem('queuers', queuers)
      .then(data => {
        actions.setQueuers(data)
        actions.textQueuer(
          'Your table is ready! Please see the host for more details.',
        )
      })
      .catch(err => console.error(err))
  },

  saveQueuer: () => (state, actions) => {
    localforage
      .setItem('queuers', [
        ...state.queuers,
        {
          id: shortid.generate(),
          name: state.name,
          party_size: state.party,
          phone_number: state.number,
          notes: state.notes,
          entry: moment().toISOString(),
          end: false,
          deleted: false,
          seated: false,
          texted: false,
        },
      ])
      .then(data => {
        actions.setQueuers(data)
        actions.textQueuer(
          `Thanks ${
            state.name
          }! You will recieve another message when your table is ready.`,
        )
        actions.toast({
          title: 'Success',
          message: `Added ${state.name}`,
          type: 'success',
        })
        actions.nullifyFields()
      })
      .catch(err => {
        console.log(err)
        actions.nullifyFields()
      })
  },

  updateQueuer: () => (state, actions) => {
    const pos = state.queuers.findIndex(obj => obj.id === state.id)
    const queuers = state.queuers

    queuers[pos].name = state.name
    queuers[pos].party_size = state.party
    queuers[pos].phone_number = state.number
    queuers[pos].notes = state.notes

    localforage
      .setItem('queuers', queuers)
      .then(data => {
        actions.setQueuers(data)
      })
      .catch(err => {
        console.log(err)
      })
  },

  removeQueuer: () => (state, actions) => {
    const pos = state.queuers.findIndex(obj => obj.id === state.id)
    const queuers = state.queuers.filter(queuer => queuer.id !== state.id)

    localforage
      .setItem('queuers', queuers)
      .then(data => {
        actions.setQueuers(data)
        setTimeout(() => {
          actions.nullifyFields()
        }, 300)
      })
      .catch(err => {
        console.log(err)
      })
  },

  seatQueuer: () => (state, actions) => {
    const pos = state.queuers.findIndex(obj => obj.id === state.id)
    const queuers = state.queuers

    //queuers[pos].end = moment().toISOString()
    queuers[pos].seated = true

    console.log(queuers)

    localforage
      .setItem('queuers', queuers)
      .then(data => {
        actions.setQueuers(data)
      })
      .catch(err => {
        console.log(err)
      })
  },

  // reset fields
  nullifyFields: () => state => ({
    id: '',
    name: '',
    party: '',
    number: '',
    notes: '',
  }),

  // all input setters
  setName:     ({target}) => state => ({name: target.value}),
  setParty:    ({target}) => state => ({party: target.value.trim()}),
  setNumber:   ({target}) => state => ({number: target.value.trim()}),
  setNotes:    ({target}) => state => ({notes: target.value}),
  setEmail:    ({target}) => state => ({email: target.value}),
  setPassword: ({target}) => state => ({password: target.value}),
}
