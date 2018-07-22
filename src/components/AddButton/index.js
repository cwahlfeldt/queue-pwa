import { h } from 'hyperapp'

const AddButton = ({isOpen, toggleModal, onAddQueue}) => (
  <button
    onclick={() => toggleModal()}
    class={`
      ${isOpen ? 'rotate-45' : 'rotate-90'}
      add-button dim link button-reset
      z-1 bg-green fixed bottom-0 right-0
      br-100 white aktiv pa3 lh- ma4 f2 w3
      dib shadow-1
    `}
  >
    &#43;
  </button>
)

export default AddButton