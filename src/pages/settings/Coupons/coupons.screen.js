import React, { useEffect, useState } from "react";
import { Col, Row, Container, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getCouponsInit, disableCouponInit, deleteCouponInit } from "../../../store/actions";
import { getAxiosInstance } from "../../../api/axios";

import CouponsList from "./components/coupons-table.component";
import EditCoupon from "./components/forms/edit-coupon.component";

export const CouponsScreen = () => {
  const [showForm, setShowForm] = useState(false);
  const [couponId, setCouponId] = useState(null);
  const dispatch = useDispatch();
  const { coupons, isLoading, isProcessing } = useSelector((state) => state.Coupons);

  useEffect(() => {
    dispatch(getCouponsInit());
  }, [dispatch]);

  const onFormHandler = (id = null) => {
    setShowForm((prev) => !prev);
    setCouponId(id);
  };

  const onDeleteHandler = (id) => dispatch(deleteCouponInit(id));

  const allClients = (inputValue) =>
    new Promise(async (resolve, reject) => {
      try {
        let clients = [];
        const res = await getAxiosInstance("auth", "v1").get(`/users?type=client&page=1&qty=10000000&completed=true&search=${inputValue}`);
        if (res.status === 200) {
          const clientOptions = res.data.users.map((client) => ({ value: client.id, label: client.email }));
          clients = clientOptions;
        }

        resolve(clients);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg="12">
            <CouponsList
              coupons={coupons}
              isLoading={isLoading}
              onDisable={(id, active) => dispatch(disableCouponInit(id, active))}
              onDelete={onDeleteHandler}
              onForm={onFormHandler}
            />
          </Col>
        </Row>
      </Container>
      <Modal isOpen={showForm} role="dialog" autoFocus centered tabIndex="-1" toggle={onFormHandler}>
        <ModalHeader toggle={onFormHandler}>Formulario</ModalHeader>
        <ModalBody>
          <h4 className="mb-2">{couponId ? "Editar cupón" : "Agregar cupón"}</h4>
          <EditCoupon couponId={couponId} isProcessing={isProcessing} onShowForm={onFormHandler} clients={allClients} />
        </ModalBody>
      </Modal>
    </div>
  );
};
