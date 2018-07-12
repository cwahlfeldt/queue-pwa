import { h } from 'hyperapp'

const Nav = () => (
  <nav class="vh-100 sticky flex flex-column justify-between">
    <h1 class="branding f-5 fw3 avenir green tracked lh-solid pa4">Q</h1>
    <div class="menu flex flex-column pb4 br1 b--green">
      <a class="green avenir f6 ttu fw5 ph4 pv3 link dim" href="#">Dashboard</a>
      <a class="green avenir f6 ttu fw5 ph4 pv3 link dim" href="#">Branding</a>
      <a class="green avenir f6 ttu fw5 ph4 pv3 link dim" href="#">Account</a>
      <a class="green avenir f6 ttu fw5 ph4 pt3 link dim" href="#">Payment</a>
    </div>
  </nav>
)

export default Nav
