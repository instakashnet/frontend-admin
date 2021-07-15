import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";
import moment from "moment-timezone";

const NotificationDropdown = () => {
  const [menu, setMenu] = useState(false);
  const [notifications] = useState(null);
  const user = useSelector((state) => state.Login.user);
  const toggle = () => setMenu((prevState) => !prevState);

  let role = null;
  if (user) role = user.role;

  let totalCount;
  if (notifications && (notifications.cambioDivisa || notifications.avanceEfectivo)) {
    totalCount = notifications.cambioDivisa.total + notifications.avanceEfectivo.total;
  }

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={toggle} className="dropdown d-inline-block" tag="li">
        <DropdownToggle className="btn header-item noti-icon waves-effect" tag="button" id="page-header-notifications-dropdown">
          <i className={`bx bx-bell ${totalCount > 0 ? "bx-tada" : ""}`}></i>
          {totalCount && <span className="badge badge-danger badge-pill">{totalCount}</span>}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0" right>
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> Notificaciones</h6>
              </Col>
            </Row>
          </div>

          <SimpleBar style={{ height: "130px" }}>
            <Link to="currency-exchanges" className="text-reset notification-item">
              {notifications && notifications.cambioDivisa ? (
                <div className="media">
                  <div className="media-body">
                    <h6 className="mt-0 mb-1">
                      {`Hay ${notifications.cambioDivisa.total} cambios de divisa ${role === 3 ? "por validar" : role === 2 ? "por procesar" : "pendiente"}`}
                    </h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-0">
                        <i className="mdi mdi-clock-outline"></i> último {moment(notifications.cambioDivisa.fecha).startOf("hour").fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="media">
                  <div className="media-body">
                    <h6 className="mt-0 mb-1">No hay ningún cambio de divisa nuevo</h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-0">
                        <i className="mdi mdi-clock-outline"></i>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Link>
            <Link to="cash-advances" className="text-reset notification-item">
              {notifications && notifications.avanceEfectivo ? (
                <div className="media">
                  <div className="media-body">
                    <h6 className="mt-0 mb-1">
                      {`Hay ${notifications.avanceEfectivo.total} avances de efectivo ${role === 3 ? "por validar" : role === 2 ? "por procesar" : "pendientes"}`}
                    </h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-0">
                        <i className="mdi mdi-clock-outline"></i> último {moment(notifications.avanceEfectivo.fecha).startOf("hour").fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="media">
                  <div className="media-body">
                    <h6 className="mt-0 mb-1">No hay ningún avance de efectivo nuevo</h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-0">
                        <i className="mdi mdi-clock-outline"></i>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          </SimpleBar>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};
export default NotificationDropdown;
