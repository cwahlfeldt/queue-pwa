//
// main app file

import { h, app } from 'hyperapp'
import { actions, state } from './lib/state'
import App from './layouts/App'
import 'tachyons-custom'
import './lib/style.css'
import './lib/vars.css'

const main = app(
  state,
  actions,
  App,
  document.body
)

//const unsubscribe = location.subscribe(main.location)
