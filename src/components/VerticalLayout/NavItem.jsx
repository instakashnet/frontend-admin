import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const NavItem = ({ path, subNavs, icon, label, isRole }) => {
  const [subMenu, setSubMenu] = useState(false);

  const showSubMenuHnadler = (e) => {
    e.preventDefault();
    setSubMenu((prev) => !prev);
  };

  return (
    <li className='my-2'>
      <NavLink to={path} activeClassName='active' className={subNavs ? 'waves-effect' : ''} onClick={subNavs ? (e) => showSubMenuHnadler(e) : null}>
        <div className='flex items-center'>
          {icon}
          <span className='ml-2'>{label}</span>
          {subNavs && (subMenu ? <ChevronUpIcon className='w-4 h-4 ml-auto' /> : <ChevronDownIcon className='w-4 h-4 ml-auto' />)}
        </div>
      </NavLink>
      {subMenu && (
        <ul className='sub-menu'>
          {subNavs.map((sub) => {
            return isRole ? (
              <li key={sub.path}>
                <NavLink to={sub.path}>
                  <div className='flex items-center'>
                    {sub.icon || null}
                    <span className='ml-2'>{sub.label}</span>
                  </div>
                </NavLink>
              </li>
            ) : null;
          })}
        </ul>
      )}
    </li>
  );
};
