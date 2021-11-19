import React from "react";
import LoadingBar from "../LoadingBar";
import GenericProductForm from "./GenericProductForm";
import ProductTypeForm from "./ProductTypeForm";
import Ptp from "prop-types";

// import ComputersForm from "./ComputersForm";
// import MonitorForm from "./MonitorForm";
// import PrinterForm from "./PrinterForm";
// import ProyectorForm from "./ProyectorForm";

const CreateProductForm = ({
  productOption,
  handleCreationForm,
  isAnUpdate,
  isAnEye,
  productUpdate,
  handleUpdate,
  options,
  resetForm,
}) => {
  // useEffect(() => {
  //   loadOptions()
  //   return () => {

  //   };
  // }, []);

  // if (productOption == "computadores") {
  //   return (
  //     <>
  //       <ComputersForm
  //         handleCreationForm={handleCreationForm}
  //         isAnUpdate={isAnUpdate}
  //         isAnEye={isAnEye}
  //         productUpdate={productUpdate}
  //         handleUpdate={handleUpdate}
  //       />
  //     </>
  //   );
  // }
  // if (productOption == "impresoras") {
  //   return (
  //     <>
  //       <PrinterForm
  //         handleCreationForm={handleCreationForm}
  //         isAnUpdate={isAnUpdate}
  //         isAnEye={isAnEye}
  //         productUpdate={productUpdate}
  //         handleUpdate={handleUpdate}
  //       />
  //     </>
  //   );
  // }
  // if (productOption == "monitores") {
  //   return (
  //     <>
  //       <MonitorForm
  //         handleCreationForm={handleCreationForm}
  //         isAnUpdate={isAnUpdate}
  //         isAnEye={isAnEye}
  //         productUpdate={productUpdate}
  //         handleUpdate={handleUpdate}
  //       />
  //     </>
  //   );
  // }
  // if (productOption == "proyectores") {
  //   return (
  //     <>
  //       <ProyectorForm
  //         handleCreationForm={handleCreationForm}
  //         isAnUpdate={isAnUpdate}
  //         isAnEye={isAnEye}
  //         productUpdate={productUpdate}
  //         handleUpdate={handleUpdate}
  //       />
  //     </>
  //   );
  // }

  if (productOption == "types") {
    return (
      <>
        <ProductTypeForm
          handleCreationForm={handleCreationForm}
          isAnUpdate={isAnUpdate}
          isAnEye={isAnEye}
          productUpdate={productUpdate}
          handleUpdate={handleUpdate}
        />
      </>
    );
  }
  if (productOption != "") {
    console.log(options, "options cpf");
    let productElement = options.filter((e) => e.option == productOption);

    return (
      <GenericProductForm
        options={productElement[0]}
        handleCreationForm={handleCreationForm}
        isAnUpdate={isAnUpdate}
        isAnEye={isAnEye}
        productUpdate={productUpdate}
        handleUpdate={handleUpdate}
        resetForm={resetForm}
      />
    );
  }

  return <LoadingBar />;
};

CreateProductForm.propTypes = {
  productOption: Ptp.string,
  handleCreationForm: Ptp.func,
  isAnUpdate: Ptp.bool,
  isAnEye: Ptp.bool,
  productUpdate: Ptp.object,
  handleUpdate: Ptp.func,
  options: Ptp.array,
  resetForm: Ptp.func,
};

export default CreateProductForm;
