import React from "react";
import { useDispatch } from "react-redux";
import { editCbBalance } from "../../store/actions";
import { useFormik } from "formik";
import { Card, CardBody } from "reactstrap";

import Input from "../../components/UI/FormItems/Input";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const EditBalance = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { balance: props.balanceNumber, accountId: props.id },
    enableReinitialize: true,
    onSubmit: (values) => dispatch(editCbBalance(values)),
  });

  return (
    <>
      <Breadcrumbs title='Editar balance' breadcrumbItem='Editar' />
      <Card>
        <CardBody>
          <form onSubmit={formik.handleSubmit}>
            <Input name='balance' label='Balance de cuenta' type='number' value={formik.values.balance} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <button type='submit' className={`btn btn-primary ld-ext-right ${props.isProcessing && "running"}`}>
              <div className='ld ld-ring ld-spin'></div>
              Agregar balance
            </button>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default EditBalance;
