import React from 'react'

const EmpresaCardHeader = ({ title, date, setDate }) => {
  return (
    <>
      <span>{title}</span>
      <label className='label is-pulled-right'>Fecha de entrega:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className='input is-small' />
      </label>
    </>
  )
}

export default EmpresaCardHeader