import React from "react";

import { connect } from "react-redux";

//Simple bar
import SimpleBar from "simplebar-react";

import SidebarContent from "./SidebarContent";

const Sidebar = (props) => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? (
            <SimpleBar style={{ maxHeight: "100%" }}>
              <SidebarContent />
            </SimpleBar>
          ) : (
            <SidebarContent />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  return {
    layout: state.Layout,
  };
};
export default connect(mapStatetoProps)(Sidebar);
