//
// The add button component is broken into 2 components
import { h } from 'hyperapp'
import picostyle from 'picostyle'

const style = picostyle(h)

const X = style(`div`)({
  'font-size': '55px',
  'margin-top': `-3px`,
  'line-height': `${ square }px`,
})

const square = 65
export const Button = style(`button`)({
  width: `${ square }px`,
  height: `${ square }px`,
  bottom: `15px`, right: `15px`,
})

const AddButton = ({
  isOpen,
  toggleModal,
  goHome,
  id
}) => (
  <Button
    id={id}
    onclick={() => {
      goHome()
      toggleModal()
    }}
    class={`
      ${isOpen ? 'rotate-45 bg-red' : 'bg-green rotate-90'}
      add-button button-reset
      z-3 fixed font-light
      br-100 white aktiv
      shadow-1
    `}>
    <X>&#43;</X>
  </Button>
);

export default AddButton;
