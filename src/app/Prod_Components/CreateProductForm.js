import React, { useEffect } from "react";
import LoadingBar from "../LoadingBar";
import ComputersForm from "./ComputersForm";
import GenericProductForm from "./GenericProductForm";
import MonitorForm from "./MonitorForm";
import PrinterForm from "./PrinterForm";
import ProductTypeForm from "./ProductTypeForm";
import ProyectorForm from "./ProyectorForm";

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

export default CreateProductForm;
