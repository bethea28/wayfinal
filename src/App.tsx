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

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch('http://localhost:8000/parts')
      const data = await resp.json()
      const myData: PartType[] = data
      setParts(myData)
    }
    fetchData()
  }, [])
  console.log('parts app index', parts)
  // const handleClick = (index: any) => {
  //   console.log('handle', index)
  // }
  return (
    <div className='App'>
      Search: <Autocomplete data={parts} />
      {/* Search: <Autocomplete data={parts.map((p) => p)} /> */}
      {/* <Table parts={parts} /> */}
    </div>
  )
}

export default App
