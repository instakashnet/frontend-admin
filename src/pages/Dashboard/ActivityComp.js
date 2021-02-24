import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getClientBinnacle, getAdminBinnacle } from "../../store/actions";
import { Card, CardBody, CardTitle, Media, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
// import { Link } from "react-router-dom";
import moment from "moment";
import "moment/min/locales";

moment.locale("es-mx");

const ActivityComp = (props) => {
  const [activeTab, setActiveTab] = useState(1);
  const { getClientBinnacle, getAdminBinnacle, clientBinnacle, adminBinnacle } = props;

  useEffect(() => {
    getClientBinnacle();
  }, [getClientBinnacle]);

  useEffect(() => {
    getAdminBinnacle();
  }, [getAdminBinnacle]);

  let firstClientBinnacle = [];
  let firstAdminBinnacle = [];

  if (clientBinnacle.length > 0) firstClientBinnacle = clientBinnacle.slice(0, 5);
  if (adminBinnacle.length > 0) firstAdminBinnacle = adminBinnacle.slice(0, 5);

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className='mb-5'>Actividad de plataforma</CardTitle>
          <Nav tabs className='nav-tabs-custom nav-justified'>
            <NavItem>
              <NavLink className={activeTab === 1 ? "active" : ""} onClick={() => setActiveTab(1)}>
                <span className='d-none d-sm-block'>Administrador</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={activeTab === 2 ? "active" : ""} onClick={() => setActiveTab(2)}>
                <span className='d-none d-sm-block'>Cliente</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId={1} className='p-3'>
              <ul className='verti-timeline list-unstyled'>
                {firstAdminBinnacle.map((activity, i) => (
                  <li className={`event-list ${i === 0 ? "active" : ""}`} key={activity.opDateTime}>
                    <div className='event-timeline-dot'>
                      <i className='bx bx-right-arrow-circle font-size-18'></i>
                    </div>
                    <Media>
                      <div className='mr-3'>
                        <h5 className='font-size-14'>
                          {moment(activity.opDateTime).format("Do [de] MMM")} <i className='bx bx-right-arrow-alt font-size-16 text-primary align-middle ml-2'></i>
                        </h5>
                        <small>{moment(activity.opDateTime).format("hh:mm a")}</small>
                      </div>
                      <Media body>
                        <div id='activitytext'>{activity.actionDescription.substring(0, 150)}</div>
                      </Media>
                    </Media>
                  </li>
                ))}
              </ul>
            </TabPane>
            <TabPane tabId={2} className='p-3'>
              <ul className='verti-timeline list-unstyled'>
                {firstClientBinnacle.map((activity, i) => (
                  <li className={`event-list ${i === 0 ? "active" : ""}`} key={activity.opDateTime}>
                    <div className='event-timeline-dot'>
                      <i className='bx bx-right-arrow-circle font-size-18'></i>
                    </div>
                    <Media>
                      <div className='mr-3'>
                        <h5 className='font-size-14'>
                          {moment(activity.opDateTime).format("Do [de] MMM")} <i className='bx bx-right-arrow-alt font-size-16 text-primary align-middle ml-2'></i>
                        </h5>
                        <small>{moment(activity.opDateTime).format("hh:mm a")}</small>
                      </div>
                      <Media body>
                        <div id='activitytext'>{activity.actionDescription.substring(0, 150)}</div>
                      </Media>
                    </Media>
                  </li>
                ))}
              </ul>
            </TabPane>
          </TabContent>
          {/* <div className='text-center mt-4'>
            <Link to='' className='btn btn-primary waves-effect waves-light btn-sm'>
              Ver toda la actividad <i className='mdi mdi-arrow-right ml-1'></i>
            </Link>
          </div> */}
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { clientBinnacle, adminBinnacle } = state.Binnacle;
  return { clientBinnacle, adminBinnacle };
};

export default connect(mapStateToProps, { getClientBinnacle, getAdminBinnacle })(React.memo(ActivityComp));
