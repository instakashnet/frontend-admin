import React from "react";
import { Card, CardBody, Media } from "reactstrap";

import Male from "../../../../assets/images/profile-male.svg";
import Female from "../../../../assets/images/profile-female.svg";
import Company from "../../../../assets/images/profile-company.svg";
import CopyButton from "../../../../components/UI/CopyButton";

const User = ({ user }) => {
  let Avatar = user.type === "juridica" ? Company : Male;
  if (user.type === "natural") Avatar = user.identitySex === "male" ? Male : Female;

  return (
    <Card>
      <CardBody>
        <Media className="transacion-details">
          <div className="mr-3">
            <img src={Avatar} width={35} className="avatar-md rounded-circle img-thumbnail" alt="user" />
          </div>
          <Media body className="align-self-center">
            <div className="text-muted">
              <h5>{user.firstName + " " + user.lastName}</h5>
              <p className="mb-1">
                {user.email} <CopyButton textToCopy={user.email} />
              </p>
              <p className="mb-1">
                <b>Documento:</b> {`${user.documentType} ${user.documentIdentification}`}
              </p>
              <p className="mb-0">
                <b>Teléfono:</b> {user.phone} <CopyButton textToCopy={user.phone} />
              </p>
            </div>
          </Media>
          {user.type === "juridica" && (
            <Media body className="align-self-center">
              <div className="text-muted">
                <h5>Empresa</h5>
                <p className="mb-1">{user.razonSocial}</p>
                <p className="mb-0">
                  <b>RUC:</b> {user.ruc}
                </p>
              </div>
            </Media>
          )}
        </Media>
      </CardBody>
    </Card>
  );
};

export default React.memo(User);
