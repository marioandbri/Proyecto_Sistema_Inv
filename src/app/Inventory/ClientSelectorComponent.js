import React, { useState, useEffect } from "react";
import LoadingBar from "../LoadingBar";
import Cliente from "./ClienteComp";
import { useFetch } from "../useFetch";
import Pagination, { currentItems } from "../Pagination";
import Filter from "../Filter";
import { useFilter } from "../useFilter";
import InventoryForm from "./InventoryForm";

const ClientSelectorComponent = () => {
  const paginate = (number) => {
    setcurrentPage(number);
  };

  const [currentPage, setcurrentPage] = useState(1);
  const url = "/cliente";
  const { loading, data } = useFetch(url);

  const [query, setQuery] = useState("");
  const dataFiltered = useFilter(query, data);
  console.log(dataFiltered);
  const dataPage = currentItems(query ? dataFiltered : data, 20, currentPage);

  if (!loading) {
    return (
      <>
        <div className="tile is-child box is-clipped">
          <span className="title">Empresas</span>
          <Filter setQuery={setQuery} />
          <div className="tile">
            <div className="tile is-child is-6 box m-1">
              <table className="table is-narrow is-hoverable is-bordered is-size-7 has-text-weight-semibold">
                <tbody>
                  {dataPage.map((e) => (
                    <tr key={e.rut}>
                      <Cliente {...e} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <InventoryForm />
          </div>

          <div className="block m-1 mt-3">
            <Pagination
              itemsPerPage={20}
              totalItems={query ? dataFiltered.length : data.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="tile is-child box is-clipped">
        <LoadingBar />
      </div>
    </>
  );
};

export default ClientSelectorComponent;
