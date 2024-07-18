import { React, useEffect, useState } from "react";
import Header from "../components/roles/header/Header";
import DropdownFilter from "../components/common/dropdown-filter/DropdownFilter";
import { useDispatch, useSelector } from "react-redux";
import FetchEmployees from "../Actions/Employee/FetchEmployees";
import FetchDepartments from "../Actions/FetchDepartments";
import FetchLocations from "../Actions/FetchLocations";
import RolesCards from "../components/roles/cards/Cards";
import FetchAllRoles from "../Actions/roles/FetchAllRoles";

function Roles() {
  const department = useSelector((state) => state.FetchDepartments.data);
  const Roles = useSelector((state) => state.FetchAllRoles.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchEmployees());
    dispatch(FetchDepartments());
    dispatch(FetchLocations());
    dispatch(FetchAllRoles());
  }, []);

  const filterOptions = {
    department,
  };

  const [filters, setFilters] = useState({
    departmentFilter: "",
  });

  const updateFilter = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <>
      <Header name="Roles" description="All the roles are configure here" />
      <DropdownFilter
        options={filterOptions}
        filters={filters}
        updateFilter={updateFilter}
      />
      <RolesCards Roles={Roles} />
    </>
  );
}

export default Roles;
