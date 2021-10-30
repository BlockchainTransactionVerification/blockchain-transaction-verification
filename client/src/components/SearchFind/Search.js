import React, { useState } from 'react'
import Scroll from './Scroll'
import SearchList from './SearchList.js'

function Search({ details }) {
  const [searchField, setSearchField] = useState('')

  const filteredPersons = details.filter((supplier) => {
    return (
      supplier.ItemName.toLowerCase().includes(searchField.toLowerCase()) ||
      supplier.Price.toLowerCase().includes(searchField.toLowerCase()) ||
      supplier.Quantity.toLowerCase().includes(searchField.toLowerCase()) ||
      supplier.Region.toLowerCase().includes(searchField.toLowerCase())
    )
  })

  const handleChange = (e) => {
    setSearchField(e.target.value)
  }

  function searchList() {
    return (
      <Scroll>
        <SearchList filteredPersons={filteredPersons} />
      </Scroll>
    )
  }

  return (
    <section className='garamond'>
      <div className='navy georgia ma0 grow'>
        <h2 className='f2'>Supplier Search</h2>
      </div>
      <div className='pa2'>
        <input
          className='pa3 bl br3 grow b--none bg-light-blue ma3'
          type='search'
          placeholder='Item Name'
          onChange={handleChange}
        />{' '}
        <input
          className='pa3 bb br3 grow b--none bg-light-blue ma3'
          type='search'
          placeholder='Price'
          onChange={handleChange}
        />{' '}
        <input
          className='pa3 bb br3 grow b--none bg-light-blue ma3'
          type='search'
          placeholder='Quantity'
          onChange={handleChange}
        />{' '}
        <input
          className='pa3 bb br3 grow b--none bg-light-blue ma3'
          type='search'
          placeholder='Region'
          onChange={handleChange}
        />
      </div>
      {searchList()}
    </section>
  )
}

export default Search
