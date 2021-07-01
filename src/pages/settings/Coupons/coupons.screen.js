import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getCouponsInit, disableCouponInit, deleteCouponInit } from "../../../store/actions";
import { authInstance } from "../../../helpers/AuthType/axios";

import CouponsList from "./components/coupons-table.component";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
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
        const res = await authInstance.get(`/admin/users?type=client&page=1&qty=10000000&completed=true&search=${inputValue}`);
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
            <Breadcrumbs title="Cupones" breadcrumbItem="Cupones de descuento" />
            <CouponsList
              coupons={coupons}
              isLoading={isLoading}
              onDisable={(id, active) => dispatch(disableCouponInit(id, active))}
              onDelete={onDeleteHandler}
              onForm={onFormHandler}
            />
          </Col>
          {showForm && (
            <Col lg="6">
              <Breadcrumbs title="Agregar" breadcrumbItem="Agregar cupón" />
              <EditCoupon couponId={couponId} isProcessing={isProcessing} clients={allClients} />
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};
