import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { changeLayout, changeSidebarTheme, changeSidebarType, toggleRightSidebar, changeTopbarTheme, changeLayoutWidth } from "../../store/actions";

// Layout Related Components
import LoadingPage from "../../pages/LoadingPage";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ leftSideBarTheme, leftSideBarType, changeSidebarType, changeSidebarTheme, children, isLoading }) => {
  const [isMobile] = useState(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

  useEffect(() => {
    // Scroll Top to 0
    window.scrollTo(0, 0);

    if (leftSideBarType) changeSidebarType(leftSideBarType);
    if (leftSideBarTheme) changeSidebarTheme(leftSideBarTheme);
  }, [leftSideBarType, leftSideBarTheme, changeSidebarTheme, changeSidebarType]);

  const toggleMenuCallback = () => {
    if (leftSideBarType === "default") {
      changeSidebarType("condensed", isMobile);
    } else if (leftSideBarType === "condensed") {
      changeSidebarType("default", isMobile);
    }
  };

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        {isLoading && <LoadingPage />}
        <Header toggleMenuCallback={toggleMenuCallback} toggleRightSidebar={toggleRightSidebar} />
        <Sidebar theme={leftSideBarTheme} type={leftSideBarType} isMobile={isMobile} />
        <div className="main-content">{children}</div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  return {
    ...state.Layout,
    ...state.Login,
  };
};
export default connect(mapStatetoProps, {
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  toggleRightSidebar,
  changeTopbarTheme,
  changeLayoutWidth,
})(withRouter(Layout));
