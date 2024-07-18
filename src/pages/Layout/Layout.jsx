import "./Layout.scss";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Topnav from "../../components/common/topnav/Topnav";
import Sidenav from "../../components/common/sidenav/Sidenav";
import Employees from "../Employees";
import Roles from "../Roles";
import AddEmpForm from "../../components/employees/add-employee-form/AddEmpForm";
import AddRoleForm from "../../components/Roles/add-roles-form/AddRoleForm";
import DeptEmployees from "../../components/Roles/dept-Employees/DeptEmployees";
import { modes } from "../../constants/constants";

function Layout({ children }) {
  return (
    <div className="container">
      <Sidenav />
      <main id="main">
        <Topnav />
        {children}
      </main>
    </div>
  );
}

export default Layout;
