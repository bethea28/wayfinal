import React, { useEffect, useState } from 'react'
import './App.css'
import Autocomplete from './components/autocomplete'
import Table from './components/table'
interface PartType {
  id: number
  name: string
  price: string
  instock: number
}

function App() {
  const [parts, setParts] = useState<PartType[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [userInput, setUserInput] = useState<any>()
  const [filtered, setFiltered] = useState<any[]>([])
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0)

  const cmp = (row: string, text: string) => {
    console.log(`cmp: ${row} to ${text}`)

    const r = row.toLocaleLowerCase().indexOf(text) > -1
    console.log('answer comp', r)
    return r
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handle change', e)
    const text = e.target.value
    setUserInput(text)
    const filtered = parts.filter((row: any) => {
      return cmp(row.name, text)
    })
    setFiltered(filtered)
    console.log('bryan data filtered', filtered)
    // setActiveSuggestion(0)
  }

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.currentTarget.focus()
    console.log('index chris', e.currentTarget.childNodes[1].textContent)
    let parts = { name: e.currentTarget.childNodes[1].textContent }
    setActiveSuggestion(0)
    setFiltered([parts])
    setUserInput(e.currentTarget.childNodes[1].textContent)
  }
  const handleKeyDown = () => {
    console.log('keydown')
  }
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch('http://localhost:8000/parts')
      const data = await resp.json()
      const myData: PartType[] = data

      setParts(myData)
      setFiltered(myData)
    }
    fetchData()
  }, [])
  console.log('parts app index', filtered)
  // const handleClick = (index: any) => {
  //   console.log('handle', index)
  // }
  return (
    <div className='App'>
      Search:{' '}
      <Autocomplete
        onChange={handleChange}
        userInput={userInput}
        data={parts}
      />
      {/* Search: <Autocomplete data={parts.map((p) => p)} /> */}
      <Table
        handleClick={handleClick}
        handleKeyDown={handleKeyDown}
        parts={filtered}
      />
    </div>
  )
}

export default App
