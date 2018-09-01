import { h } from 'hyperapp'

const Modal = ({
  isOpen = false,
  title = 'Add New',
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
  buttonTitle = 'Update',
  onButtonClick,
  toggleModal,
  isNewModal,
  onSeatClick,
  onRemoveClick,
  onTextClick,
}) => (
  <section
    id="modal"
    class={`
      ${isOpen ? 'o-100 vis-v' : 'o-0 vis-h'}
      modal w-100 h-100
      fixed z-1 flex flex-column
      justify items-center
    `}
  >
    <div
      onclick={toggleModal}
      class={`
        bg-black-70 absolute w-100 h-100 z-1
      `}>
    </div>
    <div
      class={`
        ${isOpen ? 'translate-100' : 'translate-0'}
        form-wrap mw7 w-100 center
        bg-white br2 relative top-0
        left-0 ph5 pt4 mt5 pb5 z-2 shadow-1
      `}
    >
      {isNewModal &&
        <h1 class="avenir fw5 f2 tracked mb0">{title || 'Add New'}</h1>
      }
      {!isNewModal &&
        <h1 class="avenir fw5 f2 tracked mb0">{title || 'Edit'}</h1>
      }
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
        <input autocomplete="off" tabindex="1" name="name" class="ba b--light-gray pa2 br2 mb3 db w-100 avenir f4" oninput={onNameChange} type="text" value={name || ''} />
        <label for="party" class="ttu avenir f6 fw2">Party of</label>
        <input autocomplete="off" tabindex="2" name="party" class="ba b--light-gray pa2 br2 mb3 db w-100 avenir f4" oninput={onPartyChange} type="tel" value={party || ''} />
        <label for="number" class="ttu avenir f6 fw2">Phone Number</label>
        <input autocomplete="off" tabindex="3" name="number" class="ba b--light-gray pa2 mb3 br2 w-100 avenir f4" oninput={onNumberChange} type="tel" value={number || ''} />
        <label for="notes" class="ttu avenir f6 fw2">Notes</label>
        <textarea autocomplete="off" tabindex="4" name="notes" class="ba b--light-gray pa2 br2 db w-100 h4 avenir f4" oninput={onNotesChange} value={notes || ''}></textarea>
        {!isNewModal &&
          <div class="flex flex-row">
            <button
              tabindex="5"
              onclick={(e) => {
                e.preventDefault()
                toggleModal('')
                onButtonClick()
              }}
              class={`dim dib pv4 lh-0 bn bg-yellow br2 br--left white ttu tracked f4 fw6 w-100 mt4`}
            >
              {buttonTitle}
            </button>
            <button
              onclick={(e) => {
                e.preventDefault()
                toggleModal('')
                onTextClick()
              }}
              class={`dim dib pv4 lh-0 bn bg-light-blue white ttu tracked f4 fw6 w-100 mt4`}
            >
              Text
            </button>
            <button
              onclick={(e) => {
                e.preventDefault()
                toggleModal('')
                onSeatClick()
              }}
              class={`dim dib pv4 lh-0 bn bg-green white ttu tracked f4 fw6 w-100 mt4`}
            >
              Seat
            </button>
            <button
              onclick={(e) => {
                e.preventDefault()
                toggleModal('')
                onRemoveClick()
              }}
              class={`dim dib pv4 lh-0 bn bg-red br2 br--right white ttu tracked f4 fw6 w-100 mt4`}
            >
              Remove
            </button>
          </div>
        }
        {isNewModal &&
          <button
            tabindex="5"
            onclick={(e) => {
              e.preventDefault()
              toggleModal('')
              onButtonClick()
            }}
            class={`dim dib pv4 lh-0 bn bg-${color} br2 white ttu tracked f4 fw6 w-100 mt4`}
          >
            Create
          </button>
        }
      </form>
    </div>
  </section>
)

export default Modal
