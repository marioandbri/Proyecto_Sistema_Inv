import React from 'react'
import Card from '../../FormComponents/Card'
import ProductCardControls from './ProductCardControls'
import ProductCardHeader from './ProductCardHeader'


const ProductCard = ({ producto, handleInput, removeSelectedProduct }) => {
  return (
    <>
      <Card
        style={{ marginBottom: ".5em", fontSize: ".6rem", padding: "0" }}
        title={<ProductCardHeader title={producto.shortDescription} onClick={removeSelectedProduct} />}
        subtitle={<ProductCardControls detalle={producto.detalle} handleInput={handleInput} />}
        content=""
      />
    </>
  )
}

export default ProductCard