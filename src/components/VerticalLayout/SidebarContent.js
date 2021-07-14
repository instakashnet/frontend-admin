import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRole } from "../../hooks/useRole";

// MetisMenu
import MetisMenu from "metismenujs";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { generalLinks, ordersLinks, configLinks } from "../../helpers/navLinks";

const SidebarContent = ({ type }) => {
  const location = useLocation();

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
  const [role] = useRole(user);

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
    <div id="sidebar-menu">
      <ul className="metismenu list-unstyled" id="side-menu">
        {(role === "admin" || role === "manager" || role === "officers") && <li className="menu-title">{"Principal"}</li>}

        {generalLinks.map((link) => {
          const isRole = link.roles.find((linkRole) => linkRole === role);
          return isRole ? (
            <li key={link.path}>
              <Link to={link.path}>
                <i className={link.icon}></i>
                <span>{link.label}</span>
              </Link>
            </li>
          ) : null;
        })}

        <li className="menu-title">{"Cambios de divisa"}</li>

        {ordersLinks.map((link) => {
          const isRole = link.roles.find((linkRole) => linkRole === role);
          return isRole ? (
            <li key={link.path}>
              <Link to={link.path}>
                <i className={link.icon}></i>
                <span>{link.label}</span>
              </Link>
            </li>
          ) : null;
        })}

        {(role === "admin" || role === "manager") && <li className="menu-title">{"Configuraciones generales"}</li>}

        {configLinks.map((link) => {
          const isRole = link.roles.find((linkRole) => linkRole === role);
          return isRole ? (
            <li key={link.path}>
              <Link to={link.path}>
                <i className={link.icon}></i>
                <span>{link.label}</span>
              </Link>
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default SidebarContent;
