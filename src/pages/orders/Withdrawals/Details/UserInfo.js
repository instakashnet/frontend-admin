import React from 'react';
import { Card, CardBody, Media } from 'reactstrap';

import CopyButton from '../../../../components/UI/CopyButton';

import Male from '../../../../assets/images/profile-male.svg';

const UserInfo = ({ details }) => {
  return (
    <Card>
      <CardBody>
        <Media className='transacion-details'>
          <div className='mr-3'>
            <img src={Male} width={35} className='avatar-md rounded-circle img-thumbnail' alt='user' />
          </div>
          <Media body className='align-self-center'>
            <div className='text-muted'>
              <h5>{details.first_name + ' ' + details.last_name}</h5>
              <p className='mb-1'>{details.userEmail}</p>
              <p className='mb-1'>
                <b>Documento:</b> {`${details.document_type} ${details.document_identification}`}
              </p>
              <p className='mb-0'>
                <b>Teléfono:</b> {details.userPhone} <CopyButton textToCopy={details.userPhone} />
              </p>
            </div>
          </Media>
        </Media>
      </CardBody>
    </Card>
  );
};

export default UserInfo;
