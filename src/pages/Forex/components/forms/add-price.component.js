import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addCurrencyPrice } from "../../../../store/actions";
import { Button, Card, CardBody, Row, Col, Label, Spinner } from "reactstrap";
import { currencyPriceValues } from "../../../../helpers/forms/values";
import { validateUpdateCurrencyPrice } from "../../../../helpers/forms/validation";

import RangeInput from "../../../../components/UI/FormItems/RangeInputNumber";
import CustomButton from "../../../../components/UI/Button";

export const AddPrice = ({ isLoading, isUpdating, currentPrice }) => {
  const dispatch = useDispatch();

  let toBuy = String(currentPrice.buy).split("");
  let toSell = String(currentPrice.sell).split("");

  const onSubmit = (values) => {
    const ratesValues = {
      buy: +`${values.toBuy1}.${values.toBuy2}${values.toBuy3}${values.toBuy4}${values.toBuy5}`,
      sell: +`${values.toSell1}.${values.toSell2}${values.toSell3}${values.toSell4}${values.toSell5}`,
      forexId: currentPrice.forexId,
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
    formik.setFieldValue("toBuy5", 0);
    formik.setFieldValue("toSell1", 0);
    formik.setFieldValue("toSell2", 0);
    formik.setFieldValue("toSell3", 0);
    formik.setFieldValue("toSell4", 0);
    formik.setFieldValue("toSell5", 0);
  };

  return (
    <Card>
      <CardBody className="text-center position-relative">
        {isLoading ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Label className="my-2">COMPRA</Label>
            <Row>
              <Col className="col-12 d-flex flex-row align-items-end justify-content-center">
                <RangeInput name="toBuy1" error={formik.errors.toBuy1} touched={formik.touched.toBuy1} setValue={formik.setFieldValue} value={formik.values.toBuy1} />
                <span style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0 0 25px" }}>&#x0002E;</span>
                <RangeInput name="toBuy2" error={formik.errors.toBuy2} touched={formik.touched.toBuy2} setValue={formik.setFieldValue} value={formik.values.toBuy2} />
                <RangeInput name="toBuy3" error={formik.errors.toBuy3} touched={formik.touched.toBuy3} setValue={formik.setFieldValue} value={formik.values.toBuy3} />
                <RangeInput name="toBuy4" error={formik.errors.toBuy4} touched={formik.touched.toBuy4} setValue={formik.setFieldValue} value={formik.values.toBuy4} />
                <RangeInput name="toBuy5" error={formik.errors.toBuy5} touched={formik.touched.toBuy5} setValue={formik.setFieldValue} value={formik.values.toBuy5} />
              </Col>
            </Row>
            <hr />
            <Label className="my-2">VENTA</Label>
            <Row>
              <Col className="col-12 d-flex flex-row align-items-end justify-content-center">
                <RangeInput name="toSell1" error={formik.errors.toSell1} touched={formik.touched.toSell1} setValue={formik.setFieldValue} value={formik.values.toSell1} />
                <span style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0 0 25px" }}>&#x0002E;</span>
                <RangeInput name="toSell2" setValue={formik.setFieldValue} value={formik.values.toSell2} />
                <RangeInput name="toSell3" setValue={formik.setFieldValue} value={formik.values.toSell3} />
                <RangeInput name="toSell4" setValue={formik.setFieldValue} value={formik.values.toSell4} />
                <RangeInput name="toSell5" setValue={formik.setFieldValue} value={formik.values.toSell5} />
              </Col>
            </Row>
            <Button type="submit" className="btn-primary mt-3" disabled={!formik.isValid}>
              {isUpdating ? <Spinner size="sm" /> : "Actualizar precio"}
            </Button>
            <CustomButton className="position-absolute" style={{ top: 20, right: 10 }} type="button" onClick={shutdown}>
              <span className="bx bx-power-off bx-sm text-danger" />
            </CustomButton>
          </form>
        )}
      </CardBody>
    </Card>
  );
};
