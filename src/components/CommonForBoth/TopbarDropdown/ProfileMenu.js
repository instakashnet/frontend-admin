import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { withRouter, Link } from "react-router-dom";

//i18n
import { withNamespaces } from "react-i18next";

const ProfileMenu = (props) => {
  const { user } = props;

  const [menu, setMenu] = useState(false);

  const toggle = () => {
    setMenu((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={toggle} className='d-inline-block'>
        <DropdownToggle className='btn header-item waves-effect' id='page-header-user-dropdown' tag='button'>
          <div className='d-flex'>
            <i className='rounded-circle header-profile-user fas fa-user-circle fa-2x mr-2' />
            <div>
              <span className='d-xl-inline-block ml-2 mr-1'>{user && user.name}</span>
              <br />
              <small className='d-xl-inline-block'>{user && user.email}</small>
            </div>
            <i className='mdi mdi-chevron-down d-none d-xl-inline-block'></i>
          </div>
        </DropdownToggle>
        <DropdownMenu right>
          <div className='dropdown-divider'></div>
          <Link to='/logout' className='dropdown-item'>
            <i className='bx bx-power-off font-size-16 align-middle mr-1 text-danger'></i>
            <span>{props.t("Cerrar sesión")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withRouter(withNamespaces()(ProfileMenu));
