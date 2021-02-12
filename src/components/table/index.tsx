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
  console.log('parts table bryan', parts)
  // const test = (index: any) => {
  //   console.log('test', index)
  // }
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
            <tr onKeyDown={handleKeyDown} onClick={handleClick} key={index}>
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
