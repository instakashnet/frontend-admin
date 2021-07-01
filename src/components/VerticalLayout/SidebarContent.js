import React, { useEffect } from "react";
import { useSelector } from "react-redux";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const SidebarContent = (props) => {
  const { type, location } = props;

  useEffect(() => {
    const initMenu = () => {
      new MetisMenu("#side-menu");

      var matchingMenuItem = null;
      var ul = document.getElementById("side-menu");
      var items = ul.getElementsByTagName("a");
      for (var i = 0; i < items.length; ++i) {
        if (location.pathname === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };

    initMenu();
  }, [type, location]);

  const user = useSelector((state) => state.Login.user);

  const activateParentDropdown = (item) => {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  return (
    <React.Fragment>
      <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">
          <li className="menu-title">{"Principal"}</li>

          <li>
            <Link to="/dashboard">
              <i className="bx bx-home-circle"></i>
              <span>{"Actividad"}</span>
            </Link>
          </li>

          {user && (user.role === "ROLE_ADMIN" || user.role === "ROLE_APPRAISER" || user.role === "ROLE_MANAGER") && (
            <>
              <li className="menu-title">{"Datos del sistema"}</li>

              <li>
                <Link to="/bank-accounts">
                  <i className="bx bx-wallet"></i>
                  <span>{"Cuentas de la empresa"}</span>
                </Link>
              </li>
            </>
          )}

          {user && (user.role === "ROLE_ADMIN" || user.role === "ROLE_APPRAISER") && (
            <li>
              <Link to="/forex" className=" waves-effect">
                <i className="bx bx-dollar-circle"></i>
                <span>{"Precio del dolar"}</span>
              </Link>
            </li>
          )}

          {user &&
          (user.role === "ROLE_ADMIN" ||
            user.role === "ROLE_APPRAISER" ||
            user.role === "ROLE_OPERATOR" ||
            user.role === "ROLE_ANALYST" ||
            user.role === "ROLE_MANAGER" ||
            user.role === "ROLE_SIGNATORY") ? (
            <>
              <li className="menu-title">{"Cambios de divisa"}</li>

              <li>
                <Link to="/exchanges/all" className=" waves-effect">
                  <i className="bx bx-list-check"></i>
                  {/* <span className='badge badge-pill badge-warning float-right'>{"4"}</span> */}
                  <span>{"Operaciones recibidas"}</span>
                </Link>
              </li>

              {/* <li>
                <Link to='/exchange-transaction-limits?type=currencyExchange' className=' waves-effect'>
                  <i className='bx bx-tachometer'></i>
                  <span>{"Limites por transacción"}</span>
                </Link>
              </li> */}
              <li className="menu-title">{"Solicitud de retiros KASH"}</li>
              <li>
                <Link to="/withdrawals/all" className="waves-effect">
                  <i className="bx bx-list-ol"></i>
                  {/* <span className='badge badge-pill badge-warning float-right'>{"4"}</span> */}
                  <span>{"Retiros KASH"}</span>
                </Link>
              </li>

              {/* <li className='menu-title'>{"Avances de efectivo"}</li> */}

              {/* 
              <li>
                <Link to='/cash-advances' className=' waves-effect'>
                  <i className='bx bx-bar-chart-square'></i>
                  <span className='badge badge-pill badge-warning float-right'>{"4"}</span>
                  <span>{"Transacciones"}</span>
                </Link>
              </li> */}
              {/* 
              <li>
                <Link to='/advance-transaction-limits?type=cashAdvance' className=' waves-effect'>
                  <i className='bx bx-tachometer'></i>
                  <span>{"Limites por transacción"}</span>
                </Link>
              </li> */}
            </>
          ) : null}

          {user && user.role === "ROLE_ADMIN" && (
            <>
              <li className="menu-title">{"Configuraciones generales"}</li>

              <li>
                <Link to="/schedule" className=" waves-effect">
                  <i className="bx bx-calendar"></i>
                  <span>{"Horarios"}</span>
                </Link>
              </li>

              <li>
                <Link to="/coupons" className=" waves-effect">
                  <i className="bx bxs-discount"></i>
                  <span>{"Cupones de descuento"}</span>
                </Link>
              </li>

              <li>
                <Link to="/banks" className=" waves-effect">
                  <i className="mdi mdi-bank-outline"></i>
                  <span>{"Bancos aceptados"}</span>
                </Link>
              </li>
            </>
          )}

          {user && (user.role === "ROLE_ADMIN" || user.role === "ROLE_MANAGER") && (
            <li>
              <Link to="/registered-users">
                <i className="bx bx-user-circle"></i>
                <span>{"Usuarios registrados"}</span>
              </Link>
            </li>
          )}

          {user && user.role === "ROLE_ADMIN" && (
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-cog"></i>
                <span>{"Ajustes"}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/admin-users">{"Usuarios administrativos"}</Link>
                </li>
                <li>
                  <Link to="/status">{"Estados de operaciones"}</Link>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default withRouter(SidebarContent);
