import React from "react";
import { Switch, CircularProgress } from "@material-ui/core";

export const ConnectedStatus = ({ isOnline, label, isProcessing, setIsOnline }) => {
  return (
    <div className="flex items-center">
      {label && (
        <span className="d-xl-inline-block mx-2 text-muted text-xs">
          {isOnline ? "disponible" : "ausente"}
          <i className={`mdi mdi-circle ${isOnline ? "text-success" : "text-warning"} align-middle ml-1`} />
        </span>
      )}
      {isProcessing ? <CircularProgress size={20} color="secondary" /> : <Switch checked={isOnline} onChange={setIsOnline} inputProps={{ "aria-label": "habilitar operador" }} />}
    </div>
  );
};
