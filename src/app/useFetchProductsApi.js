import { useEffect, useRef, useReducer } from "react";

const initialState = {
  PN: "",
  productData: "",
  loading: false,
  mounted: true,
};
const types = {
  SET_LOADING: "update loading state",
  SET_PRODUCTDATA: "update product data",
  SET_MOUNTED: "Update component mounted state",
};

export const fetchApiReducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return { ...state, loading: action.payload };
    case types.SET_PRODUCTDATA:
      return {
        ...state,
        productData: action.payload.data,
        loading: action.payload.loading,
      };
    case types.SET_MOUNTED:
      return { ...state, mounted: action.payload };

    default:
      return state;
  }
};

export const useFetchProductsApi = (PN) => {
  const cache = useRef({});
  const url = `https://publicapi.solotodo.com/products/?part_number=${PN}`;
  const url2 = `https://publicapi.solotodo.com/products/?search=${PN}`;

  const [state, dispatch] = useReducer(fetchApiReducer, initialState);
  // const [data, setData] = useState([]);
  // const [isMounted, setIsMounted] = useState(true);
  // console.log(!url, url, "url");

  useEffect(() => {
    const getData = async () => {
      dispatch({ type: types.SET_LOADING, payload: true });
      if (!PN) {
        dispatch({
          type: types.SET_PRODUCTDATA,
          payload: { data: "", loading: false },
        });
        return;
      }
      if (cache.current[url]) {
        const cdata = cache.current[url];
        console.log(cdata, "cache");
        // if (isMounted) {
        dispatch({
          type: types.SET_PRODUCTDATA,
          payload: { data: cdata, loading: false },
        });
        // }
      } else {
        const res = await fetch(url);
        let cdata = await res?.json();
        console.log(Boolean(cdata.results), "result partnumber api search");
        if (cdata.results) {
          const res2 = await fetch(url2);
          cdata = await res2.json();
        }
        console.log(Boolean(cdata.results), "result search api search");

        cache.current[url] = cdata;
        console.log(cdata, "fetched");
        // if (isMounted) {
        dispatch({
          type: types.SET_PRODUCTDATA,
          payload: { data: cdata, loading: false },
        });
        // }
      }
      // const data = Boolean(url)
      //   ? await res?.json()
      //   : new Error("Solicitud no valida");
    };
    // console.log(data);
    getData();

    return dispatch({ type: types.SET_MOUNTED, payload: false });
  }, [url]);
  // console.log(data)
  return { loading: state.loading, data: state.productData };
};
