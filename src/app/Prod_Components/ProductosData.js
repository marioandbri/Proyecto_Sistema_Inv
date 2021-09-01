import React, { useEffect, useState } from "react";
import ProductoItem from "./ProductoItem";
import LoadingBar from "../LoadingBar";

const ProductosData = ({
  loading,
  data,
  headers,
  productType,
  handleEdit,
  handleRemove,
}) => {
  console.log(loading, productType);
  if (loading) {
    return <LoadingBar />;
  }
  const initialState = {
    tableHeader: [],
    tableData: [],
  };

  const [tableHeader, setTableHeader] = useState(initialState.tableHeader);
  const [tableData, setTableData] = useState(initialState.tableData);
  const [items, setItems] = useState(initialState.items);

  const cargarHeaders = () => {
    setTableHeader(headers);
  };
  const cargarData = () => {
    setTableData(data);
  };

  useEffect(() => {
    cargarHeaders();
    cargarData();
    return () => {};
  }, [headers]);
  useEffect(() => {
    setTableHeader(headers);
    setTableData(data);
    return () => {
      setTableHeader(initialState.tableHeader);
    };
  }, []);

  return (
    <>
      <div className="box block">
        <div className="table-container">
          <table className="table is-narrow is-hoverable">
            <thead>
              <tr>
                {console.log(data)}
                {tableHeader !== initialState.tableHeader ? (
                  tableHeader.map((elem, index) => <th key={index}>{elem}</th>)
                ) : (
                  <th>LOADING</th>
                )}
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((elem) => (
                <ProductoItem
                  handleEdit={handleEdit}
                  handleRemove={handleRemove}
                  productType={productType}
                  key={elem.item.partNumber}
                  item={elem.item}
                  descripcion={elem.description}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductosData;
