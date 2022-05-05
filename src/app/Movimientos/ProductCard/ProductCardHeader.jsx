import React from 'react'

const ProductCardHeader = ({ title, onClick }) => {
  return (
    <span style={{ display: "grid", gridTemplateColumns: "60% 30% 10%" }}>
      <span className='is-inline-block' >{title}</span>
      <span className='is-size-6 has-text-weight-normal'>
        <label>Cant.: </label> <input type="number" min={0} maxLength={3} style={{ width: "3rem", height: "1.5rem" }} className='input is-small' />
      </span>
      <a onClick={onClick} style={{ height: "100%" }} className='is-danger button is-small'>Eliminar</a>
    </span>
  )
}

export default ProductCardHeader