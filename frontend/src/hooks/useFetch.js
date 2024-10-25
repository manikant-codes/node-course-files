import { useEffect, useState } from "react";

export default function useFetch(getData, deps = []) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getData()
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [...deps]);

  return { loading, data, error };
}
