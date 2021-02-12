// @ts-ignore

import React, { useState } from 'react'
import './style.css'
// import '../../App.css'
import Table from '../table'

const Autocomplete = ({ data }: { data: any }) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [userInput, setUserInput] = useState<any>()
  const [filtered, setFiltered] = useState<any[]>(data)
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0)

  React.useEffect(() => {
    setFiltered(data)
  }, [data])

  const cmp = (row: string, text: string) => {
    console.log(`cmp: ${row} to ${text}`)

    const r = row.toLocaleLowerCase().indexOf(text) > -1
    console.log('answer comp', r)
    return r
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setUserInput(text)
    console.log('bryan data filtered', data)
    const filtered = data.filter((row: any) => {
      return cmp(row.name, text)
    })
    setFiltered(filtered)
    setActiveSuggestion(0)
  }

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

  const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.currentTarget.focus()
    console.log('index', e.currentTarget.childNodes[1].textContent)
    let parts = { name: e.currentTarget.childNodes[1].textContent }
    setActiveSuggestion(0)
    // setFiltered([parts])
    setUserInput(e.currentTarget.childNodes[1].textContent)
  }
  console.log('bryan final filterted', filtered)
  return (
    <div className='autocomplete'>
      <input
        ref={inputRef}
        type='text'
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput || ''}
      />

      <ul>
        <div onKeyDown={(e: any) => onKeyDown(e)}>
          <Table
            handleKeyDown={onKeyDown}
            handleClick={(e: any) => onClick(e)}
            parts={filtered}
          />
        </div>
      </ul>
    </div>
  )
}

export default Autocomplete
