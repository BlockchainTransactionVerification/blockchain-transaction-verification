import React from 'react'

function Card({ supplier }) {
  return (
    <div className='tc bg-washed-blue dib br3 pa3 ma2 grow bw2 shadow-5'>
      <div>
        <p>Item Name: {supplier.ItemName}</p>
        <p>Price: ${supplier.Price}</p>
        <p>Quantity: {supplier.Quantity}</p>
        <p>Brand: {supplier.Brand}</p>
        <p>Percent Match: {supplier.PercentMatch}</p>
      </div>
    </div>
  )
}

export default Card
