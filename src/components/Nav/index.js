import { h } from 'hyperapp'

const Nav = ({
  onLogOut,
}) => (
  <nav class="vh-100 sticky flex flex-column justify-between">
    <h1 class="branding f-5 fw3 avenir green tracked lh-solid pa4">Q</h1>
    <div class="menu flex flex-column pb4 br1 b--green">
      <a class="green avenir f6 ttu fw5 ph4 pv3 link dim" href="#">Dashboard</a>
      {/*<a class="green avenir f6 ttu fw5 ph4 pv3 link dim strike" disabled href="#">Auto Queue</a>*/}
      {/*<a class="green avenir f6 ttu fw5 ph4 pv3 link dim strike" disabled href="#">Settings</a>*/}
      <a
        class="green pointer avenir f6 ttu fw5 ph4 pt3 link dim"
        href="#"
        onclick={(e) => {
          e.preventDefault()
          onLogOut()
        }}
      >
        Logout
      </a>
    </div>
  </nav>
)

export default Nav
