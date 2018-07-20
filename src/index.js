import { h, app } from 'hyperapp'
import { queuers } from './mockdata.yml'
import Nav from './components/Nav'
import moment from 'moment'

import 'tachyons-custom'
import './style.css'
import './vars.css'

const data = queuers

const state = {
  queuers: null,
  waitingTimes: [],
}

const actions = {
  setQueuers: state => ({queuers: data}),
  startTimers: (time, index) => (state, actions) => {
    setInterval(actions.setTime(time, index), 1000)
  },
}

const renderQueue = (queuers) => (
  queuers.map((queuer, index) => (
    <div>
      {queuer.end === null &&
        <div class="flex flex-row ph4 pv3 mv2 bg-white shadow-1">
          <h4 class="index avenir black fw5 f4 w3 counter"></h4>
          <h4 class="name avenir black fw3 f4 w5">{queuer.name}</h4>
          <h4 class="name avenir green fw4 f4 w3">{queuer.party_size}</h4>
          <h4 class="avenir black fw4 f4"></h4>
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
    class="vw-100 h-100 bg-light-gray"
  >
    <div class="outer flex flex-row counter-reset">
      <Nav />
      {state.queuers !== null &&
        <div class="queue list flex flex-column mw6 w-100 center pb4 pt4">
          {renderQueue(state.queuers)}
        </div>
      }
    </div>
  </main>
)

app(state, actions, view, document.body)
