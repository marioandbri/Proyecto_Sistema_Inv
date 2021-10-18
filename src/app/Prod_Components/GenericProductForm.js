import React, { useState, useEffect } from "react";

const GenericProductForm = ({
  options,
  handleCreationForm,
  handleUpdate,
  isAnUpdate,
  isAnEye,
  productUpdate,
  resetForm,
}) => {
  // console.log(options, 'options')
  const [form, setForm] = useState(options.form);

  useEffect(() => {
    setForm(options.form);
    setProduct({ ...product, tipoProducto: options.option });

    return () => {};
  }, [options]);

  let detalleObj = {};

  useEffect(() => {
    if (!isAnUpdate) {
      setProduct({ ...product, detalle: detalleObj });
    }
    return () => {};
  }, [form]);

  let initialState = {
    tipoProducto: options.option,
    partnumber: "",
    generic: true,
    detalle: detalleObj,
  };

  form.forEach((e) => {
    detalleObj[e.titulo] = "";
  });
  // form.map((e) => ({ [e.titulo]: "" }))
  // const detalle = isAnUpdate ? productUpdate.detalle : detalleObj;
  // console.log(detalleObj, 'detalleObj')
  // console.log(detalle);
  const [product, setProduct] = useState(
    isAnUpdate ? productUpdate : initialState
  );
  // console.log(form, 'form')

  // const [productdetalle, setProductdetalle] = useState(isAnUpdate ? productUpdate.detalle : detalleObj);
  // console.log(productdetalle, 'product detalle')

  const liftProductForm = (e, i) => {
    let newdetalle = product.detalle;
    newdetalle[e.target.name] = e.target.value;
    setProduct({ ...product, detalle: newdetalle });
  };

  // useEffect(() => {
  //   setProduct({
  //     ...product,
  //     detalle: productdetalle,
  //   });
  //   return () => { };
  // }, [productdetalle]);
  // useEffect(() => {
  //   setProduct({
  //     ...product,
  //     detalle: productUpdate.detalle,
  //   });
  //   return () => {

  //   };
  // }, [productUpdate]);

  // let headers = [];
  // for (let i in detalle) {
  //   headers.push(Object.keys(detalle[i]).toString());
  // }
  // console.log(headers);

  // console.log(initialState);
  return (
    <fieldset disabled={isAnEye ? true : false}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // console.log(product);
          isAnUpdate ? handleUpdate(product) : handleCreationForm(product);
        }}
        className="form"
      >
        <div className="field is-horizontal">
          <div className="field">
            <label className="label">PartNumber</label>
            <span className="control">
              <input
                value={product.partnumber}
                onChange={(e) => {
                  setProduct({ ...product, partnumber: e.target.value });
                }}
                name="partnumber"
                type="text"
                className="input"
              />
            </span>
          </div>
        </div>
        {/* {console.log(product.tipoProducto)} */}
        {form.map((e, index) => {
          return (
            <div key={index} className="field is-horizontal">
              <div className="field">
                <label className="label">{e.titulo}</label>
                <span className="control">
                  <input
                    value={
                      isAnUpdate ? product.detalle[e.titulo] : product[e.titulo]
                    }
                    onChange={(e) => {
                      liftProductForm(e, index);
                    }}
                    name={e.titulo}
                    type={e.tipo}
                    className="input"
                  />
                </span>
              </div>
            </div>
          );
        })}

        {/* /////////////BOTONES///////////// */}

        {isAnEye ? (
          ""
        ) : (
          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className="button is-link">
                {isAnUpdate ? "Actualizar" : "Crear"}
              </button>
            </div>
            <div className="control">
              <button
                onClick={() => {
                  resetForm();
                }}
                type="reset"
                className="button is-link is-light"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </form>
    </fieldset>
  );
};

export default GenericProductForm;
