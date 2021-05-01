import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

//import Charts
import StackedColumnChart from './StackedColumnChart';
import UsersChart from './UsersChart';

import Counters from './Counters';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//i18n
import { withNamespaces } from 'react-i18next';

const Dashboard = (props) => {
  const { currencyBarData } = useSelector((state) => state.Charts);

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title={props.t('Dashboard')} breadcrumbItem={props.t('Dashboard')} />
          <Row>
            <Col xl='12'>
              <Row>
                <Counters />
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xl='6'>
              <StackedColumnChart data={currencyBarData} title='Movimiento cambios de divisa' />
            </Col>
            <Col xl='6'>
              <UsersChart />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withNamespaces()(Dashboard);
