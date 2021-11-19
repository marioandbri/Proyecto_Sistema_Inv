import { useState, useEffect, useRef } from "react";

export const useFetch = (url) => {
  const cache = useRef({});
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  // const [isMounted, setIsMounted] = useState(true);
  // console.log(!url, url, "url");

  const getData = async () => {
    setLoading(true);
    if (!url) {
      return;
    }
    if (cache.current[url]) {
      const cdata = cache.current[url];
      // console.log(cdata, "cache");
      // if (isMounted) {
      setData(cdata);
      setLoading(false);
      // }
    } else {
      const res = await fetch(url);
      const cdata = await res?.json();
      cache.current[url] = cdata;
      // console.log(cdata, "fetched");
      // if (isMounted) {
      setData(cdata);
      setLoading(false);
      // }
    }
    // const data = Boolean(url)
    //   ? await res?.json()
    //   : new Error("Solicitud no valida");
  };
  // console.log(data);

  useEffect(() => {
    getData();
    return;
    // setIsMounted(false);
  }, [url]);
  // console.log(data)
  return { loading, data };
};
