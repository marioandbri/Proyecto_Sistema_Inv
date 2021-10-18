import { useState, useEffect } from "react";

export const useProductTypes = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await fetch('/producto/option');
    const result = await res.json();
    let list = [...data]
    result.forEach(element => {
      list.push(element.option)
    });
    setData(list)
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return { loading, data };
};