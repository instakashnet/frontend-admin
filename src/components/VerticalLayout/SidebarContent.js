import React, { useEffect } from "react";
import { useSelector } from "react-redux";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from "react-i18next";

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
      <div id='sidebar-menu'>
        <ul className='metismenu list-unstyled' id='side-menu'>
          <li className='menu-title'>{props.t("Principal")}</li>

          <li>
            <Link to='/dashboard'>
              <i className='bx bx-home-circle'></i>
              <span>{props.t("Actividad")}</span>
            </Link>
          </li>

          {user && (user.role === "ROLE_ADMIN" || user.role === "ROLE_APPRAISER") ? (
            <>
              <li className='menu-title'>{props.t("Datos del sistema")}</li>

              <li>
                <Link to='/forex' className=' waves-effect'>
                  <i className='bx bx-dollar-circle'></i>
                  <span>{props.t("Precio del dolar")}</span>
                </Link>
              </li>

              <li>
                <Link to='/bank-accounts'>
                  <i className='bx bx-wallet'></i>
                  <span>{props.t("Cuentas de la empresa")}</span>
                </Link>
              </li>
            </>
          ) : null}

          {user && (user.role === "ROLE_ADMIN" || user.role === "ROLE_OPERATOR" || user.role === "ROLE_ANALYST") ? (
            <>
              <li className='menu-title'>{props.t("Cambios de divisa")}</li>

              <li>
                <Link to='/currency-exchanges' className=' waves-effect'>
                  <i className='bx bx-bar-chart-square'></i>
                  {/* <span className='badge badge-pill badge-warning float-right'>{props.t("4")}</span> */}
                  <span>{props.t("Transacciones")}</span>
                </Link>
              </li>

              {/* <li>
                <Link to='/exchange-transaction-limits?type=currencyExchange' className=' waves-effect'>
                  <i className='bx bx-tachometer'></i>
                  <span>{props.t("Limites por transacción")}</span>
                </Link>
              </li> */}

              <li className='menu-title'>{props.t("Avances de efectivo")}</li>

              <li>
                <Link to='/cash-advances' className=' waves-effect'>
                  <i className='bx bx-bar-chart-square'></i>
                  {/* <span className='badge badge-pill badge-warning float-right'>{props.t("4")}</span> */}
                  <span>{props.t("Transacciones")}</span>
                </Link>
              </li>
              {/* 
              <li>
                <Link to='/advance-transaction-limits?type=cashAdvance' className=' waves-effect'>
                  <i className='bx bx-tachometer'></i>
                  <span>{props.t("Limites por transacción")}</span>
                </Link>
              </li> */}
            </>
          ) : null}

          {user && (user.role === "ROLE_ADMIN" || user.idRol === 4) ? (
            <>
              <li className='menu-title'>{props.t("Configuraciones generales")}</li>

              <li>
                <Link to='/schedule' className=' waves-effect'>
                  <i className='bx bx-calendar'></i>
                  <span>{props.t("Horarios")}</span>
                </Link>
              </li>

              <li>
                <Link to='/banks' className=' waves-effect'>
                  <i className='mdi mdi-bank-outline'></i>
                  <span>{props.t("Bancos aceptados")}</span>
                </Link>
              </li>

              {/* <li>
                <Link to='/countries' className=' waves-effect'>
                  <i className='mdi mdi-flag-outline'></i>
                  <span>{props.t("Paises aceptados")}</span>
                </Link>
              </li> */}

              <li>
                <Link to='/registered-users'>
                  <i className='bx bx-user-circle'></i>
                  <span>{props.t("Usuarios registrados")}</span>
                </Link>
              </li>

              <li>
                <Link to='/#' className='has-arrow waves-effect'>
                  <i className='bx bx-cog'></i>
                  <span>{props.t("Ajustes")}</span>
                </Link>
                <ul className='sub-menu' aria-expanded='false'>
                  <li>
                    <Link to='/admin-users'>{props.t("Usuarios administrativos")}</Link>
                  </li>
                  <li>
                    <Link to='/status'>{props.t("Estados de operaciones")}</Link>
                  </li>
                </ul>
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default withRouter(withNamespaces()(SidebarContent));
