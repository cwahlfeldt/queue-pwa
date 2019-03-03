import {h} from 'hyperapp';

const AddButton = ({
  isOpen,
  toggleModal,
  goHome,
  id
}) => (
  <button
    id={id}
    onclick={() => {
      goHome()
      toggleModal()
    }}
    class={`
      ${isOpen ? 'rotate-45' : 'rotate-90'}
      add-button button-reset
      z-3 bg-green fixed bottom-0 right-0
      br-100 white aktiv pa3 lh- ma4 f2 fw5 w3
      dib shadow-1
    `}>
    <span class="dib">&#43;</span>
  </button>
);

export default AddButton;
