import * as React from 'react'
import './table.css'

type TableProps = {
  reffed: any
  tableRef: any
  parts: Array<{
    id: number
    name: string
    price: string
    stock: boolean
    instock: number
  }>
  handleClick: (index: number, e: object) => void
  handleKeyDown: (e: { which: number }) => void
  onMouseEnter: (event: React.MouseEvent<HTMLElement>) => void
  onMouseLeave: (event: React.MouseEvent<HTMLElement>) => void
}

const Table: React.FC<TableProps> = ({
  reffed,
  tableRef,
  parts,
  handleClick,
  handleKeyDown,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
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
        {parts.map(
          (
            part: {
              id: number
              name: string
              price: string
              stock: boolean
              instock: number
            },
            index: number
          ) => {
            return (
              <tr
                className='table-rows'
                tabIndex={index}
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
          }
        )}
      </tbody>
    </table>
  )
}

export default Table
