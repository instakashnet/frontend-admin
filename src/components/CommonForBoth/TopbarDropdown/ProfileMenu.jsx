import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { ChevronDoubleDownIcon, ChevronDownIcon, PowerIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const ProfileMenu = ({ user }) => {
  const dispatch = useDispatch(),
    [menu, setMenu] = useState(false);

  // HANDLERS
  const toggle = () => {
    setMenu((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={toggle} className='d-inline-block'>
        <DropdownToggle className='btn header-item waves-effect' id='page-header-user-dropdown' tag='button'>
          <div className='flex items-center'>
            <UserCircleIcon className='w-6 h-6 mr-2' />
            <div className='flex flex-col items-start'>
              <span>{user && user.name}</span>
              <small>{user && user.email}</small>
            </div>
            <ChevronDownIcon className='w-5 h-5 ml-3' />
          </div>
        </DropdownToggle>
        <DropdownMenu right>
          <button onClick={() => dispatch(logoutUser())} className='dropdown-item'>
            <div className='flex items-center'>
              <PowerIcon className='w-5 h-5 mr-2 text-danger' />
              <span>Cerrar sesión</span>
            </div>
          </button>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withRouter(ProfileMenu);
