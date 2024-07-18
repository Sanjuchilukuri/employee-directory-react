import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.scss";
import dashboard from "../../../../assets/dashboard.svg";
import employee from "../../../../assets/employee.svg";
import accessRights from "../../../../assets/access-rights.svg";
import homepage from "../../../../assets/roles-homepage.svg";

function Navigation({ title }) {
  return (
    <div>
      <section className="sidenav-all">
        <p>ALL</p>

        <div className="sidenav-all-dashboard">
          <div className="all-dashboard-item">
            <div>
              <img src={dashboard} alt="dashboard image" />
              <p>Dashboard</p>
            </div>
          </div>
        </div>

        <div
          className="sidenav-all-employee"
          id="employeeSection"
        >
          <NavLink to="/mainpage/employees">
            <div className="all-employees-item">
              <div>
                <img src={employee} alt="employees image" />
                <p>Employees</p>
              </div>
            </div>
          </NavLink>
        </div>
      </section>

      <section className="sidenav-role">
        <p id="sideNavRoleText">{title}</p>

        <div
          className="roles-wrapper "
          id="rolesSection"
        >
          <NavLink to="/mainpage/roles">
            <div className="user-roles active-roles">
              <div>
                <img src={homepage} alt="roles image" />
                <p>Roles</p>
              </div>
            </div>
          </NavLink>
        </div>

        <div className="user-roles">
          <div>
            <img src={accessRights} alt="user roles image" />
            <p>Access Rights</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Navigation;
