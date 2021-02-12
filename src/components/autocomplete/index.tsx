import React, { useState } from 'react'
import './style.css'
// import '../../App.css'
import Table from '../table'

const Autocomplete = ({ data }: { data: any }) => {
  const inputRef = React.useRef(null)
  const [userInput, setUserInput] = useState<any>('')
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
      // console.log('ref', inputRef.value)
      // setUserInput(filtered[activeSuggestion])
      // setFiltered([])
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
    console.log('index', e.currentTarget.childNodes[1].textContent)
    let parts = { name: e.currentTarget.childNodes[1].textContent }
    setActiveSuggestion(0)
    setFiltered([parts])
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
      {/* <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Instock</th>
            <th>Low Stock</th>
            <th>Out Of Stock</th>
          </tr>
        </thead>
      </table> */}

      {/* <ul> */}
      <Table
        handleKeyDown={onKeyDown}
        handleClick={(e: any) => onClick(e)}
        parts={filtered}
      />
      {/* {filtered.length > 0 ? (
          filtered.map((row, idx) => {
            // console.log(`row ${row} - ${idx}`)
            return (
              <li
                className={
                  idx === activeSuggestion ? 'autocomplete-active' : ''
                }
                key={row}
                onClick={onClick}
              >
                {row}
              </li>
            )
          })
        ) : (
          <></>
        )} */}
      {/* {filtered.length > 0 ? (
          filtered.map((row, idx) => {
            // console.log(`row ${row} - ${idx}`)
            return (
              <li
                className={
                  idx === activeSuggestion ? 'autocomplete-active' : ''
                }
                key={row}
                onClick={onClick}
              >
                {row}
              </li>
            )
          })
        ) : (
          <></>
        )} */}
      {/* </ul> */}
    </div>
  )
}

export default Autocomplete
