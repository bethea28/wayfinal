import React, { useEffect, useState } from 'react'
import './App.css'
import Autocomplete from './components/autocomplete'
import Table from './components/table'

type PartType = {
  id: number
  name: string
  price: string
  instock: number
  stock: boolean
}

function App() {
  const [parts, setParts] = useState<PartType[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [userInput, setUserInput] = useState<any>()
  const [filtered, setFiltered] = useState<any[]>([''])
  const [allRows, setRows] = React.useState(
    document.getElementsByClassName('table-rows')
  )
  const [allCells, setCells] = React.useState(
    document.getElementsByTagName('td')
  )
  const [index, setIndex] = React.useState(1)

  let usernameRefs = React.useRef<any>([''])
  let tableRef = React.useRef<any>('')

  useEffect(() => {
    for (let i = 0; i < allRows.length; i++) {
      console.log('all index', allRows[i])
      console.log('main index', index)
      console.log('main I', i)
      if (Number(index) !== Number(i)) {
        allRows[i].setAttribute('style', 'background-color: ;')
      } else if (Number(index) === Number(i)) {
        allRows[index] &&
          allRows[index].setAttribute('style', 'background-color:blue ;')
      }
    }

    const fetchData = async () => {
      const resp = await fetch('http://localhost:8000/parts')
      const data = await resp.json()
      const myData: PartType[] = data

      setParts(myData)
      setFiltered(myData)
    }
    fetchData()
  }, [index, allRows])

  allCells[0] && allCells[0].focus()
  const current = filtered?.map(
    (ref, index) => (usernameRefs.current[index] = React.createRef())
  )
  const cmp = (row: string, text: string) => {
    const r = row.toLocaleLowerCase().indexOf(text) > -1
    return r
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setUserInput(text)
    const filtered = parts.filter((row: any) => {
      return cmp(row.name, text)
    })
    setFiltered(filtered)
  }

  const handleClick = (
    index: any,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setIndex(index)
    inputRef.current !== null && inputRef.current.focus()

    setUserInput(e.currentTarget.childNodes[1].textContent)
  }

  const handleMouseEnter = (e: any, index: number) => {
    e.currentTarget.style.background = 'red'
  }
  const handleMouseLeave = (e: any, index: number) => {
    e.currentTarget.style.background = ''
  }

  const handleKeyDown = (e: { which: number }) => {
    let inputValue
    if (e.which === 40) {
      setIndex((prevState) => prevState + 1)

      inputValue =
        allRows[index + 1] && allRows[index + 1].childNodes[1].textContent
      setUserInput(inputValue)
    } else if (e.which === 38) {
      setIndex((prevState) => prevState - 1)
      inputValue =
        allRows[index - 1] && allRows[index - 1].childNodes[1].textContent
      allRows[index + 1] && setUserInput(inputValue)
    } else if (e.which === 13) {
      let inputValue = allRows[index].childNodes[1].textContent
      let parts = { name: inputValue }
      setFiltered([parts])
      setUserInput(inputValue)
    }
  }

  return (
    <div className='App'>
      Search:{' '}
      <Autocomplete
        inputRef={inputRef}
        onChange={handleChange}
        userInput={userInput}
        onKeyDown={handleKeyDown}
        data={parts}
      />
      <Table
        reffed={current}
        tableRef={tableRef}
        handleClick={(index: any, e: any) => handleClick(index, e)}
        handleKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        parts={filtered}
      />
    </div>
  )
}

export default App
