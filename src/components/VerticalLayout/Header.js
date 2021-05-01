import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import NotificationDropdown from '../CommonForBoth/TopbarDropdown/NotificationDropdown';
import ProfileMenu from '../CommonForBoth/TopbarDropdown/ProfileMenu';

import logo from '../../assets/images/logo-light.svg';
import icon from '../../assets/images/icon-light.svg';

//i18n
import { withNamespaces } from 'react-i18next';

// Redux Store
import { toggleRightSidebar } from '../../store/actions';

const Header = (props) => {
  const toggleMenu = () => {
    props.toggleMenuCallback();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && /* alternative standard method */ !document.mozFullScreenElement && !document.webkitFullscreenElement) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  };

  return (
    <React.Fragment>
      <header id='page-topbar'>
        <div className='navbar-header'>
          <div className='d-flex'>
            <div className='navbar-brand-box'>
              <Link to='/' className='logo logo-light'>
                <span className='logo-sm'>
                  <img src={icon} alt='' height='22' className='mt-2' />
                </span>
                <span className='logo-lg'>
                  <img src={logo} alt='' height='19' className='mt-2' />
                </span>
              </Link>
            </div>

            <button type='button' onClick={toggleMenu} className='btn btn-sm px-3 font-size-16 header-item waves-effect' id='vertical-menu-btn'>
              <i className='fa fa-fw fa-bars'></i>
            </button>
          </div>
          <div className='d-flex'>
            <div className='dropdown d-none d-lg-inline-block ml-1'>
              <button type='button' onClick={toggleFullscreen} className='btn header-item noti-icon waves-effect' data-toggle='fullscreen'>
                <i className='bx bx-fullscreen'></i>
              </button>
            </div>

            <NotificationDropdown user={props.user} notifications={null} />

            <ProfileMenu user={props.user} />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  const { layoutType } = state.Layout;
  const { user } = state.Login;
  return { layoutType, user };
};

export default connect(mapStatetoProps, { toggleRightSidebar })(withNamespaces()(Header));
