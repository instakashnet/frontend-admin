import React from "react";
import { Media } from "reactstrap";
import { convertRate } from "../../../helpers/functions";

export const ActualPrice = ({ rates }) => {
  let isBuyClass = "";
  let isSellClass = "";

  isBuyClass = rates.reduce((a, b) => (a.buy < b.buy ? "mdi-arrow-down text-danger" : a.buy > b.buy ? "mdi-arrow-up text-success" : "mdi-equal text-blue"));
  isSellClass = rates.reduce((a, b) => (a.sell < b.sell ? "mdi-arrow-down text-danger" : a.sell > b.sell ? "mdi-arrow-up text-success" : "mdi-equal text-blue"));

  return (
    <Media>
      <Media body className="d-flex">
        <div className="mx-2">
          <p className="text-muted mb-2">Compra</p>
          <h5 className="mb-0">
            {convertRate(rates[0].buy)} <i className={`ml-1 mdi ${isBuyClass}`} />
          </h5>
        </div>
        <div className="mx-2">
          <p className="text-muted mb-2">Venta</p>
          <h5 className="mb-0">
            {convertRate(rates[0].sell)} <i className={`ml-1 mdi ${isSellClass}`} />
          </h5>
        </div>
      </Media>
    </Media>
  );
};
