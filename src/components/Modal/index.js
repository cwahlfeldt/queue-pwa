import { h } from 'hyperapp'

const Modal = ({
  isOpen,
  name = false,
  onNameChange,
  party = false,
  onPartyChange,
  number = false,
  onNumberChange,
  notes = false,
  onNotesChange,
  color = 'green',
  buttonTitle = 'Button Title',
  onButtonClick,
}) => (
  <section
    class={`
      ${isOpen ? 'vis-s' : 'vis-h'}
      modal w-100 h-100 bg-black-80
      fixed z-0 flex flex-column
      justify-center items-center
    `}
  >
    <div class="mw7 w-100 center bg-white br2 relative top-0 left-0 pa5 z1">
      <form>
        <label for="name" class="ttu avenir f6 fw2">Name</label>
        <input name="name" class="pa2 mb3 db w-100 avenir f4" type="text" value={name || ''} />
        <label for="party" class="ttu avenir f6 fw2">Party of</label>
        <input name="party" class="pa2 mb3 db w-100 avenir f4" type="text" value={party} />
        <label for="number" class="ttu avenir f6 fw2">Phone Number</label>
        <input name="number" class="pa2 mb3 w-100 avenir f4" type="text" value={number} />
        <label for="notes" class="ttu avenir f6 fw2">Notes</label>
        <textarea nam="notes" class="b--light-gray pa2 db w-100 h4 avenir f4">{notes}</textarea>
        <button
          onclick={onButtonClick}
          class={`dim dib pa3 lh-0 bn bg-${color} br2 white ttu f5 tracked w-100 mt4`}
        >
          {buttonTitle}
        </button>
      </form>
    </div>
  </section>
)

export default Modal
