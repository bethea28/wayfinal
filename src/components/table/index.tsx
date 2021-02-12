import React, { useState } from 'react'
// import './style.css'
// import './App.css'

interface PartType {
  id: number
  name: string
  price: string
  instock: number
}
const Table = ({
  parts,
  handleClick,
  handleKeyDown,
}: {
  parts: any
  handleClick: any
  handleKeyDown: any
}) => {
  const rowRef = React.useRef(null)
  console.log('parts table bryan', parts)

  function enter(e: any, index: number) {
    console.log('bryan hover', [index])
    e.currentTarget.style.background = 'red'
    console.log('e target', e.currentTarget.childNodes)
  }

  function leave(e: any, index: number) {
    console.log('bryan hover', [index])
    e.currentTarget.style.background = ''
    // console.log('e target', e.currentTarget.style.background)
  }
  return (
    <table>
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
      <tbody>
        {parts.map((part: any, index: any) => {
          return (
            <tr
              ref={rowRef}
              onMouseEnter={(e) => enter(e, index)}
              onMouseLeave={(e) => leave(e, index)}
              onKeyDown={handleKeyDown}
              onClick={handleClick}
              key={index}
            >
              <td>{part.id}</td>
              <td>{part.name}</td>
              <td>{part.price}</td>
              <td>{part.instock}</td>
              <td>{Number(part.instock) < 100 ? 'YES' : 'NO'}</td>
              <td>{Number(part.instock) === 0 ? 'YES' : 'NO'}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
