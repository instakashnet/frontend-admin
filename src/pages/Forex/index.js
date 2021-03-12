import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Media, Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getForexInit, getForexRatesInit, getAllRatesInit } from "../../store/actions";
import { addCurrencyPrice } from "../../store/actions";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import AddCurrency from "./AddCurrencyPrice";
import FlagsSelect from "../../components/UI/FormItems/FlagsSelect";
import PricesTable from "./Prices";
import Alert from "../../components/UI/Alert";

const Forex = () => {
  const [forex, setForex] = useState(null);
  const dispatch = useDispatch();
  const { forexTypes, activeRates, allRates, isLoading, error, success } = useSelector((state) => state.Forex);
  const forexOptions = forexTypes.length > 0 ? forexTypes.map((type) => ({ label: "USD/PEN", value: type.id, image: `${process.env.PUBLIC_URL}/images/flags/USDPEN.svg` })) : [];

  useEffect(() => {
    dispatch(getForexInit());
    dispatch(getAllRatesInit());
  }, [dispatch]);

  const onForexChange = (option) => {
    setForex(option.value);
    option.value && dispatch(getForexRatesInit(option.value));
  };

  return (
    <div className='page-content'>
      <Container fluid>
        {error && <Alert color='danger' error={error} />}
        {success && <Alert color='success' error={success} />}
        <Breadcrumbs title='Forex' breadcrumbItem='Par de monedas' />
        <Row>
          <Col lg='6'>
            <Row>
              <Col className='col-12'>
                <Card className='mini-stats-wid'>
                  <CardBody>
                    <h4 className='card-title mb-4'>Par de monedas disponibles</h4>

                    <form style={{ width: "70%" }}>
                      <FlagsSelect options={forexOptions} onChange={onForexChange} value={forex} />
                    </form>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <PricesTable isLoading={isLoading} rates={allRates} />
              </Col>
            </Row>
          </Col>
          {isLoading && (
            <Col lg='6' className='d-flex align-items-center justify-content-center'>
              <Spinner />
            </Col>
          )}
          {activeRates && (
            <>
              <Col lg='2'>
                <Card className='mini-stats-wid'>
                  <CardBody>
                    <Media>
                      <Media body className='d-flex'>
                        <div className='mx-2'>
                          <p className='text-muted mb-2'>Compra</p>
                          <h5 className='mb-0'>
                            {activeRates[0].buy.toFixed(3)}
                            {activeRates[1] && activeRates[0].buy < activeRates[1].buy && <i className='ml-2 mdi mdi-arrow-down text-danger' />}
                            {activeRates[1] && activeRates[0].buy > activeRates[1].buy && <i className='ml-2 mdi mdi-arrow-up text-success' />}
                            {activeRates[1] && activeRates[0].buy === activeRates[1].buy && <i className='ml-2 mdi mdi-equal text-blue' />}
                          </h5>
                        </div>
                        <div className='mx-2'>
                          <p className='text-muted mb-2'>Venta</p>
                          <h5 className='mb-0'>
                            {activeRates[0].sell.toFixed(3)}
                            {activeRates[1] && activeRates[0].sell < activeRates[1].sell && <i className='ml-2 mdi mdi-arrow-down text-danger' />}
                            {activeRates[1] && activeRates[0].sell > activeRates[1].sell && <i className='ml-2 mdi mdi-arrow-up text-success' />}
                            {activeRates[1] && activeRates[0].sell === activeRates[1].sell && <i className='ml-2 mdi mdi-equal text-blue' />}
                          </h5>
                        </div>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
              <Col lg='4'>
                <AddCurrency addCurrency={addCurrencyPrice} currentPrice={activeRates[0]} />
              </Col>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Forex;
