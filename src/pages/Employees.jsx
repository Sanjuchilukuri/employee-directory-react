import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/employees/header/Header";
import AlphabetFilter from "../components/employees/alphabet-filter/AlphabetFilter";
import DropdownFilter from "../components/common/dropdown-filter/DropdownFilter";
import Table from "../components/common/table/Table";
import FetchEmployees from "../Actions/Employee/FetchEmployees";
import FetchDepartments from "../Actions/FetchDepartments";
import FetchLocations from "../Actions/FetchLocations";
import { TableHeaders, status } from "../constants/constants";


function Employees() {
  const EmployeesData = useSelector((state) => state.FetchEmployees.data);
  const location = useSelector((state) => state.FetchLocations.data);
  const department = useSelector((state) => state.FetchDepartments.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchEmployees());
    dispatch(FetchDepartments());
    dispatch(FetchLocations());
  }, [dispatch]);

  const filterOptions = {
    status,
    location,
    department,
  };

  const [filters, setFilters] = useState({
    alphabet: "",
    statusFilter: "",
    locationFilter: "",
    departmentFilter: "",
  });

  const updateFilter = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const filteredEmployees =
    EmployeesData &&
    EmployeesData.filter((employee) => {
      const matchesAlphabet = filters.alphabet
        ? employee.firstName.startsWith(filters.alphabet)
        : true;
      const matchesStatus = filters.statusFilter
        ? employee.status === filters.statusFilter
        : true;
      const matchesLocation = filters.locationFilter
        ? employee.location === filters.locationFilter
        : true;
      const matchesDepartment = filters.departmentFilter
        ? employee.department === filters.departmentFilter
        : true;

      return (
        matchesAlphabet && matchesStatus && matchesLocation && matchesDepartment
      );
    });

  return (
    <>
      <Header
        name="Employees"
        description="Find all of your company's employee accounts and their associated roles"
        Employees={filteredEmployees}
      />
      <AlphabetFilter filters={filters} updateFilter={updateFilter} />
      <DropdownFilter
        options={filterOptions}
        filters={filters}
        updateFilter={updateFilter}
      />
      <Table tableHeaders={TableHeaders} Employees={filteredEmployees} />
    </>
  );
}

export default Employees;
