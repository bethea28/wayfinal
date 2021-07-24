import * as React from 'react'
import './style.css'

type AutocompleteProps = {
  data: Array<{
    id: number
    name: string
    price: string
    stock: boolean
    instock: number
  }>
  userInput: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: { which: number }) => void
  inputRef: React.RefObject<HTMLInputElement>
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  data,
  userInput,
  onChange,
  onKeyDown,
  inputRef,
}) => {
  console.log('data', data)
  console.log('userinput', userInput)
  console.log('inputRef', inputRef)

  return (
    <div className='autocomplete'>
      <input
        className='input'
        ref={inputRef}
        type='text'
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />
    </div>
  )
}

export default Autocomplete
