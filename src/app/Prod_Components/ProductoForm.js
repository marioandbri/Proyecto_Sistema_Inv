import React, { useEffect } from "react";
import LoadingBar from "../LoadingBar";
import CreateProductForm from "./CreateProductForm";
import Ptp from "prop-types";
const ProductoForm = ({
  productOption,
  handleSelection,
  handleCreationForm,
  handleUpdate,
  isAnUpdate,
  isAnEye,
  productUpdate,
  options,
  loadOptions,
  loading,
  resetForm,
}) => {
  // const [options, setOptions] = useState([]);
  // const loadOptions = async () => {
  //   let result = await fetch('/producto/option').then(res => res.json())
  //   console.log(result)
  //   setOptions(result)

  // }
  // useEffect(() => {
  //   loadOptions()
  //   return () => {
  //     options = ""
  //   };
  // }, []);
  useEffect(() => {
    return () => {
      productUpdate = "";
    };
  }, []);

  // const ProductOption = [{}];
  if (!loading) {
    // console.log(options, 'productoForm')
    // console.log(loadOptions)
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
                  disabled={isAnEye ? true : false}
                  onChange={(e) => handleSelection(e)}
                  value={productOption}
                  id="text"
                  className="select"
                >
                  <option value="">Seleccione el tipo</option>
                  {/* <option value="computadores">Computador</option>
                  <option value="impresoras">Impresora</option>
                  <option value="monitores">Monitor</option>
                  <option value="proyectores">Proyector</option>
                  <option disabled>──────────</option> */}
                  {options.map((elem, index) => (
                    <option key={index} value={`${elem.option}`}>
                      {elem.option}
                    </option>
                  ))}
                  <option disabled>──────────</option>
                  <option value="types">Nuevo tipo de Producto</option>
                </select>
              </div>
            </div>
          </div>
          <CreateProductForm
            productOption={productOption}
            handleCreationForm={handleCreationForm}
            isAnUpdate={isAnUpdate}
            isAnEye={isAnEye}
            productUpdate={productUpdate}
            handleUpdate={handleUpdate}
            options={options}
            loadOptions={loadOptions}
            resetForm={resetForm}
          />
        </div>
      </>
    );
  }
  return <LoadingBar />;
};

ProductoForm.propTypes = {
  productOption: Ptp.string,
  handleCreationForm: Ptp.func.isRequired,
  isAnUpdate: Ptp.bool,
  isAnEye: Ptp.bool,
  productUpdate: Ptp.object,
  handleUpdate: Ptp.func.isRequired,
  options: Ptp.array,
  resetForm: Ptp.func,
  handleSelection: Ptp.func.isRequired,
  loadOptions: Ptp.func.isRequired,
  loading: Ptp.bool,
};

export default ProductoForm;
