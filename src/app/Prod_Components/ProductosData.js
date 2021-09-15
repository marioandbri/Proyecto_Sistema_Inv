import React, { useEffect, useState } from "react";
import ProductoItem from "./ProductoItem";
import LoadingBar from "../LoadingBar";
import SortingButton from "../SortingButton";

const ProductosData = ({
  loading,
  data,
  headers,
  productType,
  handleEdit,
  handleEye,
  handleRemove,
  sortingData
}) => {
  // console.log(loading, productType);
  if (loading || headers.includes('Not Found')) {
    return <LoadingBar />;
  }
  const initialState = {
    tableHeader: [],
    tableData: [],
  };

  const [tableHeader, setTableHeader] = useState(initialState.tableHeader);
  const [tableData, setTableData] = useState(initialState.tableData);
  // const [items, setItems] = useState(initialState.items);

  const cargarHeaders = () => {
    setTableHeader(headers);
  };
  const cargarData = () => {
    setTableData(data);
    setItems(data)
  };

  useEffect(() => {
    cargarHeaders();
    cargarData();
    console.log('data changed')

    return () => { };
  }, [headers, data]);
  useEffect(() => {
    setTableHeader(headers);
    setTableData(data);
    return () => {
      setTableHeader(initialState.tableHeader);
    };
  }, []);

  // console.log(tableData, 'tableData ProductosData')
  const [items, setItems] = useState(data);
  // console.log(items, 'items')
  useEffect(() => {
    console.log(data, items)
    console.log('items changed')
    return () => {

    };
  }, [items]);

  return (
    <>
      <div className="box block">
        <div className="table-container">
          <table className="table is-narrow is-hoverable">
            <thead className="">
              <tr className="">
                {/* {console.log(data)} */}
                {tableHeader !== initialState.tableHeader ? (
                  tableHeader.map((elem, index) => <th className="mr-4" key={index}><span className="is-clickable">
                    {elem}<SortingButton setItems={setItems} productType={productType} fieldName={elem} sortingData={sortingData} field={!productType.includes('generic') ? tableData.map(e => e.item) : tableData} /></span></th>)
                ) : (
                  <th>LOADING</th>
                )}
                {!productType.includes('generic') ? <th >Descripcion</th> : <th></th>}
              </tr>
            </thead>
            <tbody>
              {/* {items.map(e => console.log(e, 'items map'))} */}
              {items.map((elem, index) => (
                <ProductoItem
                  handleEdit={handleEdit}
                  handleRemove={handleRemove}
                  handleEye={handleEye}
                  productType={productType}
                  key={elem.PartNumber ? elem.PartNumber : elem.partNumber}
                  item={elem}
                  descripcion={elem.description ? elem.description : ""}
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
