import axios from "axios";
import { createContext, useEffect, useState } from "react";

const SportContext = createContext(null);

function SportContextProvider({ children }: any) {
  const [sports, setSports] = useState([]);
  const [index, setIndex] = useState(
    !localStorage.getItem("index") ? 0 : parseInt(localStorage.getItem("index"))
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "https://dff6kz4nmb.execute-api.us-east-1.amazonaws.com/development/test-front"
        );
        setSports(response.sports);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const nextSport = () => {
    setIndex(
      index === sports.length - 1 ? index - sports.length + 1 : index + 1
    );
  };

  localStorage.setItem("index", index.toString());

  const values = {
    sports: sports,
    index: index,
    nextSport: nextSport,
  };

  return (
    <SportContext.Provider value={values}>
      {!loading && children}
    </SportContext.Provider>
  );
}

export { SportContextProvider, SportContext };