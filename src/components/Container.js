import { h } from 'hyperapp'
import picostyle from 'picostyle'
const style = picostyle(h)

const Container = style('section')({
  'display'        : 'flex',
  'flex-direction' : 'column',
  'width'          : '100%',
  'max-width'      : '32rem',
  'margin-left'    : 'auto',
  'margin-right'   : 'auto',
  'padding-left'   : '100px',
  'padding-top'    : '2rem',
  'padding-bottom' : '2rem',
})

export default Container
