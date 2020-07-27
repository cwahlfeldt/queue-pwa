//
// main app file
import 'regenerator-runtime/runtime'
require('dotenv').config()
import { h, app } from 'hyperapp' // whats the fucking shit @TODO
import { actions, state } from './lib/state'
import App from './layouts/App'
import { location } from '@hyperapp/router'
import 'tachyons-custom'
import './lib/style.css'
import './lib/vars.css'
import './lib/tailwind.css'

// main app....duh
const main = app(
  state,
  actions,
  App,
  document.body
)

const unsubscribe = location.subscribe(main.location)

// unsubscribe from dat ish
window.onbeforeunload = function() {
  unsubscribe()
}
