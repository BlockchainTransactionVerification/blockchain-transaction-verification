import React from 'react'
import Card from './Card'

function SearchList({ filteredItems }) {
  if (filteredItems == null){
    return null
  }

  const filtered = filteredItems.map((supplier) => (
    <Card key={supplier.id} supplier={supplier} />
  ))
  return <div>{filtered}</div>
}

export default SearchList
