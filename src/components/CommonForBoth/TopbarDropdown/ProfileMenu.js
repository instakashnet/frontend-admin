import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/actions";
import { withRouter } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

const ProfileMenu = (props) => {
  const dispatch = useDispatch();

  const { user } = props;

  const [menu, setMenu] = useState(false);

  const toggle = () => {
    setMenu((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block">
        <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
          <div className="d-flex">
            <i className="rounded-circle header-profile-user fas fa-user-circle fa-2x mr-2" />
            <div>
              <span className="d-xl-inline-block ml-2 mr-1">{user && user.name}</span>
              <br />
              <small className="d-xl-inline-block">{user && user.email}</small>
            </div>
            <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </div>
        </DropdownToggle>
        <DropdownMenu right>
          <div className="dropdown-divider"></div>
          <button onClick={() => dispatch(logoutUser(props.history))} className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
            <span>Cerrar sesión</span>
          </button>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withRouter(ProfileMenu);
