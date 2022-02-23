import React, { useEffect, useState } from "react";
import { Switch } from "@material-ui/core";

export const ConnectedStatus = ({ isOnline, setIsOnline }) => {
  const [isActive, setIsActive] = useState(isOnline);

  useEffect(() => {
    setIsActive(isOnline);
  }, [isOnline]);

  return (
    <div className="flex items-center">
      <span className="d-xl-inline-block mx-2 text-muted text-xs">
        {isActive ? "disponible" : "ausente"}
        <i className={`mdi mdi-circle ${isActive ? "text-success" : "text-warning"} align-middle ml-1`} />
      </span>
      <Switch checked={isActive} onChange={setIsOnline} inputProps={{ "aria-label": "habilitar operador" }} />
    </div>
  );
};
