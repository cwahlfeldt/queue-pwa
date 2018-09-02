//
// main app file

import { h, app } from 'hyperapp'
import { actions, state } from './lib/state'
import Nav from './components/Nav'
import AddButton from './components/AddButton'
import Modal from './components/Modal'
import Toast from './components/Toast'
import 'tachyons-custom'
import './lib/style.css'
import './lib/vars.css'

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
    class="vw-100 h-100 bg-light-gray"
  >
    <Toast show={state.showToast} title={state.toastTitle} message={state.toastMessage} type={state.toastType} />
    <div style={{height: '21px'}} class="bg-black-20 fixed top-0 left-0 w-100"></div>
    {!state.isLoggedIn &&
      <section style={{maxWidth: '400px', marginTop: '-50px'}} class="w-100 login flex flex-column justify-center items-center vh-100 w-100 center">
        <h1 class="f-5 fw3 avenir green lh-solid">Queue</h1>
        <input autocomplete="off" tabindex="1" name="email" class="ba b--light-gray pa2 br2 mb3 db w-100 avenir f4" placeholder="Email" oninput={actions.setEmail} type="email" value={state.email} />
        <input autocomplete="off" tabindex="2" name="password" class="ba b--light-gray pa2 br2 mb3 db w-100 avenir f4" placeholder="Password" oninput={actions.setPassword} type="password" value={state.password} />
        <h4
          tabindex="3"
          class="pointer green link dim f4 avenir fw3 tracked mt4"
          onclick={actions.login}
        >
          Log In
        </h4>
      </section>
    }
    {state.isLoggedIn &&
      <section class="app flex flex-row counter-reset pr5">
        <Nav
          onLogOut={actions.logout}
        />
        {state.queuers !== null &&
          <div style={{marginTop: '11px'}} class={`queue list flex flex-column mw6 w-100 center pb4 pt4`}>
            {state.queuers.map((queuer, index) => (
              <div onclick={() => actions.toggleModal(queuer)} class="pointer">
                {!queuer.end &&
                  <div class={`flex flex-row ph4 mv2 ${(queuer.texted && !queuer.seated) ? 'bg-lightest-blue' : queuer.seated ? 'bg-light-green' : 'bg-white'} shadow-1 br2 items-center`}>
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
          onTextClick={actions.onTextQueuer}
          onRemoveClick={actions.removeQueuer}
        />
      </section>
    }
  </main>
)

const main = app(state, actions, view, document.body)
