import React from "react";
import CreateProductForm from "./CreateProductForm";

const ProductoForm = ({ testOption, handleSelection }) => {
  // const [formInput, setformInput] = useState("");
  return (
    <>
      <div className=" block box">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(testOption);
          }}
        >
          <div className="field">
            <label className="label" htmlFor="test">
              Tipo de Producto
            </label>
            <div className="control">
              <div className="select">
                <select
                  onChange={(e) => handleSelection(e)}
                  value={testOption}
                  id="text"
                  className="select"
                >
                  <option value="">Seleccione el tipo</option>
                  <option value="Computador">Computador</option>
                  <option value="Impresora">Impresora</option>
                </select>
              </div>
            </div>
            <CreateProductForm />
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className="button is-link">
                Crear
              </button>
            </div>
            <div className="control">
              <button type="reset" className="button is-link is-light">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductoForm;
