import React from "react";
import CreateProductForm from "./CreateProductForm";

const ProductoForm = ({
  productOption,
  handleSelection,
  handleCreationForm,
  handleUpdate,
  isAnUpdate,
  productUpdate,
}) => {

  // const [formInput, setformInput] = useState("");


  const ProductOption = [{ }]
  return (
    <>
      <div className=" block box">
        <div className="field">
          <label className="label" htmlFor="test">
            Tipo de Producto
          </label>
          <div className="control">
            <div className="select">
              <select
                onChange={(e) => handleSelection(e)}
                value={productOption}
                id="text"
                className="select"
              >
                <option value="">Seleccione el tipo</option>
                <option value="computadores">Computador</option>
                <option value="impresoras">Impresora</option>
                <option value="monitores">Monitor</option>
                <option value="proyectores">Proyector</option>
                <option disabled>──────</option>
                <option value="productType">Nuevo tipo de Producto</option>

              </select>
            </div>
          </div>
        </div>
        <CreateProductForm
          productOption={productOption}
          handleCreationForm={handleCreationForm}
          isAnUpdate={isAnUpdate}
          productUpdate={productUpdate}
          handleUpdate={handleUpdate}
        />
      </div>
    </>
  );
};

export default ProductoForm;
