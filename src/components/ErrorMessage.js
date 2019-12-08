import React from "react";
import BugReport from "@material-ui/icons/BugReport";

// affiche un message d'erreur dans le cas ou l'API ne serait pas joinable
function ErrorMessage(props) {
  return (
    <div>
      <BugReport />
      <br />
      Impossible de charger les derniers taux de change.
      <br />
      Veuillez ré-essayer plutard
    </div>
  );
}

export default ErrorMessage;
