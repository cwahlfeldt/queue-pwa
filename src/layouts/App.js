import { h } from 'hyperapp'
import { Route } from "@hyperapp/router"
import Home from '../routes/Home'
import Settings from '../routes/Settings'
import Nav from '../components/Nav'
import AddButton from '../components/AddButton'
import Modal from '../components/Modal'
import Toast from '../components/Toast'

const App = (
  state,
  actions,
) => (
  <main
    oncreate={actions.init}
    class="app vw-100 h-100 bg-light-grey"
  >
    {state.isLoggedIn &&
      <section class="main-nav fixed w-auto-ns z1">
        <Nav
          onLogOut={actions.logout}
          onSettings={actions.settings}
          onHome={actions.home}
        />
        <Toast show={state.showToast} title={state.toastTitle} message={state.toastMessage} type={state.toastType} />
        <div style={{height: '21px'}} class="bg-black-20 fixed top-0 left-0 w-100"></div>
      </section>
    }

    {!state.isLoggedIn &&
      <section
        class="logged-out w-100 login flex flex-column justify-center items-center vh-100 w-100 center"
        style={{maxWidth: '400px', marginTop: '-50px'}}
      >
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
      <AddButton
        id="add-button"
        goHome={actions.home}
        isOpen={state.isModalOpen}
        toggleModal={actions.toggleModal}
      />
    }

    {state.isLoggedIn &&
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
        onButtonClick={
          state.isNewModalOpen ? actions.saveQueuer : actions.updateQueuer
        }
        onSeatClick={actions.seatQueuer}
        onTextClick={actions.onTextQueuer}
        onRemoveClick={actions.removeQueuer}
      />
    }

    {state.isLoggedIn &&
      <Route path="/" render={() => (<Home state={state} actions={actions} />)} />
    }
    {state.isLoggedIn &&
      <Route path="/settings" render={() => (<Settings state={state} actions={actions} />)} />
    }
  </main>
)

export default App
