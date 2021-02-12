// @ts-ignore

import React, { useState } from 'react'
import './style.css'
// import '../../App.css'
import Table from '../table'

const Autocomplete = ({
  data,
  userInput,
  onChange,
}: {
  data: any
  userInput: any
  onChange: any
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  // const [userInput, setUserInput] = useState<any>()
  const [filtered, setFiltered] = useState<any[]>(data)
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0)

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (null !== inputRef.current) {
        // h1Ref.current.innerText = 'Hello world!'
        console.log('bryan ref', inputRef.current.value) // { current: <h1_object> }
        let parts = { name: inputRef.current.value }
        setFiltered([parts])
      } else {
      }

      // console.log('ref', inputRef.current.value)
      // setUserInput(filtered[activeSuggestion])
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (activeSuggestion === 0) {
        return
      }
      setActiveSuggestion(activeSuggestion - 1)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      // console.log(`Active ${activeSuggestion} Length: ${filtered.length}`)
      if (activeSuggestion + 1 === filtered.length) {
        return
      }
      setActiveSuggestion(activeSuggestion + 1)
    }
  }

  return (
    <div className='autocomplete'>
      <input
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
