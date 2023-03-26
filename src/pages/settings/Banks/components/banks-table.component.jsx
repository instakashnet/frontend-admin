import React, { useState, useEffect } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { banksColumns } from "../../../../helpers/tables/columns";

import { Table } from "../../../../components/UI/tables/table.component";

const BanksList = ({ isLoading, isProcessing, data: banks, onForm, onToggle }) => {
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
          enabled: bank.enabled,
        }))
      );
    }
  }, [banks]);

  return (
    <>
      <Button className="btn-primary mb-3" onClick={() => onForm()}>
        Agregar banco
      </Button>
      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table title="Bancos aceptados" columns={banksColumns({ onToggle, onForm })} data={data} isLoading={isLoading ? isLoading : isProcessing} />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default BanksList;
