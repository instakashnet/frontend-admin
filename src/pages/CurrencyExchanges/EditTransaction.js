import React from "react";
import { connect } from "react-redux";
import { editExchange } from "../../store/actions";
import { Formik, Form } from "formik";
import { Button, Col, Row, Spinner } from "reactstrap";
import { editCurrencyExchangeValues } from "../../helpers/forms/values";
import { editExchangeValidation } from "../../helpers/forms/validation";

import Input from "../../components/UI/FormItems/Input";
import CustomSelect from "../../components/UI/FormItems/CustomSelect";
import Checkbox from "../../components/UI/FormItems/Checkbox";
import Select from "../../components/UI/FormItems/Select";

const EditTransaction = (props) => {
  const { details } = props;

  const accountBanks = props.banks.filter((bank) => bank.isAccount);

  const bankOptions =
    accountBanks.length > 0
      ? accountBanks.map((bank) => ({
          value: bank.idBank,
          label: bank.name,
          image: bank.image,
        }))
      : [
          { value: 20, label: "Interbank" },
          { value: 1, label: "BCP" },
        ];

  const calculateAmountReceive = (values, setFieldValue) => {
    const { amountSell, preferentialRate } = values;
    const { idMoneda } = details.bancoEnvia;

    if (amountSell > 0 && preferentialRate > 0) {
      setFieldValue("amountReceive", idMoneda === 1 ? +(amountSell * preferentialRate).toFixed(2) : +(amountSell / preferentialRate).toFixed(2));
    } else return;
  };

  const onSubmit = (values) => props.editExchange(props.id, props.details, values, props.update);

  return (
    <Formik initialValues={editCurrencyExchangeValues} validationSchema={editExchangeValidation} onSubmit={onSubmit}>
      {({ isValid, values, errors, touched, setFieldValue }) => (
        <Form className='text-left'>
          <Row className='justify-content-between'>
            <Col md='4'>
              <CustomSelect name='idBankSend' label='Banco de origen' options={bankOptions} />
              <Input name='transferNumber' type='text' label='Nro. de transferencia' />
              <Checkbox name='isPreferential' label='¿Tiene tasa preferencial?' value={values.isPreferential} />
              {values.isPreferential ? (
                <>
                  <Input name='amountSell' type='number' label='Monto a recibir' error={errors.amountSell} touched={touched.amountSell} />
                  <Input
                    name='amountReceive'
                    value={values.amountReceive}
                    type='number'
                    label='Monto a enviar'
                    error={errors.amountReceive}
                    touched={touched.amountReceive}
                    disabled
                  />
                  <Input name='preferentialRate' type='number' label='Tasa preferencial' error={errors.preferentialRate} touched={touched.preferentialRate} />
                  <Button color='secondary' disabled={!values.amountSell || !values.preferentialRate} onClick={calculateAmountReceive.bind(this, values, setFieldValue)}>
                    Calcular monto
                  </Button>
                </>
              ) : null}
            </Col>
            <Col md='4' className='text-right'>
              <CustomSelect name='idBankReceive' label='Banco a enviar' options={bankOptions} />
              <Select name='accountType' label='Tipo de cuenta'>
                <option value=''>Selecciona una opción</option>
                <option value='Cuenta corriente'>Corriente</option>
                <option value='Cuenta de ahorros'>De Ahorros</option>
              </Select>
              <Input name='accountNumber' type='text' label='Nro. de cuenta' />
            </Col>
            <Col md='6' className='mt-3'>
              <Button type='submit' disabled={!isValid} color='primary' className='mr-3'>
                {props.isProcessing ? <Spinner style={{ width: "0.7rem", height: "0.7rem" }} type='grow' color='light' /> : null}
                {props.isProcessing ? "Actualizando..." : "Actualizar"}
              </Button>

              <Button color='danger' onClick={props.cancelEdit}>
                Regresar
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default connect(null, { editExchange })(React.memo(EditTransaction));
