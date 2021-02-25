import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getClientDetails } from "../../../store/actions";

const ClientDetails = (props) => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const details = useSelector((state) => state.Clients.details);

  console.log(details);

  useEffect(() => {
    dispatch(getClientDetails(id));
  }, [dispatch, id]);

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='6'></Col>
        </Row>
      </Container>
    </div>
  );
};

export default ClientDetails;
