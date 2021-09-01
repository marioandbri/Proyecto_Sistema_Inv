import React, { useState, useEffect } from "react";
import LoadingBar from "../LoadingBar";
import Consumibles from "./Consumibles";

const PrinterForm = ({ handleCreationForm, isAnUpdate, productUpdate, handleUpdate }) => {
  const initialState = {
    partNumber: "",
    marca: "",
    modelo: "",
    tipoImpresora: "",
    modoImpresion: "",
    conexiones: [""],
    detImpresora: { }
  };

  const [product, setProduct] = useState(isAnUpdate ? productUpdate : initialState);

  // const [consumiblesCount, setConsumiblesCount] = useState(1);

  const consumibles = [];
  const objConsum = { tipoConsumible: "", numeroParte: "" }
  const productConsum = []


  const [arrayConsum, setArrayConsum] = useState(
    isAnUpdate ? productUpdate.consumibles : [objConsum]);





  const agregarConsum = () => {
    setArrayConsum([...arrayConsum, objConsum])

  }
  const restarConsum = () => {
    let newArrayConsum = [...arrayConsum]
    newArrayConsum.length <= 1 ? console.log('solo queda un elemento en el array') : newArrayConsum.pop()
    setArrayConsum(newArrayConsum)

  }

  const liftProductConsum = (e, index) => {
    console.log(index, e.target.name, e.target.value)
    let newArrayConsum = [...arrayConsum]
    console.log(newArrayConsum)
    newArrayConsum[index][e.target.name] = e.target.value
    setArrayConsum(newArrayConsum)
  };



  useEffect(() => {
    setProduct({
      ...product,
      consumibles: arrayConsum,
    });
    return () => { };
  }, [arrayConsum]);



  const liftProduct = (e) => {
    setProduct({
      ...product,
      [e.target.id]: e.target.value,
    });
  };
  const liftProductType = (e) => {
    const tipo = e.target.value.match(/[\w]+/g);
    setProduct({
      ...product,
      [e.target.id]: tipo,
    });
  };
  const liftProductConex = (e) => {
    const conex = Array.from(e.target.selectedOptions, (o) => o.value);
    setProduct({
      ...product,
      conexiones: conex,
    });
  };

  const liftProductDet = (e) => {
    setProduct({
      ...product,
      detImpresora: {
        ...product.detImpresora,
        [e.target.name]: e.target.value,
      },
    });
  };
  // for (let index = 0; index < arrayConsum.length; index++) {
  //   productConsum.push(objConsum)

  //   consumibles.push(
  //     <Consumibles
  //       consumibles={arrayConsum}
  //       key={index}
  //       index={index}
  //       liftProductConsum={liftProductConsum}
  //     />
  //   );
  // }
  // useEffect(() => {


  //   setConsumiblesComponent(consumibles)

  //   return () => {

  //   };
  // }, [consumiblesCount]);



  return (
    <>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          isAnUpdate ? handleUpdate(product) : handleCreationForm(product);
        }}
      >
        <div className="field is-grouped is-grouped-multiline">
          <div className="field m-1">
            <label className="label">Tipo de Impresora</label>
            <div className="control">
              <span className="select">
                <select
                  required
                  onChange={(e) => {
                    liftProductType(e);
                  }}
                  value={product.tipoImpresora}
                  name="tipoImpresora"
                  id="tipoImpresora"
                >
                  <option defaultValue value="">
                    Seleccione
                  </option>
                  <option value={["Monocromatica"]}>Monocromatica</option>
                  <option value={["Color"]}>Color</option>
                  <option disabled>──────</option>
                  <option value={["Multifuncional", "Monocromatica"]}>
                    Multifuncional Monocromatica
                  </option>
                  <option value={["Multifuncional", "Color"]}>
                    Multifuncional Color
                  </option>
                </select>
              </span>
            </div>
          </div>
          <div className="field m-1">
            <div className="control">
              <label className="label">Modo de Impresion</label>
              <span className="select">
                <select
                  required
                  value={product.modoImpresion}
                  name="modoImpresion"
                  id="modoImpresion"
                  onChange={(e) => {
                    liftProduct(e);
                  }}
                >
                  <option defaultValue value="">
                    Seleccione
                  </option>
                  <option value="Laser">Láser</option>
                  <option value="Inyeccion">Inyección</option>
                </select>
              </span>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field m-1">
            <label className="label">Numero de Parte</label>
            <div className="control">
              <input
                autoComplete="off"
                required
                data-msg="Required"
                id="partNumber"
                className="input"
                value={product.partNumber}
                onChange={(e) => {
                  liftProduct(e);
                }}
                placeholder=""
              />
            </div>
          </div>

          <div className="field m-1">
            <label className="label">Marca</label>
            <div className="control">
              <input
                id="marca"
                className="input"
                list="marcas"
                value={product.marca}
                onChange={(e) => {
                  liftProduct(e);
                }}
                placeholder=""
              />
              <datalist id="marcas">
                <option value="HP" />
                <option value="Canon" />
                <option value="Xerox" />
                <option value="Brother" />
              </datalist>
            </div>
          </div>

          <div className="field m-1">
            <label className="label">Modelo</label>
            <div className="control">
              <input
                id="modelo"
                className="input"
                value={product.modelo}
                onChange={(e) => {
                  liftProduct(e);
                }}
                placeholder=""
              />
            </div>
          </div>
        </div>
        <div className="field is-horizontal">

          {/* ////////////////// CONEXIONES //////////////// */}
          <div className="field m-1">
            <label className="label">Conexiones</label>
            <div className="control">
              <span className="select is-multiple">
                {console.log(product.conexiones)}
                <select
                  multiple
                  multiple={true}
                  value={product.conexiones}
                  required
                  size="4"
                  name="conexiones"
                  id="conexiones"
                  onChange={(e) => {
                    liftProductConex(e);
                  }}
                >
                  <option value="USB">USB</option>
                  <option value="Ethernet">Ethernet</option>
                  <option value="WiFi">WiFi</option>
                  <option value="Bluetooth">Bluetooth</option>
                </select>
              </span>
            </div>
          </div>

          {/* /////////////// DETALLES IMPRESORA ////////////// */}
          <div className="field is-grouped is-grouped-multiline">
            <span className="field m-1">
              <label className="label">Velocidad</label>
              <div className="control">
                <input
                  name="ppmImpresion"
                  value={product.detImpresora.ppmImpresion}
                  onChange={(e) => {
                    liftProductDet(e);
                  }}
                  type="number"
                  className="input"
                  placeholder="PPM Impresion"
                />
              </div>
            </span>
          </div>
          <div className="field is-grouped is-grouped-multiline">
            <span className="field m-1">
              <label className="label">Volumen Mensual</label>
              <div className="control">
                <input
                  name="cuotaMensualMax"
                  value={product.detImpresora.cuotaMensualMax}
                  onChange={(e) => {
                    liftProductDet(e);
                  }}
                  type="number"
                  className="input"
                  placeholder="Maximo"
                />
              </div>
              <div className="control">
                <input
                  name="cuotaMensualRec"
                  value={product.detImpresora.cuotaMensualRec}
                  onChange={(e) => {
                    liftProductDet(e);
                  }}
                  type="number"
                  className="input"
                  placeholder="Recomendado"
                />
              </div>
            </span>
          </div>
          <div className="field m-1">
            <label htmlFor="" className="label">
              Tamaño Max. Papel
            </label>
            <div className="control">
              <input
                name="maxPapelTam"
                value={product.detImpresora.maxPapelTam}
                onChange={(e) => {
                  liftProductDet(e);
                }}
                type="text"
                className="input"
                placeholder="Formato Papel"
              />
            </div>
          </div>
        </div>


        {/* /////////////// CONSUMIBLES //////////// */}

        <Consumibles agregarConsum={agregarConsum} restarConsum={restarConsum} liftProductConsum={liftProductConsum} arrayConsum={arrayConsum} />


        {/* ////////////// BOTONES //////////// */}
        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-link">
              Crear
            </button>
          </div>
          <div className="control">
            <button type="reset" className="button is-link is-light">
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PrinterForm;
