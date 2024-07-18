import { combineReducers } from "@reduxjs/toolkit";
import SignInSlice from "./slices/SignInSlice";
import FetchprojectsSlice from "./slices/projectsSlice";
import FetchManagersSlice from "./slices/ManagersSlice";
import FetchLocationsSlice from "./slices/LocationsSlice";
import FetchDepartmentsSlice from "./slices/DepartmentsSlice";
import { fetchEmployeeByIdReducer, fetchEmployeesReducer, } from "./slices/EmployeeSlice";
import { fetchAllRolesReducer, fetchRolesReducer, } from "./slices/RolesSlice";


const RootReducer = combineReducers({
    SignIn: SignInSlice,
    FetchProjects: FetchprojectsSlice,
    FetchManagers: FetchManagersSlice,
    FetchLocations: FetchLocationsSlice,
    FetchDepartments: FetchDepartmentsSlice,
    FetchRoles: fetchRolesReducer,
    FetchEmployees: fetchEmployeesReducer,
    FetchEmployeeById: fetchEmployeeByIdReducer,
    FetchAllRoles: fetchAllRolesReducer
});

export default RootReducer;
