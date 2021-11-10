import React from 'react'
import Card from './Card'

function SearchList({ filteredPersons }) {
  const filtered = filteredPersons.map((supplier) => (
    <Card key={supplier.id} supplier={supplier} />
  ))
  return <div>{filtered}</div>
}

export default SearchList
