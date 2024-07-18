import React, { useEffect } from "react";
import "./DeptEmployees.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FetchEmployees from "../../../Actions/Employee/FetchEmployees";
import idIcon from "../../../assets/id.svg";
import mailIcon from "../../../assets/mail.svg";
import employeeIcon from "../../../assets/employee.svg";
import locationIcon from "../../../assets/location.svg";
import arrow from "../../../assets/right-arrow.svg";

function DeptEmployees() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.FetchEmployees.data);

  useEffect(() => {
    dispatch(FetchEmployees());
  }, [dispatch]);

  return (
    <div className="add-employee-wrapper">
      <section className="add-employee">
        <div>
          <h2>Roles Employees</h2>
          <p>All the roles are configured here</p>
        </div>
        <button
          className="add-btn"
          onClick={() => {
            navigate("/mainpage/employees/addemp");
          }}
        >
          ADD EMPLOYEES
        </button>
      </section>

      <section className="role-description">
        <h2>Role Description</h2>
        <p>
          Configure the providers that are available to users when they sign in.
          Configure the providers that are available to users when they sign in.
          Configure the providers that are available to users when they sign in.
          Configure the providers that are available to users when they sign in.
        </p>
      </section>

      <section className="dept-cards">
        {employees &&
          employees.map((employee) => (
            <div key={employee.empId} className="card">
              <div className="image-section">
                <img src={employee.image} alt="employee icon" />
                <div>
                  <p>
                    {employee.firstName} {employee.lastName}
                  </p>
                </div>
              </div>
              <div className="about">
                <div>
                  <img src={idIcon} alt="id icon" />
                  <p>{employee.empId}</p>
                </div>
                <div>
                  <img src={mailIcon} alt="mail icon" />
                  <p>{employee.email}</p>
                </div>
                <div>
                  <img src={employeeIcon} alt="role icon" />
                  <p>{employee.role}</p>
                </div>
                <div>
                  <img src={locationIcon} alt="location icon" />
                  <p>{employee.location}</p>
                </div>
              </div>
              <div className="view-detail">
                <p>view</p>
                <img
                  src={arrow}
                  alt="view icon"
                  onClick={() =>
                    navigate(`/mainpage/employees/view/${employee.empId}`)
                  }
                />
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}

export default DeptEmployees;
