import { h, app } from 'hyperapp'
import { queuers } from './mockdata.yml'
import Nav from './components/Nav'

import './style.css'
import 'tachyons-custom'

const data = queuers

const state = {
  queuers: null,
}

const actions = {
  setQueuers: state => ({queuers: data})
}

const renderQueue = (queuers) => (
  queuers.map((queuer, index) => (
    <div class="flex flex-row">
      <h4 class="name avenir black fw5 f4">{index + 1}</h4>
      <h4 class="name avenir black fw3 f4">{queuer.name}</h4>
      <h4 class="name avenir green fw4 f4">{queuer.party_size}</h4>
    </div>
  ))
)

const view = (state, actions) => (
  <main
    oncreate={() => actions.setQueuers()}
    class="vw-100 h-100 bg-light-gray"
  >
    <div class="outer flex flex-row">
      <Nav />
      {state.queuers !== null &&
        <div class="queue list flex flex-column mw6 w-100">
          {renderQueue(state.queuers)}
        </div>
      }
    </div>
  </main>
)

app(state, actions, view, document.body)
