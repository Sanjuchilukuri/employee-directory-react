import { React, useEffect, useState } from "react";
import "./AddRoleForm.scss";
import { useDispatch, useSelector } from "react-redux";
import FetchDepartments from "../../../Actions/FetchDepartments";
import FetchLocations from "../../../Actions/FetchLocations";
import { useForm } from "react-hook-form";
import FetchEmployees from "../../../Actions/Employee/FetchEmployees";
import api from "../../../api/Interceptor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddRoleForm() {
  const departments = useSelector((state) => state.FetchDepartments.data);
  const employeesData = useSelector((state) => state.FetchEmployees.data);

  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [displayEmployees, setDisplayEmployees] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchDepartments());
    dispatch(FetchLocations());
    dispatch(FetchEmployees());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (newRole) => {
    api
      .post("/Roles", newRole)
      .then(() => {
        toast.success("Role Added");
        reset();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const showEmployees = (event) => {
    const value = event.target.value.toLowerCase();
    if (value) {
      const filtered = employeesData.filter((employee) =>
        `${employee.firstName} ${employee.lastName}`
          .toLowerCase()
          .includes(value)
      );
      setFilteredEmployees(filtered);
      setDisplayEmployees(true);
    } else {
      setFilteredEmployees([]);
      setDisplayEmployees(false);
    }
  };

  return (
    <section className="add-role-section" id="addRoleSection">
      <h3>Create New Role</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="label-input-wrapper">
            <label htmlFor="role-name">Role Name</label>
            <input
              type="text"
              id="roleName"
              {...register("roleName", {
                required: "RoleName is required",
                pattern: {
                  value: /^[A-Za-z]{3}[A-Za-z]*/,
                  message: "Minimum 3 characters required",
                },
              })}
            />
            {errors.roleName && (
              <span className="error">{errors.roleName.message}</span>
            )}
          </div>
          <div className="label-input-wrapper">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              {...register("departmentId", {
                required: "Department is required",
              })}
            >
              <option value="" hidden>
                Departments
              </option>
              {departments &&
                departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
            </select>
            {errors.departmentId && (
              <span className="error">{errors.departmentId.message}</span>
            )}
          </div>
        </div>

        <div className="label-input-wrapper">
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" cols="30" rows="10">
            Text
          </textarea>
        </div>

        <div className="label-input-wrapper">
          <label htmlFor="assign-employees">Assign Employees</label>
          <input
            type="text"
            id="assignEmployees"
            placeholder="Search for an Employee"
            onKeyUp={showEmployees}
          />
        </div>

        <div className="add-role-form-wrapper">
          {displayEmployees &&
            filteredEmployees.map((employee) => (
              <div className="employee-row" key={employee.empno}>
                <div>
                  <img src={employee.image} alt="Employee" />
                  <p>
                    {employee.firstName} {employee.lastName}
                  </p>
                </div>
                <input type="checkbox" />
              </div>
            ))}
        </div>

        <div className="buttons-section">
          <button type="button" onClick={() => reset()}>
            Cancel
          </button>
          <button type="submit">Add Role</button>
        </div>
      </form>
      <ToastContainer />
    </section>
  );
}

export default AddRoleForm;
