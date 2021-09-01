import React, { useEffect, useState } from "react";

const ProductTypeForm = () => {
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
    newForm.splice(i, 1);
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
    return () => {};
  }, [form]);

  return (
    <div>
      <form action="" className="form">
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
            <span>Agregar campo Input</span>
          </a>
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
      </form>
    </div>
  );
};

export default ProductTypeForm;
