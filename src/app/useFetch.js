import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await fetch(url);
    const data = Boolean(url)
      ? await res?.json()
      : new Error("Solicitud no valida");
    setData(data);
    setLoading(false);
  };
  console.log(data);

  useEffect(() => {
    getData();
  }, [url]);
  // console.log(data)
  return { loading, data };
};
