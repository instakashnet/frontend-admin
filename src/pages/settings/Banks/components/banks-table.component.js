import React, { useState, useEffect } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { banksColumns } from "../../../../helpers/tables/columns";

import { Table } from "../../../../components/UI/tables/table.component";

const BanksList = ({ isLoading, data: banks, onAdd }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (banks.length > 0) {
      setData(
        banks.map((bank) => ({
          id: bank.id,
          bankName: bank.name,
          country: bank.country.name,
          currencies: bank.currencies.map((currency) => currency.ISO).join(", "),
          isDirect: bank.active,
        }))
      );
    }
  }, [banks]);

  return (
    <>
      <Button className="btn-primary mb-3" onClick={onAdd}>
        Agregar banco
      </Button>
      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table title="Bancos aceptados" columns={banksColumns({})} data={data} isLoading={isLoading} />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default BanksList;
