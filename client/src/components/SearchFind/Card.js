import React from 'react'

function Card({ supplier }) {
  return (
    <div className='tc bg-washed-blue dib br3 pa3 ma2 grow bw2 shadow-5'>
      <div>
        <h4>{supplier.SupplierName}</h4>
        <p>Item Name: {supplier.ItemName}</p>
        <p>Price: ${supplier.Price}</p>
        <p>Quantity: {supplier.Quantity}</p>
        <p>Region: {supplier.Region}</p>
      </div>
    </div>
  )
}

export default Card
