import React from "react";
import moment from "moment";
import { CheckCircleOutline } from "@material-ui/icons";
import { formatAmount } from "../../../helpers/functions";

export const ClosedBalances = ({ closedBalances }) => {
  return (
    <div className="text-center">
      <h3 className="text-muted">Balances cerrados correctamente</h3>
      <CheckCircleOutline htmlColor="#00ad97" fontSize="large" className="mt-1 mb-4" />
      <div className="flex flex-wrap items-center justify-center">
        <h4 className="md:mx-3 font-bold">$ {formatAmount(closedBalances.USD.amount)}</h4>
        <h4 className="md:mx-3 font-bold">S/. {formatAmount(closedBalances.PEN.amount)}</h4>
      </div>
      <p>{moment().format("DD/MM/YYYY hh:mm a")}</p>
    </div>
  );
};
