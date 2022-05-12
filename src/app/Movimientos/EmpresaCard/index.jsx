import React from 'react'
import Card from '../../FormComponents/Card'
import EmpresaCardHeader from './EmpresaCardHeader'



const EmpresaCard = ({ selectedClient, date, setDate }) => {
  return (
    <Card
      style={{ marginBottom: ".5em", fontSize: ".6rem", padding: "0" }}
      title={<EmpresaCardHeader date={date} setDate={setDate} title={selectedClient.razon_social} />}
      subtitle={selectedClient.rut}
      content={selectedClient.ubicacion}
    />
  )
}

export default EmpresaCard