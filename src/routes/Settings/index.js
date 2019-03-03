import { h } from 'hyperapp'


const Settings = ({
  state,
  actions,
}) => (
  <section
    class="settings queue list flex flex-column mw6 w-100 center pb4 pt4"
    oncreate={() => {
      paypal.Buttons().render('#paypal-subscribe')
    }}
  >
    <p className="sans font-black-80 mt2 pb3 center">Ipsum nostrum adipisci assumenda quisquam repellendus quo Consequuntur facere odit pariatur totam deserunt, doloribus. Vitae veritatis delectus quam nesciunt totam. Laudantium placeat aperiam ad neque fuga. Earum soluta praesentium odit</p>
    <div id="paypal-subscribe"></div>
  </section>
)

export default Settings
