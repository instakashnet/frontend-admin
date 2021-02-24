import React from "react";

import { Row, Col, CardBody, Card, Alert, Container, Spinner } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
import { loginUser } from "../../store/actions";

// import images
import profile from "../../assets/images/profile-img.png";
import logoIcon from "../../assets/images/icon-light.svg";

const Login = (props) => {
  const handleValidSubmit = (event, values) => props.loginUser(values, props.history);

  return (
    <React.Fragment>
      <div className='home-btn d-none d-sm-block'>
        <Link to='/' className='text-dark'>
          <i className='bx bx-home h2'></i>
        </Link>
      </div>
      <div className='account-pages my-5 pt-sm-5'>
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
                    <AvForm className='form-horizontal' onValidSubmit={handleValidSubmit}>
                      {props.error && props.error ? <Alert color='danger'>{props.error}</Alert> : null}

                      <div className='form-group'>
                        <AvField
                          name='email'
                          label='Usuario'
                          className='form-control'
                          placeholder='Ingresa tu usuario'
                          type='email'
                          errorMessage='El correo es inválido'
                          required
                        />
                      </div>

                      <div className='form-group'>
                        <AvField name='password' label='Contraseña' type='password' required placeholder='Ingresa tu contraseña' errorMessage='La contraseña es inválida' />
                      </div>
                      {/* 
                      <div className='custom-control custom-checkbox'>
                        <input type='checkbox' className='custom-control-input' id='customControlInline' />
                        <label className='custom-control-label' htmlFor='customControlInline'>
                          Recordarme
                        </label>
                      </div> */}

                      <div className='mt-3'>
                        <button className='btn btn-primary btn-block waves-effect waves-light' type='submit'>
                          {props.isProcessing ? <Spinner style={{ width: "0.7rem", height: "0.7rem" }} type='grow' color='light' /> : null}
                          {props.isProcessing ? "Iniciando..." : "Iniciar sesión"}
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
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  const { error, isProcessing } = state.Login;
  return { error, isProcessing };
};

export default withRouter(connect(mapStatetoProps, { loginUser })(Login));
