import React from "react";
import LoadingBar from "../LoadingBar";
import ComputersForm from "./ComputersForm";
import MonitorForm from "./MonitorForm";
import PrinterForm from "./PrinterForm";
import ProductTypeForm from "./ProductTypeForm";
import ProyectorForm from "./ProyectorForm";

const CreateProductForm = ({
  productOption,
  handleCreationForm,
  isAnUpdate,
  productUpdate,
  handleUpdate,
}) => {
  if (productOption == "computadores") {
    return (
      <>
        <ComputersForm
          handleCreationForm={handleCreationForm}
          isAnUpdate={isAnUpdate}
          productUpdate={productUpdate}
          handleUpdate={handleUpdate}
        />
      </>
    );
  }
  if (productOption == "impresoras") {
    return (
      <>
        <PrinterForm
          handleCreationForm={handleCreationForm}
          isAnUpdate={isAnUpdate}
          productUpdate={productUpdate}
          handleUpdate={handleUpdate}
        />
      </>
    );
  }
  if (productOption == "monitores") {
    return (
      <>
        <MonitorForm
          handleCreationForm={handleCreationForm}
          isAnUpdate={isAnUpdate}
          productUpdate={productUpdate}
          handleUpdate={handleUpdate}
        />
      </>
    );
  }
  if (productOption == "proyectores") {
    return (
      <>
        <ProyectorForm
          handleCreationForm={handleCreationForm}
          isAnUpdate={isAnUpdate}
          productUpdate={productUpdate}
          handleUpdate={handleUpdate}
        />
      </>
    );
  }
  if (productOption == "productType") {
    return (
      <>
        <ProductTypeForm
          handleCreationForm={handleCreationForm}
          isAnUpdate={isAnUpdate}
          productUpdate={productUpdate}
          handleUpdate={handleUpdate}
        />
      </>
    );
  }
  return <LoadingBar />;
};

export default CreateProductForm;
