import React, { useState } from 'react'
import './table.css'

interface PartType {
  id: number
  name: string
  price: string
  instock: number
}
const Table = ({
  reffed,
  tableRef,
  parts,
  handleClick,
  handleKeyDown,
  onMouseEnter,
  onMouseLeave,
  ...props
}: {
  reffed: any
  tableRef: any
  parts: any
  handleClick: any
  handleKeyDown: any
  onMouseEnter: any
  onMouseLeave: any
}) => {
  // console.log('nigga refs heres', reffed)

  return (
    <table ref={tableRef}>
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
              className='table-rows'
              // ref={reffed[index]}
              tabIndex={index.toString()}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={(e) => handleClick(index, e)}
              key={index}
              onKeyPressCapture={handleKeyDown}
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
