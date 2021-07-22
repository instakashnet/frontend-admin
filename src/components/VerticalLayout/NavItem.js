import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const NavItem = ({ link, isRole }) => {
  const [subMenu, setSubMenu] = useState(false);

  const showSubMenuHnadler = (e) => {
    e.preventDefault();
    setSubMenu((prev) => !prev);
  };

  return (
    <li>
      <NavLink to={link.path} activeClassName="active" className={link.subNavs ? "has-arrow waves-effect" : ""} onClick={link.subNavs ? (e) => showSubMenuHnadler(e) : null}>
        <i className={link.icon}></i>
        <span>{link.label}</span>
      </NavLink>
      {subMenu && (
        <ul className="sub-menu">
          {link.subNavs.map((sub) => {
            return isRole ? (
              <li key={sub.path}>
                <NavLink to={sub.path}>
                  <i className={sub.icon}></i>
                  <span>{sub.label}</span>
                </NavLink>
              </li>
            ) : null;
          })}
        </ul>
      )}
    </li>
  );
};
