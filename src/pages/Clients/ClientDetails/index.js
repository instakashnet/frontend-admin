import React, { useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getClientDetails } from "../../../store/actions";

const ClientDetails = (props) => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const details = useSelector((state) => state.Clients.details);

  let companyProfiles = [];
  let userProfile;

  if (details) {
    companyProfiles = details.profiles.filter((profile) => profile.type !== "natural");
    userProfile = details.profiles.find((profile) => profile.type === "natural");
  }

  console.log(companyProfiles, userProfile);

  useEffect(() => {
    dispatch(getClientDetails(id));
  }, [dispatch, id]);

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='6'>
            <Card>
              <CardBody>
                <div className='table-responsive'>
                  <Table className='table-nowrap mb-0'>
                    <tbody>
                      {/* <tr>
                        <th scope='row'>Nombre completo:</th>
                        <td>{details && details.profiles[0].first_name + " " + details.profiles[0].last_name}</td>
                      </tr>
                      <tr>
                        <th scope='row'>Mobile :</th>
                        <td>({details && details.prfiles[0].phone}</td>
                      </tr>
                      <tr>
                        <th scope='row'>E-mail :</th>
                        <td>{userProfile.email}</td>
                      </tr>
                      <tr>
                        <th scope='row'>Location :</th>
                        <td>{userProfile.location}</td>
                      </tr> */}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ClientDetails;
