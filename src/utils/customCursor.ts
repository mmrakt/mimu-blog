import CustomCursor from 'custom-cursor.js'

const customCursor = () => {
  const options = {
    hideTrueCursor: false,
    focusElements: ['a', 'button'],
    focusClass: 'cursor--focused',
  }
  const element = '.cursor'
  const customCursor = new CustomCursor(element, options)
}

export default customCursor
