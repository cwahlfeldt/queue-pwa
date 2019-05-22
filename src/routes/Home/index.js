import { h } from 'hyperapp' // nolint
import Container from '../../components/Container'

const Home = ({ state, actions }) => (
  <section oncreate={actions.init} class="home vw-100 h-100 bg-light-gray">
    {state.isLoggedIn && (
      <section class="app flex flex-row counter-reset pt0">
        {state.queuers !== null && (
          <Container
            style={{marginTop: '11px'}}
          >
            {state.queuers.map(queuer => (
              <div onclick={() => actions.toggleModal(queuer)} class="pointer">
                {!queuer.end && (
                  <div
                    class={`flex flex-row ph4 mv2 ${
                      queuer.texted && !queuer.seated
                        ? 'bg-lightest-blue'
                        : queuer.seated
                        ? 'bg-light-green'
                        : 'bg-white'
                    } shadow-1 br2 items-center`}>
                    <h4 class="index avenir black fw5 f4 w3 counter" />
                    <h4 class="name avenir black fw3 f4 w5">{queuer.name}</h4>
                    <h4 class="name avenir black fw4 f4 w3 pv3 ml-auto pr4 tc">
                      {queuer.party_size}
                    </h4>
                    <button
                      onclick={() => {
                        actions.toggleModal(queuer)
                        actions.toast({
                          title: 'Beeeeeep Boop',
                          message: `coming soon!`,
                          type: 'success',
                        })
                      }}
                      style={{'background-color': `#666`, border: `2px solid #666`, 'border-radius': `100%`}} class="serif flex flex-row justify-center items-center w2 h2">
                      <h4
                        style={{
                          color: '#fff',
                          'font-size': `16px`,
                          'line-height': `16px`,
                        }}
                        class="name font-serif b fw4 f4 tc"
                      >
                        i
                      </h4>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </Container>
        )}
      </section>
    )}
  </section>
)

export default Home
