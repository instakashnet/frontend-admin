import { Card, CardBody, CardTitle, Col } from 'reactstrap';

const UserKash = ({ kashQty }) => {
  const iconKashStyle = { filter: !kashQty ? 'grayscale(80%)' : 'grayscale(0%)' };

  return (
    <Col lg='6'>
      <Card>
        <CardBody className='text-center'>
          <CardTitle className='text-left'>KASH acumulados</CardTitle>
          <img src={`/images/banks/kash.svg`} alt='Moneda KASH' width={85} className='mt-3 mb-2 mx-auto' style={iconKashStyle} />
          <p className='m-0'>
            Tiene <span className={`${kashQty ? 'text-yellow-300' : 'text-gray-400'} font-bold`}>{kashQty} KASH</span> acumulados.
          </p>
        </CardBody>
      </Card>
    </Col>
  );
};

export default UserKash;
