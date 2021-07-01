import React from "react";
import { Media } from "reactstrap";

export const ActualPrice = ({ rates }) => {
  return (
    <Media>
      <Media body className="d-flex">
        <div className="mx-2">
          <p className="text-muted mb-2">Compra</p>
          <h5 className="mb-0">
            {rates[0].buy.toFixed(3)}
            {rates[1] && rates[0].buy < rates[1].buy && <i className="ml-2 mdi mdi-arrow-down text-danger" />}
            {rates[1] && rates[0].buy > rates[1].buy && <i className="ml-2 mdi mdi-arrow-up text-success" />}
            {rates[1] && rates[0].buy === rates[1].buy && <i className="ml-2 mdi mdi-equal text-blue" />}
          </h5>
        </div>
        <div className="mx-2">
          <p className="text-muted mb-2">Venta</p>
          <h5 className="mb-0">
            {rates[0].sell.toFixed(3)}
            {rates[1] && rates[0].sell < rates[1].sell && <i className="ml-2 mdi mdi-arrow-down text-danger" />}
            {rates[1] && rates[0].sell > rates[1].sell && <i className="ml-2 mdi mdi-arrow-up text-success" />}
            {rates[1] && rates[0].sell === rates[1].sell && <i className="ml-2 mdi mdi-equal text-blue" />}
          </h5>
        </div>
      </Media>
    </Media>
  );
};
