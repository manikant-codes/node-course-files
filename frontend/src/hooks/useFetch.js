import { useEffect, useState } from "react";

export function useFetch(initialState, getData, modifyData) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(initialState);
  const [error, setError] = useState("");

  async function fetchData() {
    try {
      const result = await getData();

      if (!result.success) {
        alert("Failed to fetch data.");
        setError("Failed to fetch data.");
        console.log("Error: ", result.message);
      }

      if (modifyData) {
        const modifiedData = modifyData(result.data);
        setData(modifiedData);
        return;
      }

      setData(result.data);
    } catch (error) {
      alert("Failed to fetch data.");
      setError("Failed to fetch data.");
      console.log("Error: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error };
}
