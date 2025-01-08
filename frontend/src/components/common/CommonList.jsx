import { useEffect, useState } from "react";
import CommonListItem from "./CommonListItem";
import StatusMessage from "./StatusMessage";

function CommonList({ getAllData, deleteData }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  async function fetchAllData() {
    try {
      const result = await getAllData();

      if (!result.success) {
        alert("Failed to fetch data.");
        setError("Failed to fetch data.");
      }

      setData(result.data);
    } catch (error) {
      alert("Failed to fetch data.");
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div>
        <StatusMessage type="loading" message="Fetching data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <StatusMessage type="error" message={error} />
      </div>
    );
  }

  return (
    <div>
      {data.length > 0 && (
        <ul className="bg-teal-50 border border-teal-200 p-4 rounded-lg flex flex-col gap-4">
          {data.map((dataItem) => {
            return (
              <CommonListItem
                key={dataItem._id}
                id={dataItem._id}
                img={dataItem.image}
                title={dataItem.name}
                desc={dataItem.slug}
                fetchAllData={fetchAllData}
                deleteData={deleteData}
              />
            );
          })}
        </ul>
      )}
      {data.length === 0 && <StatusMessage message="No data to show." />}
    </div>
  );
}

export default CommonList;
