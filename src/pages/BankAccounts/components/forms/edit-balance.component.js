import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editCbBalance } from "../../../../store/actions";
import { Card, CardBody, Button, Spinner } from "reactstrap";

import Input from "../../../../components/UI/FormItems/Input";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";

const EditBalance = ({ onHideForm, accId, isProcessing }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");

  const onAmountHandler = (e) => setAmount(+e.target.value);

  const addBalandeHandler = (type) => {
    if (amount <= 0) return;
    dispatch(editCbBalance({ amount, type }, accId, onHideForm));
  };

  return (
    <>
      <Breadcrumbs title="Editar balance" breadcrumbItem="Editar" />
      <Card>
        <CardBody>
          <Input name="balance" label="Balance de cuenta" type="number" value={amount} onChange={onAmountHandler} />
          <div className="grid grid-cols-2">
            <Button onClick={addBalandeHandler.bind(this, "add")} className="mr-3" disabled={amount <= 0 || isProcessing}>
              {isProcessing ? <Spinner color="light" size="sm" /> : <span className="fas fa-plus" />}
            </Button>
            <Button onClick={addBalandeHandler.bind(this, "remove")} className="ml-3" disabled={amount <= 0 || isProcessing}>
              {isProcessing ? <Spinner color="light" size="sm" /> : <span className="fas fa-minus" />}
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default EditBalance;
