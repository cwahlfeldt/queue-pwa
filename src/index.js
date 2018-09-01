//
// main app file

import { h, app } from 'hyperapp'
import Nav from './components/Nav'
import AddButton from './components/AddButton'
import Modal from './components/Modal'
import moment from 'moment'
import localforage from 'localforage'
import shortid from 'shortid'
import { twilio } from './lib/util'

import 'tachyons-custom'
import './lib/style.css'
import './lib/vars.css'

const state = {
  queuers: null,
  isNewModalOpen: true,
  isModalOpen: false,
  id: '',
  name: '',
  party: '',
  number: '',
  notes: '',
}

const actions = {
  // init for the entire apps data and or dom manipulations
  init: () => (state, actions) => {
    actions.fetchQueuers()
  },

  // set the queuers this is used alot
  setQueuers: queuers => state => ({queuers}),

  // fetch queuers from localstorage or set to empty array if none are found
  fetchQueuers: () => (state, actions) => {
    localforage.getItem('queuers')
    .then(val => {
      if (val === null) {
        localforage.setItem('queuers', [])
          .then(data => {
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
  toggleModal: (queuer) => (state, actions) => {
    if (queuer.target !== undefined || queuer === '') {
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
  toggleEditModal: (currentQueuer) => (state, actions) => {
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
  setCurrentQueuer: ({id, name, party_size, phone_number, notes}) => state => ({
    id,
    name,
    party: party_size,
    number: phone_number,
    notes,
  }),

  // toggles the save new modal
  toggleAddModal: () => (state, actions) => {
    setTimeout(() => {
      actions.nullifyFields()
    }, 300)
    return {isModalOpen: !state.isModalOpen}
  },

  textQueuer: (message) => (state) => {
    twilio(state.number, message)
      .then(resp => console.log(resp))
      .catch(err => console.log(err))
  },

  saveQueuer: () => (state, actions) => {
    localforage.setItem('queuers',
      [
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
        }
      ]
    ).then(data => {
      actions.setQueuers(data)
      actions.textQueuer(`Thanks ${state.name}! You will recieve another message when your table is ready.`)
      actions.nullifyFields()
    }).catch(err => {
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


    localforage.setItem('queuers', queuers)
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

    localforage.setItem('queuers', queuers)
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

    localforage.setItem('queuers', queuers)
      .then(data => {
        actions.setQueuers(data)
      })
      .catch(err => {
        console.log(err)
      })
  },

  nullifyFields: () => state => ({
    id: '',
    name: '',
    party: '',
    number: '',
    notes: '',
  }),

  // all input setters
  setName: ({target}) => state => ({name: target.value}),
  setParty: ({target}) => state => ({party: target.value.trim()}),
  setNumber: ({target}) => state => ({number: target.value.trim()}),
  setNotes: ({target}) => state => ({notes: target.value}),
}

const renderQueue = (queuers, toggleModal) => (
  queuers.map((queuer, index) => (
    <div key={queuer.id} onclick={() => toggleModal(queuer)} class="pointer">
      {!queuer.end &&
        <div class="flex flex-row ph4 mv2 bg-white shadow-1 br2 items-center">
          <h4 class="index avenir black fw5 f4 w3 counter"></h4>
          <h4 class="name avenir black fw3 f4 w5">{queuer.name}</h4>
          <h4 class="name avenir black fw4 f4 w3 pv3 ml-auto tc">{queuer.party_size}</h4>
          {/*<h4 class="avenir black fw4 f5 ph2 pv3">12min</h4>*/}
        </div>
      }
    </div>
  ))
)

const view = (state, actions) => (
  <main
    oncreate={actions.init}
    class="vw-100 h-100 bg-light-gray pr5"
  >
    <div style={{height: '21px'}} class="bg-black-20 absolute top-0 left-0 w-100"></div>
    <section class="outer flex flex-row counter-reset">
      <Nav />
      {state.queuers !== null &&
        <div class={`queue list flex flex-column mw6 w-100 center pb4 pt4`}>
          {state.queuers.map((queuer, index) => (
            <div onclick={() => actions.toggleModal(queuer)} class="pointer">
              {!queuer.end &&
                <div class={`flex flex-row ph4 mv2 ${queuer.seated ? 'bg-light-blue' : 'bg-white'} shadow-1 br2 items-center`}>
                  <h4 class="index avenir black fw5 f4 w3 counter"></h4>
                  <h4 class="name avenir black fw3 f4 w5">{queuer.name}</h4>
                  <h4 class="name avenir black fw4 f4 w3 pv3 ml-auto tc">{queuer.party_size}</h4>
                  {/*<h4 class="avenir black fw4 f5 ph2 pv3">12min</h4>*/}
                </div>
              }
            </div>
          ))}
        </div>
      }
      <AddButton id="add-button" isOpen={state.isModalOpen} toggleModal={actions.toggleModal} />
      <Modal
        isOpen={state.isModalOpen}
        isNewModal={state.isNewModalOpen}
        toggleModal={actions.toggleModal}
        title={state.name}
        name={state.name}
        onNameChange={actions.setName}
        party={state.party}
        onPartyChange={actions.setParty}
        number={state.number}
        onNumberChange={actions.setNumber}
        notes={state.notes}
        onNotesChange={actions.setNotes}
        onButtonClick={state.isNewModalOpen ? actions.saveQueuer : actions.updateQueuer}
        onSeatClick={actions.seatQueuer}
        onRemoveClick={actions.removeQueuer}
      />
    </section>
  </main>
)

const main = app(state, actions, view, document.body)
