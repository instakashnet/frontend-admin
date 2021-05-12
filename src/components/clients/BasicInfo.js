import React from 'react';
import { Col, Card, CardBody, Button } from 'reactstrap';

import Male from '../../assets/images/profile-male.svg';
import Female from '../../assets/images/profile-female.svg';

const BasicInfo = ({ user, profile, openModal, onDisable }) => {
  let Avatar = Male;

  if (profile) {
    if (profile.identity_sex === 'female') Avatar = Female;
  }

  return (
    <Col lg='6'>
      <Card className='text-center'>
        <CardBody>
          <div className='avatar-sm mx-auto mb-4'>{Avatar && <img src={Avatar} alt='profile' className='img-thumbnail rounded-circle' width={85} height={85} />}</div>
          {profile && <h5 className='font-size-15'>{`${profile.first_name} ${profile.last_name}`}</h5>}
          <p className='text-muted mb-2'>{user.email}</p>
          <span className='badge badge-primary font-size-14 m-1 mb-2'>{user.phone || 'Sin teléfono'}</span>
          <p className='text-muted'>
            KASH acumulados = <b>{user.kashAcumulated || 0}</b>
          </p>
          <div className='flex items-center justify-center'>
            {!profile && (
              <Button type='button' className='btn-primary mr-3' onClick={() => openModal('addNatural', {})}>
                Agregar perfil
              </Button>
            )}
            <Button type='button' className='btn-secondary' onClick={() => openModal('editInfo', profile)}>
              Editar datos
            </Button>
            <Button type='button' className='btn-danger ml-3' onClick={() => onDisable(user.id, !!+user.active)}>
              {!!+user.active ? 'Deshabilitar' : 'Habilitar'}
            </Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BasicInfo;
