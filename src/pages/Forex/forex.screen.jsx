import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getForexInit, getForexRatesInit, getAllRatesInit } from '../../store/actions';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import FlagsSelect from '../../components/UI/FormItems/FlagsSelect';
import { ActualPrice } from './components/actual-price.component';
import { AddPrice } from './components/forms/add-price.component';
import PricesTable from './components/prices-table.component';

export const ForexScreen = () => {
  const [forex, setForex] = useState(null);
  const dispatch = useDispatch();
  const { forexTypes, activeRates, allRates, isLoading, isUpdating } = useSelector((state) => state.Forex);
  const forexOptions = forexTypes.length > 0 ? forexTypes.map((type) => ({ label: 'USD/PEN', value: type.id, image: `/images/flags/USDPEN.svg` })) : [];

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
        <Breadcrumbs title='Forex' breadcrumbItem='Par de monedas' />
        <Row>
          <Col lg='6'>
            <Row>
              <Col className='col-12'>
                <Card className='mini-stats-wid'>
                  <CardBody>
                    <h4 className='card-title mb-4'>Par de monedas disponibles</h4>

                    <form style={{ width: '70%' }}>
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
          <Col className={isLoading ? 'd-flex align-items-center justify-content-center' : ''}>
            {isLoading && <Spinner />}
            {activeRates && (
              <Row>
                <Col lg='4'>
                  <Card className='mini-stats-wid'>
                    <CardBody>
                      <ActualPrice rates={activeRates} />
                    </CardBody>
                  </Card>
                </Col>
                <Col lg='8'>
                  <AddPrice currentPrice={activeRates[0]} isUpdating={isUpdating} isLoading={isLoading} />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
