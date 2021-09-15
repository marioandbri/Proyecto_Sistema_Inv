import React from "react";
import ProductoForm from "./ProductoForm";

const ProductModal = ({
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
  closeModal,
}) => {
  return (
    <>
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          <ProductoForm
            productOption={productOption}
            handleSelection={handleSelection}
            handleCreationForm={handleCreationForm}
            isAnEye={isAnEye}
            isAnUpdate={isAnUpdate}
            productUpdate={productUpdate}
            handleUpdate={handleUpdate}
            loadOptions={loadOptions}
            options={options}
            loading={loading}
          />
        </div>
        <button
          onClick={() => {
            closeModal();
          }}
          className="modal-close is-danger"
        ></button>
      </div>
    </>
  );
};

export default ProductModal;
