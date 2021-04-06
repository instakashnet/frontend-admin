import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addCurrencyPrice } from "../../store/actions";
import { Button, Card, CardBody, Row, Col, Label, Spinner } from "reactstrap";
import { currencyPriceValues } from "../../helpers/forms/values";
import { validateUpdateCurrencyPrice } from "../../helpers/forms/validation";

import RangeInput from "../../components/UI/FormItems/RangeInputNumber";
import CustomButton from "../../components/UI/Button";

const AddCurrencyPrice = (props) => {
  const dispatch = useDispatch();
  const { isLoading, isUpdating } = useSelector((state) => state.Forex);

  let toBuy = String(props.currentPrice.buy).split("");
  let toSell = String(props.currentPrice.sell).split("");

  const onSubmit = (values) => {
    const ratesValues = {
      buy: +`${values.toBuy1}.${values.toBuy2}${values.toBuy3}${values.toBuy4}`,
      sell: +`${values.toSell1}.${values.toSell2}${values.toSell3}${values.toSell4}`,
      forexId: props.currentPrice.forexId,
    };

    dispatch(addCurrencyPrice(ratesValues));
  };

  const formik = useFormik({
    initialValues: currencyPriceValues(toBuy, toSell),
    validationSchema: validateUpdateCurrencyPrice,
    onSubmit,
    enableReinitialize: true,
  });

  const shutdown = () => {
    formik.setFieldValue("toBuy1", 0);
    formik.setFieldValue("toBuy2", 0);
    formik.setFieldValue("toBuy3", 0);
    formik.setFieldValue("toBuy4", 0);
    formik.setFieldValue("toSell1", 0);
    formik.setFieldValue("toSell2", 0);
    formik.setFieldValue("toSell3", 0);
    formik.setFieldValue("toSell4", 0);
  };
  // const onSubmit = (values) => props.addCurrency(values, props.updateTable);

  return (
    <Card>
      <CardBody className='text-center position-relative'>
        {isLoading ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Label className='my-2'>COMPRA</Label>
            <Row>
              <Col className='col-12 d-flex flex-row align-items-end justify-content-center'>
                <RangeInput name='toBuy1' error={formik.errors.toBuy1} touched={formik.touched.toBuy1} setValue={formik.setFieldValue} value={formik.values.toBuy1} />
                <span style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0 0 25px" }}>&#x0002E;</span>
                <RangeInput name='toBuy2' error={formik.errors.toBuy2} touched={formik.touched.toBuy2} setValue={formik.setFieldValue} value={formik.values.toBuy2} />
                <RangeInput name='toBuy3' error={formik.errors.toBuy3} touched={formik.touched.toBuy3} setValue={formik.setFieldValue} value={formik.values.toBuy3} />
                <RangeInput name='toBuy4' error={formik.errors.toBuy4} touched={formik.touched.toBuy4} setValue={formik.setFieldValue} value={formik.values.toBuy4} />
              </Col>
            </Row>
            <hr />
            <Label className='my-2'>VENTA</Label>
            <Row>
              <Col className='col-12 d-flex flex-row align-items-end justify-content-center'>
                <RangeInput name='toSell1' error={formik.errors.toSell1} touched={formik.touched.toSell1} setValue={formik.setFieldValue} value={formik.values.toSell1} />
                <span style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0 0 25px" }}>&#x0002E;</span>
                <RangeInput name='toSell2' setValue={formik.setFieldValue} value={formik.values.toSell2} />
                <RangeInput name='toSell3' setValue={formik.setFieldValue} value={formik.values.toSell3} />
                <RangeInput name='toSell4' setValue={formik.setFieldValue} value={formik.values.toSell4} />
              </Col>
            </Row>
            <Button type='submit' color='primary' className='mt-3' disabled={!formik.isValid}>
              {isUpdating ? <Spinner /> : null}
              {isUpdating ? "Actualizando..." : "Actualizar precio"}
            </Button>
            <CustomButton className='position-absolute' style={{ top: 20, right: 10 }} type='button' onClick={shutdown}>
              <span className='bx bx-power-off bx-sm text-danger' />
            </CustomButton>
          </form>
        )}
      </CardBody>
    </Card>
  );
};

export default AddCurrencyPrice;
