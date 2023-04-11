import React from 'react'
import { useSelector } from 'react-redux'
import { useRole } from '../../hooks/useRole'
// MetisMenu
// import MetisMenu from "metismenujs";
import { NavItem } from './NavItem'

import { generalLinks, ordersLinks, configLinks } from '../../helpers/navLinks'

const SidebarContent = () => {
  const user = useSelector((state) => state.Login.user)
  const [role] = useRole(user)

  return (
    <div id='sidebar-menu'>
      <ul className='metismenu list-unstyled' id='side-menu'>
        {/* GENERAL LINKS */}
        {generalLinks?.title && (
          <li key={generalLinks?.title} className='menu-title'>
            {generalLinks?.title}
          </li>
        )}
        {generalLinks.links.map((link) => {
          const isRole = link.roles.find((linkRole) => linkRole === role)
          return isRole ? <NavItem path={link.path} subNavs={link.subNavs} label={link.label} icon={link.icon} key={link.path} /> : null
        })}

        {/* ORDER LINKS */}
        {ordersLinks?.title && (
          <li key={ordersLinks?.title} className='menu-title'>
            {ordersLinks?.title}
          </li>
        )}
        {ordersLinks.links.map((link) => {
          return <NavItem path={link.path} subNavs={link.subNavs} label={link.label} icon={link.icon} key={link.path} />
        })}

        {/* CONFIG LINKS */}
        {configLinks?.title && (
          <li key={configLinks.title} className='menu-title'>
            {configLinks.title}
          </li>
        )}
        {configLinks.links.map((link, i) => {
          const isRole = link.roles.find((linkRole) => linkRole === role)
          return isRole ? <NavItem path={link.path} subNavs={link.subNavs} label={link.label} icon={link.icon} key={link.path} /> : null
        })}
      </ul>
    </div>
  )
}

export default SidebarContent
