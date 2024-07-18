import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/login/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import Layout from "./pages/layout/Layout";
import Employees from "./pages/Employees";
import Roles from "./pages/Roles";
import AddEmpForm from "./components/employees/add-employee-form/AddEmpForm";
import DeptEmployees from "./components/Roles/dept-Employees/DeptEmployees";
import { modes } from "./constants/constants";
import AddRoleForm from "./components/Roles/add-roles-form/AddRoleForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/mainpage/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/employees/*" element={<Employees />} />
                <Route path="/roles/*" element={<Roles />} />
                <Route
                  path="/employees/addemp"
                  element={<AddEmpForm mode={modes.addMode} />}
                />
                <Route
                  path="/employees/view/:empid"
                  element={<AddEmpForm mode={modes.viewMode} />}
                />
                <Route
                  path="/employees/edit/:empid"
                  element={<AddEmpForm mode={modes.editMode} />}
                />
                <Route path="/roles/addrole" element={<AddRoleForm />} />
                <Route
                  path="roles/allemployees/:dept"
                  element={<DeptEmployees />}
                />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
