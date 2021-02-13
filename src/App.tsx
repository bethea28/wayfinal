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
  const ref = React.useRef('bryan')
  const [parts, setParts] = useState<PartType[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [userInput, setUserInput] = useState<any>()
  const [filtered, setFiltered] = useState<any[]>([''])
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0)
  const [elRefs, setElRefs] = React.useState([])
  const [allRows, setRows] = React.useState(document.getElementsByTagName('tr'))
  const [allCells, setCells] = React.useState(
    document.getElementsByTagName('td')
  )
  const [index, setIndex] = React.useState(1)

  let usernameRefs = React.useRef<any>([''])
  let tableRef = React.useRef<any>('')
  // let allrows = document.getElementsByTagName('tr')

  useEffect(() => {
    // allCells[0].style.backgroundColor = 'yellow'
    // allRows[index].style.backgroundColor = 'yellow'
    for (let i = 0; i < allRows.length; i++) {
      if (index === i + 1) {
        console.log('dinky')
        allRows[i].style.backgroundColor = 'yellow'
        // allRows[index].style.backgroundColor = 'yellow'
      }
      if (index !== i + 1) {
        allRows[i].style.backgroundColor = ''
      }
    }
    // allCells[0].style.backgroundColor = 'yellow'

    // allCells[0].focus()
    const fetchData = async () => {
      const resp = await fetch('http://localhost:8000/parts')
      const data = await resp.json()
      const myData: PartType[] = data

      setParts(myData)
      setFiltered(myData)
    }
    fetchData()
    // allRows[3].style.backgroundColor = allRows[3] ? 'red' : 'blue'
    // allRows[3]?.style.backgroundColor = 'blue'
  }, [allRows, index])
  // allRows[0] && allRows[0].style.backgroundColor = 'red'
  // console.log('sandy', allRows[0].innerHTML)
  allRows[0] && allRows[0].focus()
  // allCells[0].style.backgroundColor = 'yellow'

  allCells[0] && allCells[0].focus()
  const current = filtered?.map(
    (ref, index) => (usernameRefs.current[index] = React.createRef())
  )
  const cmp = (row: string, text: string) => {
    console.log(`cmp: ${row} to ${text}`)

    const r = row.toLocaleLowerCase().indexOf(text) > -1
    console.log('answer comp', r)
    return r
  }
  const reffed = () => {
    console.log('set refs dude')
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

  const handleClick = (
    index: any,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    // let allrows = document.getE
    setIndex(index + 2)
    allRows[0].focus()
    console.log('input ref danny', inputRef)
    inputRef.current !== null && inputRef.current.focus()
    // console.log('event bry', inp)
    // inputs[0].focus()
    // tableRef[index].current.scrollIntoView()
    // console.log('reffy', usernameRefs)
    // console.log('bryan currrent ', current[index])
    // current[index]
    // // current[1] && current[1].current.focus()
    // console.log('focus target', e.currentTarget)
    // // e.currentTarget.focus()
    // console.log('index chris', e.currentTarget.childNodes[1].textContent)
    let parts = { name: e.currentTarget.childNodes[1].textContent }
    // setActiveSuggestion(0)
    // setFiltered([parts])
    setUserInput(e.currentTarget.childNodes[1].textContent)
  }

  const handleMouseEnter = (e: any, index: number) => {
    console.log('bryan hover', [index])
    e.currentTarget.style.background = 'red'
    console.log('e target', e.currentTarget.childNodes)
  }
  const handleMouseLeave = (e: any, index: number) => {
    e.currentTarget.style.background = ''
  }

  const handleKeyDown = (e: any) => {
    let allrows = document.getElementsByClassName('table-rows')

    console.log('keydown', e.which)

    if (e.which === 40) {
      console.log('thirty')

      setIndex((prevState) => prevState + 1)
      // allrows.forEach((a) => {
      //   console.log(a)
      // })
      // let find = allrows.find((a) => {
      //   return a.outerText.includes(userInput)
      // })
    } else if (e.which === 38) {
      setIndex((prevState) => prevState - 1)
    } else if (e.which === 13) {
      let inputValue = allRows[index - 1].childNodes[1].textContent
      let parts = { name: inputValue }
      setFiltered([parts])
      setUserInput(inputValue)
      console.log('enter', allRows[index - 1].childNodes[1].textContent)
      // allCells[index-1]
    }
  }

  console.log('parts app index', filtered)
  // const handleClick = (index: any) => {
  //   console.log('handle', index)
  // }
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
