import axios from "axios";
import apiKey from "./apiKey";

/**
 * charge les devises taux de conversion depuis l'API fixer.io
 *
 * @param setApiDevicesRates state hook setterà appeler pour fournir les taux de conversion
 * @param setApiDown state hook setter à appeler pour spécifier que l'API ne réponds pas
 * @param setIsLoading state hook setter à appeler pour spécifier que l'état du chargement
 */
export default (setApiDevicesRates, setApiDown, setIsLoading) => {
  console.log("loading");
  axios
    .get("http://data.fixer.io/api/latest", {
      params: {
        base: "EUR",
        access_key: apiKey
      }
    })
    .then(response => {
      if (!response.data || !response.data.success || !response.data.rates) {
        return Promise.reject(response);
      }
      setApiDevicesRates(response.data.rates);
    })
    .catch(err => {
      console.log("fetching api error:", err);
      setApiDown(true);
    })
    .finally(() => setIsLoading(false));
};
