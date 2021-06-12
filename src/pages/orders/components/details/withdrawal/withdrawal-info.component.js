import React, { useState } from "react";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { formatAmount, checkInterplaza } from "../../../../../helpers/functions";
import { editInterplazaInit } from "../../../../../store/actions";

import CopyButton from "../../../../../components/UI/CopyButton";
import Radio from "../../../../../components/UI/FormItems/Radio";

const WithdrawalInfo = ({ details, isProcessing }) => {
  const dispatch = useDispatch();
  const [editState, setEditState] = useState(false);
  let interplaza;
  if (details.bankName && checkInterplaza(details.bankName, details.accountToIdRaw)) interplaza = true;

  const formik = useFormik({
    initialValues: { interbank: null, accountId: details && details.accountToID },
    enableReinitialize: true,
    onSubmit: (values) => dispatch(editInterplazaInit(values, details.id, setEditState)),
  });

  return (
    <Card>
      <CardBody>
        <h5 className="mb-3">Datos de retiro</h5>
        <Row>
          <Col sm="6">
            <div>
              <p className="text-muted mb-2">Nro. de pedido</p>
              <h5>
                {details.uuid} <CopyButton textToCopy={details.uuid} />
              </h5>
            </div>
            <div>
              <p className="text-muted mb-2">Cantidad solicitada</p>
              <h5>
                {details.kashQty} KASH = $ {formatAmount(details.kashQty)} <CopyButton textToCopy={details.kashQty} />
              </h5>
            </div>
          </Col>
          <Col sm="6">
            <div className="text-sm-right my-3">
              <p className="text-muted mb-2">Banco que recibe</p>
              <div className="mb-2 flex items-center md:justify-end">
                <img src={`${process.env.PUBLIC_URL}/images/banks/${details.bankName}.svg`} alt={details.bankName} width={80} className="mr-2" />
                <span className="ml-2 text-muted">{details.accountToType === "savings" ? "Ahorros" : "Corriente"} Dólares</span>
              </div>
            </div>
            <div className="text-sm-right">
              <p className="text-muted mb-2">Cuenta no.</p>
              <h5>
                {details.accountToIdRaw} <CopyButton textToCopy={details.accountToIdRaw} />
              </h5>
              {editState && (
                <form onSubmit={formik.handleSubmit}>
                  <p className="text-danger">¿Esta cuenta es interplaza?</p>
                  <div className="flex justify-end">
                    <Radio name="interbank" value={"1"} onChange={formik.handleChange} label="SI" />
                    <Radio name="interbank" value={"0"} onChange={formik.handleChange} label="NO" />
                  </div>
                  <Button type="submit" className={`btn-primary ld-ext-right ${isProcessing ? "running" : ""}`} disabled={!formik.values.interbank || isProcessing}>
                    <span className="ld ld-ring ld-spin" />
                    Actualizar cuenta
                  </Button>
                </form>
              )}
              {details.accountToInterbank && !!+details.accountToInterbank && !editState && <small className="text-danger">* Esta es una cuenta interplaza.</small>}
              {interplaza && (
                <>
                  {!editState && !details.accountToInterbank && <small className="text-danger">* Parece que esta es una cuenta interplaza.</small>}
                  <br />
                  <button className="btn" onClick={() => setEditState((prev) => !prev)}>
                    <i className="fas fa-edit" /> Editar
                  </button>
                </>
              )}
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default React.memo(WithdrawalInfo);
