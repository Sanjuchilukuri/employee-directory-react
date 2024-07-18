import React, { useEffect, useState } from "react";
import "./AddEmpForm.scss";
import blankProfile from "../../../assets/profiles/blank-profile-picture.webp";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FetchProjects from "../../../Actions/FetchProjects";
import FetchManagers from "../../../Actions/FetchManagers";
import FetchRoles from "../../../Actions/Roles/FetchRoles";
import api from "../../../api/Interceptor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FetchLocations from "../../../Actions/FetchLocations";
import FetchDepartments from "../../../Actions/FetchDepartments";
import FetchEmployeeById from "../../../Actions/Employee/FetchEmployeeById";
import { modes } from "../../../constants/constants";

function AddEmpForm({ mode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { empid } = useParams();
  const [viewMode, setViewMode] = useState(false);
  const [image, setImage] = useState(blankProfile);

  const [refresh, setRefresh] = useState(false);
  let isRolesFetched = useSelector((state) => state.FetchRoles.success);

  const projects = useSelector((state) => state.FetchProjects.data);
  const managers = useSelector((state) => state.FetchManagers.data);
  const departments = useSelector((state) => state.FetchDepartments.data);
  const roles = useSelector((state) => state.FetchRoles.data);
  const locations = useSelector((state) => state.FetchLocations.data);
  let employee = useSelector((state) => state.FetchEmployeeById.data);

  useEffect(() => {
    dispatch(FetchProjects({}));
    dispatch(FetchManagers({}));
    dispatch(FetchLocations({}));
    dispatch(FetchDepartments({}));
    if (empid) {
      dispatch(FetchEmployeeById(empid));
    }
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (employee && (mode === modes.viewMode || mode === modes.editMode)) {
      dispatch(FetchRoles(employee.departmentId));
      setImage(employee.image);
      Object.keys(employee).forEach((key) => {
        setValue(key, employee[key]);
      });
      employee = "";
    }
    if (mode === modes.viewMode) {
      setViewMode(true);
    }
  }, [employee]);

  const onSubmit = async (newemployee) => {
    newemployee.image = image;
    if (mode === modes.editMode) {
      await api
        .put(`/Employee/${empid}`, newemployee)
        .then(() => {
          toast.info("Employee Updated Successfully", { autoClose: 2000 });
          reset();
        })
        .catch((error) => {
          toast.error("Failed to Add Employee, try again...");
        });
    } else if (mode === modes.addMode) {
      await api
        .post("/Employee", newemployee)
        .then(() => {
          toast.success("Employee Added Successfully", { autoClose: 2000 });
          reset();
        })
        .catch((error) => {
          toast.error("Failed to Update Employee, try again...");
        });
    }
    setImage(blankProfile);
  };

  const handleDepartmentChange = async (e) => {
    const department = e.target.value;
    await dispatch(FetchRoles(department));
    setRefresh(true);
  };

  // useEffect(() => {

  // }, [isRolesFetched, dispatch]);

  const updateFormImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="employee-model" id="employeeModel">
      <h2>Add Employee</h2>
      <section>
        <input
          type="file"
          id="file"
          disabled={viewMode ? true : false}
          onChange={updateFormImage}
        />
        <div className="image-section">
          <label htmlFor="file">
            <img id="img" src={image} alt="Profile picture" accept="image/*" />
            <p>Edit</p>
          </label>
        </div>

        <form id="form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p>Personal Information</p>
            <div>
              <label htmlFor="empno">Emp No</label>
              <input
                type="text"
                id="empno"
                placeholder="Text"
                disabled
                {...register("empId")}
              />
              {/* {errors.empno && <span className="error">EmpNo is required</span>} */}
            </div>

            <div className="wrapper">
              <div>
                <label htmlFor="firstName">Firstname</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="FirstName"
                  disabled={viewMode ? true : false}
                  {...register("firstName", {
                    required: "FirstName is required",
                    pattern: {
                      value: /^[A-Za-z]{3}[A-Za-z]*/,
                      message: "Minimum 3 characters required",
                    },
                  })}
                />
                {errors.firstName && (
                  <span className="error">{errors.firstName.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="lastName">Lastname</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="LastName"
                  disabled={viewMode ? true : false}
                  {...register("lastName", {
                    required: "LastName is required",
                    pattern: {
                      value: /^[A-Za-z]{3}[A-Za-z]*/,
                      message: "Minimum 3 characters required",
                    },
                  })}
                />
                {errors.lastName && (
                  <span className="error">{errors.lastName.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="dateofBirth">Date of Birth</label>
                <input
                  placeholder="Select"
                  type="date"
                  id="dateofBirth"
                  disabled={viewMode ? true : false}
                  {...register("dateofBirth")}
                />
              </div>
            </div>
            <div className="wrapper">
              <div>
                <label htmlFor="email">Email Id</label>
                <input
                  type="email"
                  id="email"
                  placeholder="joe.j@technovert.com"
                  disabled={viewMode ? true : false}
                  {...register("email", {
                    required: "Mail is required",
                    pattern: {
                      value: /^[a-z0-9]+[.]{0,1}[a-z0-9]+@[a-z]*.com/,
                      message: "Invalid Mail address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="error">{errors.email.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="phoneNumber">Mobile Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="0000000000"
                  disabled={viewMode ? true : false}
                  {...register("phoneNumber", {
                    required: "PhoneNumber is required",
                    pattern: {
                      value: /^[1-9][0-9]{9}/,
                      message: "Invalid Phone Number",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <span className="error">{errors.phoneNumber.message}</span>
                )}
              </div>
            </div>
          </div>

          <div>
            <p className="emp-inf-heading">Employee Information</p>
            <div className="wrapper">
              <div>
                <label htmlFor="joining">Joining Date</label>
                <input
                  type="date"
                  id="joining"
                  disabled={viewMode ? true : false}
                  {...register("joiningDate", {
                    required: "Joining Date is required",
                  })}
                />
                {errors.joiningDate && (
                  <span className="error">{errors.joiningDate.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="location">Location</label>
                <select
                  id="location"
                  {...register("locationId")}
                  disabled={viewMode ? true : false}
                >
                  <option value="" default hidden>
                    Locations
                  </option>
                  {locations &&
                    locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="wrapper">
              <div>
                <label htmlFor="department">Department</label>
                <select
                  id="department"
                  disabled={viewMode ? true : false}
                  {...register("departmentId")}
                  onChange={handleDepartmentChange}
                >
                  <option value="" default hidden>
                    Departments
                  </option>
                  {departments &&
                    departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="jobTitle">Job Title</label>
                <select
                  id="jobTitle"
                  disabled={viewMode ? true : false}
                  {...register("roleId")}
                >
                  <option value="1" default hidden>
                    Roles
                  </option>
                  {roles &&
                    roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="wrapper">
              <div>
                <label htmlFor="manager">Assign Manager</label>
                <select
                  id="manager"
                  disabled={viewMode ? true : false}
                  {...register("managerId")}
                >
                  <option value="" default hidden>
                    Managers
                  </option>
                  {managers &&
                    managers.map((manager) => (
                      <option key={manager.id} value={manager.id}>
                        {manager.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="project">Assign Project</label>
                <select
                  id="project"
                  disabled={viewMode ? true : false}
                  {...register("projectId")}
                >
                  <option value="" default hidden>
                    Project
                  </option>
                  {projects &&
                    projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <button
              type="reset"
              onClick={() => {
                navigate("/mainpage/employees");
              }}
            >
              Cancel
            </button>
            <button
              id="formSubmitBtn"
              type="submit"
              style={{ display: viewMode ? "none" : "block" }}
            >
              {mode == modes.addMode ? "Add Employee" : "Update Employee"}
            </button>
          </div>
        </form>
      </section>
      <ToastContainer />
    </div>
  );
}

export default AddEmpForm;
