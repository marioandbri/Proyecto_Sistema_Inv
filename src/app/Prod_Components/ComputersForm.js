import React, { useState, useEffect } from "react";
import Almacenamiento from "./Almacenamiento";
import MemRam from "./MemRam";
import TamañoPantalla from "./TamañoPantalla";

const ComputersForm = ({
  handleCreationForm,
  isAnUpdate,
  isAnEye,
  productUpdate,
  handleUpdate,
}) => {
  const initialState = {
    tipoComputador: "",
    partNumber: "",
    marca: "",
    modelo: "",
    tamañoPantalla: "",
    procesador: {
      marca: "",
      tier: "",
      modelo: "",
      nucleos: "",
      hilos: "",
      minFreq: "",
      turboFreq: "",
    },
    // almacenamiento: [{ tipoAlmacenamiento: "", capacidadGB: "" }],
    tipoRam: "",
    tags: [],
  };
  const [product, setProduct] = useState(
    isAnUpdate ? productUpdate : initialState
  );

  const objAlm = { tipoAlmacenamiento: "", capacidadGB: "" };
  const [arrayAlm, setArrayAlm] = useState(
    isAnUpdate ? productUpdate.almacenamiento : [objAlm]
  );

  const objRam = {
    capacidadGB: "",
    isInstalled: "",
    memPartnumber: "",
  };

  const [arrayRam, setArrayRam] = useState(
    isAnUpdate ? productUpdate.socketsMemoria : [{
      capacidadGB: "",
      isInstalled: true,
      memPartnumber: "",
    }, {
      capacidadGB: "",
      isInstalled: "",
      memPartnumber: "",
    }]
  );

  const liftProduct = (e) => {
    if (e.target.name != "tipoComputador") {
      setProduct({
        ...product,
        [e.target.name]: e.target.value.toUpperCase(),
      });
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };
  const liftProductProc = (e) => {
    setProduct({
      ...product,
      procesador: {
        ...product.procesador,
        [e.target.name]: e.target.value,
      },
    });
  };

  const liftProductAlm = (i, e) => {
    let newAlm = [...arrayAlm];
    newAlm[i][e.target.name] = e.target.value;
    setArrayAlm(newAlm);
  };
  const agregarAlm = () => {
    setArrayAlm([...arrayAlm, objAlm]);
  };
  const restarAlm = () => {
    let newAlm = [...arrayAlm];
    newAlm.length <= 1
      ? console.log("solo queda un elemento en el array")
      : newAlm.pop();
    setArrayAlm(newAlm);
  };

  const agregarRam = () => {
    let newRam = [...arrayRam, objRam];
    setArrayRam(newRam);
  };
  const restarRam = () => {
    let newRam = [...arrayRam];
    newRam.length <= 2
      ? console.log("solo queda un par de elementos")
      : newRam.pop();
    setArrayRam(newRam);
  };
  const liftProductRam = (i, e) => {
    let newRam = [...arrayRam];
    newRam[i][e.target.name] =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setArrayRam(newRam);
  };
  // useEffect(() => {
  //   setProduct({
  //     ...product,
  //     socketsMemoria: arrayRam,
  //   });
  //   return () => {};
  // }, [arrayRam]);

  useEffect(() => {
    setProduct({
      ...product,
      almacenamiento: arrayAlm,
      socketsMemoria: arrayRam,
    });
    return () => { };
  }, [arrayAlm, arrayRam]);

  const liftTags = (e) => {
    // const tags = e.target.value.split(",")
    setProduct({
      ...product,
      tags: e.target.value.match(/[\w\-\.]+/g),
    });
  };

  return (
    <fieldset disabled={isAnEye ? true : false}>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          isAnUpdate ? handleUpdate(product) : handleCreationForm(product);
        }}
      >
        <div className="field">
          <label className="label">Tipo de Computador</label>
          <div className="control">
            <div className="select">
              <select
                required
                name="tipoComputador"
                value={product.tipoComputador}
                onChange={(e) => {
                  liftProduct(e);
                }}
              >
                <option defaultValue value="">
                  Seleccione
                </option>
                <option value="Notebook">Notebook</option>
                <option value="Desktop">Desktop</option>
                <option value="AIO">All In One</option>
                <option value="Servidor">Servidor</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field mr-1">
            <label className="label">Numero de Parte</label>
            <div className="control">
              <input
                required
                data-msg="Required"
                name="partNumber"
                className="input"
                value={product.partNumber}
                onChange={(e) => {
                  liftProduct(e);
                }}
                placeholder=""
              />
            </div>
          </div>

          <div className="field mr-1">
            <label className="label">Marca</label>
            <div className="control">
              <input
                required
                name="marca"
                className="input"
                list="marcas"
                value={product.marca}
                onChange={(e) => {
                  liftProduct(e);
                }}
                placeholder=""
              />
              <datalist name="marcas">
                <option value="HP" />
                <option value="Asus" />
                <option value="AOC" />
              </datalist>
            </div>
          </div>

          <div className="field">
            <label className="label">Modelo</label>
            <div className="control">
              <input
                required
                name="modelo"
                className="input"
                value={product.modelo}
                onChange={(e) => {
                  liftProduct(e);
                }}
                placeholder=""
              />
            </div>
          </div>

          {product.tipoComputador == "Notebook" ||
            product.tipoComputador == "AIO" ? (
            <TamañoPantalla
              tamañoPantalla={product.tamañoPantalla}
              liftProduct={liftProduct}
            />
          ) : (
            ""
          )}
        </div>

        {/* ///////////////////PROCESADOR/////////////// */}

        <div className="field is-horizontal">
          <div className="field mr-1">
            <label className="label">Procesador </label>
            <div className="field has-addons">
              <div className="control">
                <span className="select">
                  <select
                    required
                    value={product.procesador.marca}
                    name="marca"
                    onChange={(e) => {
                      liftProductProc(e);
                    }}
                  >
                    <option defaultValue value="">
                      Seleccione
                    </option>
                    <option value="Intel">Intel</option>
                    <option value="Amd">AMD</option>
                  </select>
                </span>
              </div>
              <div className="control">
                <span className="select">
                  <select
                    required
                    value={product.procesador.tier}
                    name="tier"
                    onChange={(e) => {
                      liftProductProc(e);
                    }}
                  >
                    <option defaultValue value="">
                      Seleccione
                    </option>
                    <option value="Core i3">Core i3</option>
                    <option value="Core i5">Core i5</option>
                    <option value="Core i7">Core i7</option>
                    <option value="Core i9">Core i9</option>
                    <option disabled>──────</option>
                    <option value="Ryzen 3">Ryzen 3</option>
                    <option value="Ryzen 5">Ryzen 5</option>
                    <option value="Ryzen 7">Ryzen 7</option>
                    <option value="Ryzen 9">Ryzen 9</option>
                    <option disabled>──────</option>
                    <option value="Xeon">Xeon</option>
                  </select>
                </span>
              </div>
              <div className="control">
                <input
                  required
                  name="modelo"
                  value={product.procesador.modelo}
                  onChange={(e) => {
                    liftProductProc(e);
                  }}
                  className="input"
                  placeholder="Modelo"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field mr-1">
            <label className="label">Velocidad</label>
            <div className="field has-addons">
              <div className="control">
                <input
                  required
                  name="minFreq"
                  value={product.procesador.minFreq}
                  onChange={(e) => {
                    liftProductProc(e);
                  }}
                  className="input"
                  type="number"
                  step=".1"
                  placeholder="Minima"
                />
              </div>
              <div className="control">
                <a className="button is-static">Ghz</a>
              </div>
              <div className="control">
                <a className="button is-static">-</a>
              </div>
              <div className="control">
                <input
                  required
                  name="turboFreq"
                  value={product.procesador.turboFreq}
                  onChange={(e) => {
                    liftProductProc(e);
                  }}
                  className="input"
                  type="number"
                  step=".1"
                  placeholder="Maxima"
                />
              </div>
              <div className="control">
                <a className="button is-static">Ghz</a>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Nucleos / Hilos</label>
            <div className="field has-addons">
              <div className="control">
                <input
                  required
                  name="nucleos"
                  value={product.procesador.nucleos}
                  onChange={(e) => {
                    liftProductProc(e);
                  }}
                  type="number"
                  className="input"
                />
              </div>
              <div className="control">
                <a className="button is-static">/</a>
              </div>
              <div className="control">
                <input
                  required
                  value={product.procesador.hilos}
                  name="hilos"
                  onChange={(e) => {
                    liftProductProc(e);
                  }}
                  type="number"
                  className="input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* /////////////////////// ALMACENAMIENTO ////////////////// */}
        <Almacenamiento
          arrayAlm={arrayAlm}
          agregarAlm={agregarAlm}
          restarAlm={restarAlm}
          liftProductAlm={liftProductAlm}
        />

        {/* /////////////////// MEMORIA RAM ///////////////// */}
        <MemRam
          arrayRam={arrayRam}
          agregarRam={agregarRam}
          restarRam={restarRam}
          liftProductRam={liftProductRam}
          liftProduct={liftProduct}
          tipoRam={product.tipoRam}
        />

        {/* //////////////////////TAGS////////////////////// */}

        <div className="field">
          <label className="label">Tags</label>
          <div className="control">
            <input
              value={product.tags}
              name="tags"
              onChange={(e) => {
                liftTags(e);
              }}
              className="input"
              placeholder="Info Adicional filtrable. Separada por comas. Ej.: DVD, Smartcard..."
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-link">
              Crear
            </button>
          </div>
          <div className="control">
            <button disabled={false} type="reset" className="button is-link is-light">
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </fieldset>
  );
};

export default ComputersForm;
