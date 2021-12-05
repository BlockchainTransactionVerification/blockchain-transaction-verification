import React, { useState } from 'react'
import { addTransaction, getTransactions } from '../../actions/transactions'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Accordion } from 'react-bootstrap'
import CustomAccordionItem from './CustomAccordionItem'

function CustomAccoridon({ filteredItems }) {
  if (filteredItems == null) {
    return null
  }

  const filtered = filteredItems.map((supplier) => (
    <CustomAccordionItem key={supplier.id} supplier={supplier} />
  ))
  return (
    <div className='accordion'>
      <Accordion defaultActiveKey='0'>{filtered}</Accordion>
    </div>
  )
}

export default CustomAccoridon
