import React from 'react'

const ProductCardControls = ({ detalle, handleInput }) => {
  const validKeys = ["RAM", "Almacenamiento"]
  const fields = Object.entries(detalle).filter(([key, _]) => validKeys.indexOf(key) !== -1)
  return (
    <>
      {fields.map(([key, _], idx) => (
        <div key={idx}>{key}: <input size={detalle[key].length} className='mt-1' onChange={handleInput(key)} value={detalle[key]} /></div>
      ))}
    </>
  )
}

export default ProductCardControls