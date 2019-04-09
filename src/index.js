//
// main app file

import { h, app } from 'hyperapp'
import { actions, state } from './lib/state'
import App from './layouts/App'
import { location } from '@hyperapp/router'
import 'tachyons-custom'
import './lib/style.css'
import './lib/vars.css'
import './lib/tailwind.css'

const main = app(
  state,
  actions,
  App,
  document.body
)

const unsubscribe = location.subscribe(main.location)
