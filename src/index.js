//
// main app file

import { h, app } from 'hyperapp'
import { queuers } from './lib/mockdata.yml'
import Nav from './components/Nav'
import AddButton from './components/AddButton'
import Modal from './components/Modal'
import moment from 'moment'
import localforage from 'localforage'
import shortid from 'shortid'

import 'tachyons-custom'
import './lib/style.css'
import './lib/vars.css'

const DATA = queuers

  /*

            {
              id: shortid.generate(),
              name: 'Chris',
              party_size: 3,
              phone_number: '2178675309',
              notes: 'cool bro',
              entry: '2018-07-13T16:15:55.842Z',
              end: null,
              deleted: false,
              completed: false,
            }
            */

const state = {
  queuers: null,
  isNewModalOpen: true,
  isModalOpen: false,
  name: '',
  party: '',
  number: '',
  notes: '',
}

const actions = {
  // init for the entire apps data and or dom manipulations
  init: () => (state, actions) => {
    //actions.setQueuers(DATA)
    actions.fetchQueuers()
  },

  fetchQueuers: () => (state, actions) => {
    localforage.getItem('queuers')
    .then(val => {
      if (val === null) {
        localforage.setItem('queuers', [])
        .then(data => {
          console.log(data)
          actions.setQueuers(data)
        })
      } else {
        console.log(val)
        actions.setQueuers(val)
      }
    })
    .catch(err => {
      console.log(err)
    })
  },

  // TODO: set to real data
  setQueuers: data => state => ({queuers: data}),

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
  setCurrentQueuer: ({name, party_size, phone_number, notes}) => state => ({
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
          completed: false,
        },
      ]
    ).then(data => {
      actions.setQueuers(data)
      actions.nullifyFields()
    }).catch(err => {
      console.log(err)
      actions.nullifyFields()
    })
  },

  updateQueuer: () => {
    console.log('updating queuer')
  },

  removeQueuer: () => {
    console.log('remove queuer')
  },

  seatQueuer: () => {
    console.log('seat queuer')
  },

  nullifyFields: () => state => ({
    name: '',
    party: '',
    number: '',
    notes: '',
    currentQueuer: '',
  }),

  // all input setters
  setName: ({target}) => state => ({name: target.value.trim()}),
  setParty: ({target}) => state => ({party: target.value.trim()}),
  setNumber: ({target}) => state => ({number: target.value.trim()}),
  setNotes: ({target}) => state => ({notes: target.value}),
}

const renderQueue = (queuers, toggleModal) => (
  queuers.map((queuer, index) => (
    <div onclick={() => toggleModal(queuer)} class="pointer">
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
    <section class="outer flex flex-row counter-reset">
      <Nav />
      {state.queuers !== null &&
        <div class={`queue list flex flex-column mw6 w-100 center pb4 pt4`}>
          {state.queuers.map((queuer, index) => (
            <div onclick={() => actions.toggleModal(queuer)} class="pointer">
              {!queuer.end &&
                <div class="flex flex-row ph4 mv2 bg-white shadow-1 br2 items-center">
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
