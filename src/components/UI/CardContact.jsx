import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Table } from "reactstrap";
import moment from "moment";

const CardContact = (props) => {
  const user = props.user;

  return (
    <Card className='text-center'>
      <CardBody>
        {user && !user.urlImagen ? (
          <div className='avatar-sm mx-auto mb-4'>
            <span className={"avatar-title rounded-circle bg-soft-primary text-primary font-size-16"}>{user && user.firstName.charAt(0)}</span>
          </div>
        ) : (
          <div className='mb-4'>
            <img className='rounded-circle avatar-sm' src={user && user.urlImagen} alt='' />
          </div>
        )}

        <h5 className='font-size-15'>
          <Link to='#' className='text-dark'>
            {user && user.firstName + " " + user.lastName}
          </Link>
        </h5>
        <p className='text-muted'>{user && user.email}</p>

        <div className='table-responsive'>
          <Table className='table-nowrap mb-0'>
            <tbody>
              <tr>
                <th scope='row'>Teléfono :</th>
                <td>{user && user.phoneNumber}</td>
              </tr>
              <tr>
                <th scope='row'>Documento:</th>
                <td>{user && user.lbDocumentsTypes.docTypeDes + " " + user.dniNumber}</td>
              </tr>
              <tr>
                <th scope='row'>Fecha de nacimiento:</th>
                <td>{user && moment(user.dateBirth).format("DD/MM/YYYY")}</td>
              </tr>
              {user && user.address ? (
                <tr>
                  <th scope='row'>Dirección :</th>
                  <td>{user.address}</td>
                </tr>
              ) : null}
              {user && user.occupation ? (
                <tr>
                  <th scope='row'>Ocupación :</th>
                  <td>{user.occupation}</td>
                </tr>
              ) : null}
              {user && user.profession ? (
                <tr>
                  <th scope='row'>Profesión :</th>
                  <td>{user.profession}</td>
                </tr>
              ) : null}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardContact;
