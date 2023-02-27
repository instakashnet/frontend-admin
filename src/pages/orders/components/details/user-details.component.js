import { Person } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Media } from 'reactstrap';

import Company from '../../../../assets/images/profile-company.svg';
import Female from '../../../../assets/images/profile-female.svg';
import Male from '../../../../assets/images/profile-male.svg';
import CopyButton from '../../../../components/UI/CopyButton';
import { SkeletonComponent } from '../../../../components/UI/skeleton.component';

const User = ({ user, role, isLoading }) => {
  let Avatar;

  if (user) {
    Avatar = user.type === 'juridica' ? Company : Male;
    if (user.type === 'natural') Avatar = user.identitySex === 'male' ? Male : Female;
  }

  return (
    <Card>
      <CardBody>
        <Media className='transacion-details'>
          {isLoading ? (
            <UserLoading />
          ) : (
            <>
              <div className='mr-3'>
                <img src={Avatar} width={35} className='avatar-md rounded-circle img-thumbnail' alt='user' />
              </div>
              <Media body className='align-self-center'>
                <div className='text-muted'>
                  <h5>
                    {user.firstName + ' ' + user.lastName}
                    {(role === 'admin' || role === 'manager' || role === 'orders') && (
                      <Link to={`/user-details/${user.userId}`} className='ml-2 relative bottom-0.5'>
                        <Person />
                      </Link>
                    )}
                  </h5>
                  <p className='mb-1'>
                    {user.email} <CopyButton textToCopy={user.email} />
                  </p>
                  <p className='mb-1'>
                    <b>Documento:</b> {`${user.documentType} ${user.documentIdentification}`}
                  </p>
                  <p className='mb-0'>
                    <b>Teléfono:</b> {user.phone} <CopyButton textToCopy={user.phone} />
                  </p>
                </div>
              </Media>
              {user.type === 'juridica' && (
                <Media body className='align-self-center'>
                  <div className='text-muted'>
                    <h5>Empresa</h5>
                    <p className='mb-1'>{user.razonSocial}</p>
                    <p className='mb-0'>
                      <b>RUC:</b> {user.ruc}
                    </p>
                  </div>
                </Media>
              )}
            </>
          )}
        </Media>
      </CardBody>
    </Card>
  );
};

const UserLoading = () => {
  return (
    <div className='flex items-center'>
      <SkeletonComponent variant='circle' animation='wave' width={80} height={80} />
      <div className='ml-3'>
        <SkeletonComponent variant='text' width={220} />
        <br />
        <SkeletonComponent variant='text' />
        <SkeletonComponent variant='text' />
        <SkeletonComponent variant='text' />
      </div>
    </div>
  );
};

export default React.memo(User);
