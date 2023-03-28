import React from 'react';
import { Link } from 'react-router-dom';

// REDUX
import { useSelector, useDispatch } from 'react-redux';

import { ConnectedStatus } from '../CommonForBoth/connected.component';
import NotificationDropdown from '../CommonForBoth/TopbarDropdown/NotificationDropdown';
import ProfileMenu from '../CommonForBoth/TopbarDropdown/ProfileMenu';
import { ArrowsPointingOutIcon, Bars4Icon } from '@heroicons/react/24/outline';
import { ReactComponent as Logo } from '../../assets/images/logo-light.svg';
import { ReactComponent as Icon } from '../../assets/images/icon-light.svg';

// Redux Store
import { setOnline } from '../../store/actions';

const Header = ({ toggleMenuCallback }) => {
  const dispatch = useDispatch(),
    { isProcessing, user } = useSelector((state) => state.Login);

  // HANDLERS
  const toggleMenu = () => toggleMenuCallback();

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
                  <Icon className='w-8 h-20' />
                </span>
                <span className='logo-lg'>
                  <Logo className='w-32 h-20' />
                </span>
              </Link>
            </div>

            <button type='button' onClick={toggleMenu} className='btn btn-sm px-3 font-size-16 header-item waves-effect' id='vertical-menu-btn'>
              <Bars4Icon className='w-5 h-5' />
            </button>
          </div>
          <div className='d-flex'>
            <div className='dropdown d-none d-lg-inline-block ml-1'>
              <button type='button' onClick={toggleFullscreen} className='btn header-item noti-icon waves-effect' data-toggle='fullscreen'>
                <ArrowsPointingOutIcon className='w-6 h-6' />
              </button>
            </div>

            <NotificationDropdown user={user} notifications={null} />
            {user.roles === 'ROLE_OPERATOR' && <ConnectedStatus label isProcessing={isProcessing} isOnline={!!user.online} setIsOnline={() => dispatch(setOnline())} />}
            <ProfileMenu user={user} />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
