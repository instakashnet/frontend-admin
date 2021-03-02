import React from "react";
import { Card, CardBody, Media } from "reactstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import Male from "../../../assets/images/profile-male.svg";
import CopyButton from "../../../components/UI/CopyButton";

const User = (props) => {
  const { isLoading, details } = props;

  return (
    <Card>
      <CardBody>
        {isLoading && <Loading />}
        {!isLoading && details && (
          <Media className='transacion-details'>
            <div className='mr-3'>
              <img src={Male} width={35} className='avatar-md rounded-circle img-thumbnail' alt='user' />
            </div>
            <Media body className='align-self-center'>
              <div className='text-muted'>
                <h5>{details.firstName + " " + details.lastName}</h5>
                <p className='mb-1'>{details.email}</p>
                <p className='mb-1'>
                  <b>Documento:</b> {`${details.document_type} ${details.document_identification}`}
                </p>
                <p className='mb-0'>
                  <b>Teléofno:</b> {details.phone} <CopyButton textToCopy={details.phone} />
                </p>
              </div>
            </Media>
            {details.type === "juridica" && (
              <Media body className='align-self-center'>
                <div className='text-muted'>
                  <h5>Empresa</h5>
                  <p className='mb-1'>{details.razon_social}</p>
                  <p className='mb-0'>
                    <b>RUC:</b> {details.ruc}
                  </p>
                </div>
              </Media>
            )}
          </Media>
        )}
      </CardBody>
    </Card>
  );
};

const Loading = () => (
  <Media className='transacion-details'>
    <SkeletonTheme color='#4444' highlightColor='#262b3c'>
      <Skeleton circle height={100} width={100} className='mr-3' />
    </SkeletonTheme>
    <Media body className='align-self-center'>
      <SkeletonTheme color='#4444' highlightColor='#262b3c'>
        <Skeleton width={150} className='d-block my-2' />
        <Skeleton className='d-block my-2' width={100} />
        <Skeleton className='d-block my-2' width={100} />
        <Skeleton className='d-block my-2' width={100} />
      </SkeletonTheme>
    </Media>
  </Media>
);

export default React.memo(User);
