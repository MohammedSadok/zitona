import { useEffect, useState } from "react";
import axios from "axios";

const useParseil = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParseilData = async () => {
      try {
        const response = await axios.get("http://192.168.1.103:3000/parseils");
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParseilData();
  }, []);

  return { loading, data, error, setData };
};

export default useParseil;
