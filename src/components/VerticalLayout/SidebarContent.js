import React from "react";
import { useSelector } from "react-redux";
import { useRole } from "../../hooks/useRole";
// MetisMenu
// import MetisMenu from "metismenujs";
import { NavItem } from "./NavItem";

import { generalLinks, ordersLinks, configLinks } from "../../helpers/navLinks";

const SidebarContent = () => {
  const user = useSelector((state) => state.Login.user);
  const [role] = useRole(user);

  return (
    <div id="sidebar-menu">
      <ul className="metismenu list-unstyled" id="side-menu">
        {(role === "admin" || role === "manager" || role === "officers") && <li className="menu-title">{"Principal"}</li>}

        {generalLinks.map((link) => {
          const isRole = link.roles.find((linkRole) => linkRole === role);
          return isRole ? <NavItem link={link} key={link.path} /> : null;
        })}

        <li className="menu-title">{"Cambios de divisa"}</li>

        {ordersLinks.map((link) => {
          const isRole = link.roles.find((linkRole) => linkRole === role);
          return isRole ? <NavItem link={link} key={link.path} /> : null;
        })}

        {(role === "admin" || role === "manager" || role === "officers") && <li className="menu-title">Configuraciones generales</li>}

        {configLinks.map((link) => {
          const isRole = link.roles.find((linkRole) => linkRole === role);
          return isRole ? <NavItem link={link} isRole={isRole} key={link.path} /> : null;
        })}
      </ul>
    </div>
  );
};

export default SidebarContent;
