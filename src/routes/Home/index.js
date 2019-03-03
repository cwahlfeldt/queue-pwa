import { h } from 'hyperapp'
import AddButton from '../../components/AddButton'
import Modal from '../../components/Modal'

const Home = ({
  state,
  actions,
}) => (
  <section
    oncreate={actions.init}
    class="home vw-100 h-100 bg-light-gray"
  >
    {state.isLoggedIn &&
      <section class="app flex flex-row counter-reset">
        {state.queuers !== null &&
          <div style={{marginTop: '11px'}} class={`queue list flex flex-column mw6 w-100 center pb4 pt4`}>
            {state.queuers.map((queuer) => (
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
  </section>
)

export default Home
