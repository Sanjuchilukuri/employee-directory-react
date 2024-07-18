import { React } from "react";
import "./Cards.scss";
import editIcon from "../../../assets/edit.svg";
import employeeIcon from "../../../assets/employee copy.svg";
import arrow from "../../../assets/right-arrow.svg";
import { useNavigate } from "react-router-dom";

function RolesCards({ Roles }) {
  const navigate = useNavigate();
  return (
    <section class="cards" id="cardsWrapper">
      {Roles &&
        Roles.map((role) => (
          <div class="card">
            <div class="text-icon">
              <p>{role.name}</p>
              <img src={editIcon} alt="edit icon" />
            </div>
            <div class="about">
              <div class="department">
                <div class="department-text">
                  <img src={employeeIcon} alt="department icon" />
                  <p>Department</p>
                </div>
                <p>{role.departmentName}</p>
              </div>
              <div class="total-employees">
                <p>Total Employees</p>
                <div class="img-container">
                  {role.employees &&
                    role.employees.map((employee) => (
                      <img src={employee.image} alt="employee icon" />
                    ))}
                  <p>
                    {role.employees.length > 4
                      ? role.employees.length - 4
                      : role.employees.length == 0 && 0}
                  </p>
                </div>
              </div>
            </div>
            <div class="employee-view">
              <div
                className ="emloyee-wrapper"
                onClick={() => {
                  navigate(`/mainpage/roles/allemployees/${role.departmentName}`);
                }}
              >
                <p>view all Employees</p>
                <img src={arrow} alt="arrow icon" />
              </div>
            </div>
          </div>
        ))}
    </section>
  );
}

export default RolesCards;
