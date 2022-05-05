import React from 'react'

const ProductCardControls = ({ detalle, handleInput }) => {

  const fields = Object.entries(detalle).filter(([key, _]) => key !== "CPU")
  return (
    <>
      {fields.map(([key, _], idx) => (
        <div key={idx}>{key}: <input size={detalle[key].length} className='mt-1' onChange={handleInput(key)} value={detalle[key]} /></div>
      ))}
    </>
  )
}

export default ProductCardControls