import React from "react";

const ProductoItem = ({
  productType,
  descripcion,
  item,
  handleEdit,
  handleRemove,
}) => {
  //   console.log(descripcion);
  if (productType == "computadores") {
    return (
      <>
        <tr>
          <td>{item.tipoComputador} </td>
          <td>{item.partNumber} </td>
          <td>{item.marca} </td>
          <td>{item.modelo} </td>
          <td>
            {item.procesador.tier +
              "-" +
              item.procesador.modelo +
              " " +
              item.procesador.minFreq +
              "-" +
              item.procesador.turboFreq}
            {"GHz"}
          </td>
          <td>
            {item.almacenamiento.map(
              (e, index) =>
                `${index + 1}* ${e.tipoAlmacenamiento} ${e.capacidadGB}GB`
            )}{" "}
          </td>
          <td>
            {item.tipoRam +
              "-" +
              item.socketsMemoria
                .map((e) =>
                  e.isInstalled != false ? e.capacidadGB + "GB" : ""
                )
                .join(" ")}
          </td>
          <td>{descripcion}</td>
          <td>
            <a
              title="Editar"
              className="button m-1 is-outlined is-small is-info"
              onClick={(e) => {
                handleEdit(e, item._id);
              }}
            >
              <span className="icon">
                <i className="fas fa-pen"></i>
              </span>
            </a>
            <a
              title="Eliminar"
              className="button m-1 is-outlined is-small is-danger"
              onClick={(e) => {
                handleRemove(e, item._id);
              }}
            >
              <span className="icon">
                <i className="fas fa-minus-circle"></i>
              </span>
            </a>
          </td>
        </tr>
      </>
    );
  }
  if (productType == "impresoras") {
    return (
      <>
        <tr>
          <td>{item.tipoImpresora.map((e) => `${e} `)}</td>
          <td>{item.partNumber}</td>
          <td>{item.marca}</td>
          <td>{item.modelo}</td>
          <td>{item.modoImpresion}</td>
          <td>{item.conexiones.map((e) => `${e} `)}</td>
          <td>{descripcion}</td>
          <td>
            <a
              title="Editar"
              className="button m-1 is-outlined is-small is-info"
              onClick={(e) => {
                handleEdit(e, item._id);
              }}
            >
              <span className="icon">
                <i className="fas fa-pen"></i>
              </span>
            </a>
            <a
              title="Eliminar"
              className="button m-1 is-outlined is-small is-danger"
              onClick={(e) => {
                handleRemove(e, item._id);
              }}
            >
              <span className="icon">
                <i className="fas fa-minus-circle"></i>
              </span>
            </a>
          </td>
        </tr>
      </>
    );
  }
  if (productType == "monitores") {
    return (
      <>
        <tr>
          <td>{item.tipoMonitor.map((e) => `${e} `)}</td>
          <td>{item.partNumber}</td>
          <td>{item.marca}</td>
          <td>{item.modelo}</td>
          <td>{item.tamañoPantalla + '"'}</td>
          {/* <td>{item.conexiones.map((e) => `${e} `)}</td> */}
          <td>{descripcion}</td>
          <td>
            <a
              title="Editar"
              className="button m-1 is-outlined is-small is-info"
              onClick={(e) => {
                handleEdit(e, item._id);
              }}
            >
              <span className="icon">
                <i className="fas fa-pen"></i>
              </span>
            </a>
            <a
              title="Eliminar"
              className="button m-1 is-outlined is-small is-danger"
              onClick={(e) => {
                handleRemove(e, item._id);
              }}
            >
              <span className="icon">
                <i className="fas fa-minus-circle"></i>
              </span>
            </a>
          </td>
        </tr>
      </>
    );
  }
  // console.log(productType)
  return (
    <>
      <tr>
        <td>ALGO FALLO</td>
      </tr>
    </>
  );
};

export default ProductoItem;
