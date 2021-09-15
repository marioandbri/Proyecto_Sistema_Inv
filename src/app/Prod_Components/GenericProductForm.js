import React, { useState, useEffect } from "react";

const GenericProductForm = ({
  options,
  handleCreationForm,
  handleUpdate,
  isAnUpdate,
  productUpdate,
}) => {
  // console.log(options, 'options')
  const [form, setForm] = useState(options.form);

  useEffect(() => {
    setForm(options.form);
    setProduct({ ...product, tipoProducto: options.option });

    return () => { };
  }, [options]);

  let bodyObj = {}

  useEffect(() => {
    if (!isAnUpdate) {
      setProduct({ ...product, body: bodyObj });
    }
    return () => { };
  }, [form]);

  let initialState = {
    tipoProducto: options.option,
    PartNumber: "",
    generic: true,
    body: bodyObj
  };




  form.forEach(e => { bodyObj[e.titulo] = "" });
  // form.map((e) => ({ [e.titulo]: "" }))
  // const body = isAnUpdate ? productUpdate.body : bodyObj;
  // console.log(bodyObj, 'bodyObj')
  // console.log(body);
  const [product, setProduct] = useState(isAnUpdate ? productUpdate : initialState);
  // console.log(form, 'form')

  // const [productBody, setProductBody] = useState(isAnUpdate ? productUpdate.body : bodyObj);
  // console.log(productBody, 'product body')

  const liftProductForm = (e, i) => {
    let newBody = product.body
    newBody[e.target.name] = e.target.value
    setProduct({ ...product, body: newBody });
  };

  // useEffect(() => {
  //   setProduct({
  //     ...product,
  //     body: productBody,
  //   });
  //   return () => { };
  // }, [productBody]);
  // useEffect(() => {
  //   setProduct({
  //     ...product,
  //     body: productUpdate.body,
  //   });
  //   return () => {

  //   };
  // }, [productUpdate]);

  // let headers = [];
  // for (let i in body) {
  //   headers.push(Object.keys(body[i]).toString());
  // }
  // console.log(headers);

  // console.log(initialState);
  return (
    <fieldset>
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
                value={product.PartNumber}
                onChange={(e) => {
                  setProduct({ ...product, PartNumber: e.target.value });
                }}
                name="PartNumber"
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
                    value={isAnUpdate ? product.body[e.titulo] : product[e.titulo]}
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
          )
        })}

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
    </fieldset>
  );
};

export default GenericProductForm;
