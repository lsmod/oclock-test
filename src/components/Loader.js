import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

function Loader(props) {
  return (
    <div>
      <CircularProgress />
      <br />
      Chargement des taux de change
    </div>
  );
}

export default Loader;
