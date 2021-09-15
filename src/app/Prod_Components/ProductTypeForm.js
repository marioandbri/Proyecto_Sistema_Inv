import React, { useEffect, useState } from "react";

const ProductTypeForm = ({ handleCreationForm,
  isAnUpdate,
  productUpdate,
  handleUpdate, CreationForm }) => {
  const initialState = {
    option: "",
  };

  const [productType, setproductType] = useState(initialState);
  const objForm = { titulo: "", tipo: "" };
  const [form, setForm] = useState([objForm]);
  const agregarForm = () => {
    let newForm = [...form, objForm];
    setForm(newForm);
  };
  const restarForm = (i) => {
    let newForm = [...form];
    !(newForm.length <= 1) ? newForm.splice(i, 1) : console.log("debe haber al menos 1 campo")
    setForm(newForm);
  };
  const liftForm = (e, i) => {
    let newForm = [...form];
    newForm[i][e.target.name] = e.target.value;
    setForm(newForm);
  };
  useEffect(() => {
    setproductType({
      ...productType,
      form: form,
    });
    return () => { };
  }, [form]);

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleCreationForm(productType)
      }} className="form">
        <div className="field is-horizontal">
          <div className="field">
            <label htmlFor="" className="label">
              Nombre del tipo de Producto
            </label>
            <span className="control">
              <input
                required
                value={productType.option}
                onChange={(e) => {
                  setproductType({ ...productType, option: e.target.value });
                }}
                type="text"
                className="input"
              />
            </span>
          </div>
        </div>

        {form.map((elem, index) => (
          <div key={index} className="field is-grouped is-grouped-multiline">
            <div className="field">
              <label htmlFor="" className="label">
                Titulo
              </label>
              <span className="control">
                <input
                  onChange={(e) => {
                    liftForm(e, index);
                  }}
                  value={elem.titulo}
                  name="titulo"
                  type="text"
                  className="input"
                  disabled={elem.titulo == "PartNumber" ? true : false}
                />
              </span>
            </div>
            <div className="field">
              <label htmlFor="" className="label">
                Tipo
              </label>
              <div className="field has-addons">
                <span className="control ">
                  <span className="select">
                    <select
                      required
                      onChange={(e) => {
                        liftForm(e, index);
                      }}
                      value={elem.tipo}
                      name="tipo"
                      disabled={elem.titulo == "PartNumber" ? true : false}
                    >
                      <option defaultValue value="">
                        Seleccione
                      </option>
                      <option value="text">Texto</option>
                      <option value="number">Números</option>
                    </select>
                  </span>
                </span>
                <span className="control">
                  <a
                    onClick={() => restarForm(index)}
                    className="button is-danger"
                  >
                    <span className="icon">
                      <i className="fas fa-minus"></i>
                    </span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="field is-grouped">
          <a
            className="button is-success is-outlined"
            onClick={() => {
              agregarForm();
            }}
          >
            <span className="icon">
              <i className="fas fa-plus"></i>
            </span>
            <span>Agregar campo</span>
          </a>
        </div>


        {/* /////////////BOTONES///////////// */}

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
    </div>
  );
};

export default ProductTypeForm;
