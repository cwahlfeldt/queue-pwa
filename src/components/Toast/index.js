import { h } from 'hyperapp'

const Toast = ({
  show,
  title,
  message,
  type,
}) => (
  <section
    style={{width: '200px', marginTop: '150px'}}
    class={`
      ${type === 'success' ? 'bg-green' : type === 'error' ? 'bg-red' : 'bg-orange'}
      ${show ? 'anim-in' : 'anim-out'}
      toast fixed left-0 top-0 ph4 br--right mt5 shadow-1 z-5 lh-copy pv3 br2 flex-column
    `}
  >
    <h4 class="title white ttu avenir tracked fw5 f7">{ title }</h4>
    <p class="mv0 avenir fw3 f7 white ttu">{ message }</p>
  </section>
)

export default Toast
