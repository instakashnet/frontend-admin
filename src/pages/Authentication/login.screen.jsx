import React from 'react';
import { Row, Col, CardBody, Card, Container, Spinner } from 'reactstrap';

// Components
import { CustomAlert } from '../../components/UI/Alert';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

// actions
import { loginUser } from '../../store/actions';

// import images
import profile from '../../assets/images/profile-img.png';
import logoIcon from '../../assets/images/icon-light.svg';

export const LoginScreen = ({ history }) => {
  const dispatch = useDispatch();
  const isProcessing = useSelector((state) => state.Login.isProcessing);

  const handleValidSubmit = (event, values) => dispatch(loginUser(values, history));

  return (
    <div className='account-pages h-screen grid items-center'>
      <Container>
        <Row className='justify-content-center'>
          <Col md={8} lg={6} xl={5}>
            <Card className='overflow-hidden'>
              <div className='base-bg-color'>
                <Row>
                  <Col className='col-7'>
                    <div className='text-white p-4'>
                      <h5 className='text-white'>Bienvenido a Instakash!</h5>
                      <p>Tu sistema financiero digital</p>
                    </div>
                  </Col>
                  <Col className='col-5 align-self-end'>
                    <img src={profile} alt='' className='img-fluid' />
                  </Col>
                </Row>
              </div>
              <CardBody className='pt-0'>
                <div>
                  <Link to='/'>
                    <div className='avatar-md profile-user-wid mb-4'>
                      <span className='avatar-title rounded-circle bg-light'>
                        <img src={logoIcon} alt='' height='34' />
                      </span>
                    </div>
                  </Link>
                </div>
                <div className='p-2'>
                  <CustomAlert />
                  <AvForm className='form-horizontal' onValidSubmit={handleValidSubmit}>
                    <div className='form-group'>
                      <AvField name='email' label='Usuario' className='form-control' placeholder='Ingresa tu usuario' type='email' errorMessage='El correo es inválido' required />
                    </div>

                    <div className='form-group'>
                      <AvField
                        name='password'
                        autoComplete='password'
                        label='Contraseña'
                        type='password'
                        required
                        placeholder='Ingresa tu contraseña'
                        errorMessage='La contraseña es inválida'
                      />
                    </div>

                    <div className='mt-3 flex justify-center'>
                      <button className='btn btn-primary btn-block waves-effect waves-light' type='submit'>
                        {isProcessing ? <Spinner size='sm' /> : 'Iniciar sesión'}
                      </button>
                    </div>
                  </AvForm>
                </div>
              </CardBody>
            </Card>
            <div className='mt-5 text-center'>
              <p>© {new Date().getFullYear()} Instakash SAC. Se reserva el derecho de admisión</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
