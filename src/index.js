import { h, app } from 'hyperapp'
import { queuers } from './mockdata.yml'
import Nav from './components/Nav'
import moment from 'moment'

import './style.css'
import 'tachyons-custom'
import './vars.css'

const time = moment().toISOString();

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
  setTime
}

const renderQueue = (queuers) => (
  queuers.map((queuer, index) => (
    <div class="flex flex-row ph4 pv3 mv2 bg-white shadow-1">
      <h4 class="index avenir black fw5 f4 w3">{index + 1}</h4>
      <h4 class="name avenir black fw3 f4 w5">{queuer.name}</h4>
      <h4 class="name avenir green fw4 f4 w3">{queuer.party_size}</h4>
      <h4 class="avenir black fw4 f4"></h4>
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
    <div class="outer flex flex-row">
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
