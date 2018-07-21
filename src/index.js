import { h, app } from 'hyperapp'
import { queuers } from './lib/mockdata.yml'
import Nav from './components/Nav'
import moment from 'moment'

import 'tachyons-custom'
import './lib/style.css'
import './lib/vars.css'

const data = queuers

const state = {
  queuers: null,
  openModal: false,
}

const actions = {
  setQueuers: state => ({queuers: data}),
  toggleModal: state => ({openModal: !state.openModal}),
}

const renderQueue = (queuers) => (
  queuers.map((queuer, index) => (
    <div>
      {queuer.end === null &&
        <div class="flex flex-row ph4 mv2 bg-white shadow-1 br2 items-center">
          <h4 class="index avenir black fw5 f4 w3 counter"></h4>
          <h4 class="name avenir black fw3 f4 w5">{queuer.name}</h4>
          <h4 class="name avenir black fw4 f4 w3 ph2 pv3">{queuer.party_size}</h4>
          <h4 class="avenir black fw4 f5 ph2 pv3">12min</h4>
        </div>
      }
    </div>
  ))
)

const view = (state, actions) => (
  <main
    oncreate={() => {
      actions.setQueuers()
    }}
    class="vw-100 h-100 bg-light-gray pr5"
  >
    <div class="outer flex flex-row counter-reset">
      <Nav />
      {state.queuers !== null &&
        <div class="queue list flex flex-column mw6 w-100 center pb4 pt4">
          {renderQueue(state.queuers)}
        </div>
      }
      <button class="add-button dim link button-reset bg-green fixed bottom-0 right-0 br-100 white aktiv pa3 lh- ma4 f2 w3 dib shadow-1">&#43;</button>
    </div>
  </main>
)

const main = app(state, actions, view, document.body)
