import React from 'react';
import { useSelector } from 'react-redux';
import { useRole } from '../../hooks/useRole';
// MetisMenu
// import MetisMenu from "metismenujs";
import { NavItem } from './NavItem';

import { generalLinks, ordersLinks, configLinks } from '../../helpers/navLinks';

const SidebarContent = () => {
  const user = useSelector((state) => state.Login.user);
  const [role] = useRole(user);

  return (
    <div id='sidebar-menu'>
      <ul className='metismenu list-unstyled' id='side-menu'>
        {generalLinks.map((link, i) => {
          const isRole = link.roles.find((linkRole) => linkRole === role);
          return isRole ? (
            i === 0 ? (
              <li key={link.title} className='menu-title'>
                {link.title}
              </li>
            ) : (
              <NavItem path={link.path} subNavs={link.subNavs} label={link.label} icon={link.icon} key={link.path} />
            )
          ) : null;
        })}

        {ordersLinks.map((link, i) => {
          const isRole = link.roles.find((linkRole) => linkRole === role);
          return isRole ? (
            i === 0 ? (
              <li key={link.title} className='menu-title'>
                {link.title}
              </li>
            ) : (
              <NavItem path={link.path} subNavs={link.subNavs} label={link.label} icon={link.icon} isRole={isRole} key={link.path} />
            )
          ) : null;
        })}

        {configLinks.map((link, i) => {
          const isRole = link.roles.find((linkRole) => linkRole === role);
          return isRole ? (
            i === 0 ? (
              <li key={link.title} className='menu-title'>
                {link.title}
              </li>
            ) : (
              <NavItem path={link.path} subNavs={link.subNavs} label={link.label} icon={link.icon} isRole={isRole} key={link.path} />
            )
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default SidebarContent;
