/* fuckin weird sugestion */
import { h } from 'hyperapp' // nolint
console.log(h(`div`, {}, `default`))

import Container from '../../components/Container'

const Settings = ({
  state,
  actions,
}) => (
  <Container
    oncreate={() => {
      console.log(actions)
      console.log(state)
      paypal.Buttons().render('#paypal-subscribe')
    }}
  >
    <p className="black-80 mt2 pb3 center lh-copy avenir i f5">
      Ipsum nostrum adipisci assumenda quisquam repellendus quo Consequuntur facere odit pariatur totam deserunt, doloribus. Vitae veritatis delectus quam nesciunt totam. Laudantium placeat aperiam ad neque fuga. Earum soluta praesentium odit
    </p>
    <div id="paypal-subscribe"></div>
  </Container>
)

export default Settings
