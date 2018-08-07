import { h } from 'hyperapp'

const Modal = ({
  isOpen = false,
  title = 'Title',
  timeWaiting = null,
  status = null,
  name = false,
  onNameChange,
  party = false,
  onPartyChange,
  number = false,
  onNumberChange,
  notes = false,
  onNotesChange,
  color = 'green',
  buttonTitle = 'Save',
  onButtonClick,
  toggleModal,
}) => (
  <section
    class={`
      ${isOpen ? 'o-100' : 'o-0'}
      modal w-100 h-100 bg-white-80
      fixed z-1 flex flex-column
      justify-center items-center
    `}
  >
    <div class={`
        ${isOpen ? 'translate-100' : 'translate-0'}
        form-wrap mw7 w-100 center
        bg-white br2 relative top-0
        left-0 ph5 pt4 pb5 z-2 shadow-1
      `}
    >
      <h1 class="avenir fw5 f2 tracked mb0">{title}</h1>
      <div class="meta mb3 flex flex-row">
        {timeWaiting !== null &&
          <p class="time avenir f5 fw2"></p>
        }
        {status !== null &&
          <p class="status avenir f5 fw3"></p>
        }
      </div>
      <form>
        <label for="name" class="ttu avenir f6 fw2">Name</label>
        <input name="name" class="ba b--light-gray pa2 br2 mb3 db w-100 avenir f4" type="text" value={name || ''} />
        <label for="party" class="ttu avenir f6 fw2">Party of</label>
        <input name="party" class="ba b--light-gray pa2 br2 mb3 db w-100 avenir f4" type="text" value={party || ''} />
        <label for="number" class="ttu avenir f6 fw2">Phone Number</label>
        <input name="number" class="ba b--light-gray pa2 mb3 br2 w-100 avenir f4" type="text" value={number || ''} />
        <label for="notes" class="ttu avenir f6 fw2">Notes</label>
        <textarea name="notes" class="ba b--light-gray pa2 br2 db w-100 h4 avenir f4">{notes || ''}</textarea>
        <button
          onclick={(e) => {
            e.preventDefault()
            onButtonClick()
          }}
          class={`dim dib pv4 lh-0 bn bg-${color} br2 white ttu tracked f4 fw6 w-100 mt4`}
        >
          {buttonTitle}
        </button>
      </form>
    </div>
  </section>
)

export default Modal
