import { React, useState, useEffect, useMemo } from "react";
import "./Table.scss";
import arrowLeftDown from "../../../assets/arrow-left-down.png";
import tableIcon from "../../../assets/table-icon.png";
import { useNavigate } from "react-router-dom";
import api from "../../../api/Interceptor";

function Table({ tableHeaders, Employees }) {
  const [prev, setPrev] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const displayElement = {};
  const navigate = useNavigate();
  const setRef = (idx) => (ele) => {
    displayElement[idx] = ele;
  };

  const toggleOptions = (empId) => {
    if (displayElement[empId]) {
      if (displayElement[prev]) {
        displayElement[prev].classList.remove("last-element");
        if (prev === empId) {
          setPrev();
        } else {
          displayElement[empId].classList.add("last-element");
          displayElement[empId].focus();
          setPrev(empId);
        }
      } else {
        displayElement[empId].classList.add("last-element");
        displayElement[empId].focus();
        setPrev(empId);
      }
    }
  };

  const handleDeleteEmployee = async (empId) => {
    await api.delete(`/Employee/${empId}`);
  };

  const handleViewDetails = (empId) => {
    navigate(`/mainpage/employees/view/${empId}`);
  };

  const handleEditDetails = (empId) => {
    navigate(`/mainpage/employees/edit/${empId}`);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(Employees.map((employee) => employee.empId));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (event) => {
    const { id } = event.target;
    setSelectedItems((prevItems) =>
      prevItems.includes(id)
        ? prevItems.filter((item) => item !== id)
        : [...prevItems, id]
    );
  };

  useEffect(() => {
    setSelectAll(selectedItems.length === Employees.length);
  }, [selectedItems, Employees.length]);

  const handleDeleteSelectedItems = () => {
    selectedItems.map((item) => {
      handleDeleteEmployee(item);
    });
    setSelectedItems([]);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "ascending";
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = useMemo(() => {
    let sortableEmployees = [...Employees];
    if (sortConfig.key) {
      sortableEmployees.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableEmployees;
  }, [Employees, sortConfig]);

  return (
    <section className="user-data">
      <div className="delete">
        <div>
          <img src={arrowLeftDown} alt="arrow-left-down" />
          <button
            id="deleteBtn"
            onClick={handleDeleteSelectedItems}
            disabled={!selectedItems.length}
            style={{
              backgroundColor: selectedItems.length ? "red" : "#f89191",
              cursor: selectedItems.length ? "pointer" : "not-allowed",
            }}
          >
            Delete
          </button>
        </div>
        <img src={tableIcon} alt="table icon" />
      </div>

      <div style={{ overflowX: "scroll" }}>
        <table id="table">
          <thead>
            <tr>
              <td>
                <input
                  id="selectAll"
                  type="checkbox"
                  name="select-all"
                  onClick={handleSelectAll}
                  checked={selectAll}
                />
              </td>
              {tableHeaders.map((header) => (
                <th key={header.id}>
                  <div className="heading-wrapper">
                    <button
                      className="transparent-btn"
                      id={header.id}
                      onClick={() => handleSort(header.id)}
                    >
                      {header.label}
                    </button>
                    <div className="icon">
                      <i
                        className={`fa-solid fa-chevron-${
                          sortConfig.key === header.id &&
                          sortConfig.direction === "ascending"
                            ? "up"
                            : "down"
                        }`}
                      ></i>
                    </div>
                  </div>
                </th>
              ))}
              <th>...</th>
            </tr>
          </thead>
          <tbody id="tableBody">
            {sortedEmployees ? (
              sortedEmployees.map((employee, i) => (
                <tr key={employee.empId}>
                  <td>
                    <input
                      type="checkbox"
                      id={employee.empId}
                      onChange={handleCheckboxChange}
                      checked={selectedItems.includes(employee.empId)}
                    />
                  </td>

                  <td>
                    <div className="user">
                      <img
                        src={employee.image}
                        alt={`${employee.firstName} ${employee.lastName}`}
                      />
                      <div className="user-details">
                        <p className="name">
                          {employee.firstName} {employee.lastName}
                        </p>
                        <p className="mail">{employee.email}</p>
                      </div>
                    </div>
                  </td>

                  <td>{employee.location}</td>
                  <td>{employee.department}</td>
                  <td>{employee.role}</td>
                  <td id={employee.empId}>{employee.empId}</td>
                  <td className="appearance">
                    <p>{employee.status}</p>
                  </td>
                  <td>{employee.joiningDate}</td>
                  <td>
                    <button
                      className="ellipsis transparent-btn"
                      onClick={() => {
                        toggleOptions(employee.empId);
                      }}
                    >
                      ...
                    </button>

                    <button ref={setRef(employee.empId)} className="hide">
                      <button
                        className="additional-options transparent-btn"
                        id="viewEmployee"
                        onClick={() => handleViewDetails(employee.empId)}
                      >
                        View Details
                      </button>
                      <button
                        className="additional-options transparent-btn"
                        id="editEmployee"
                        onClick={() => handleEditDetails(employee.empId)}
                      >
                        Edit
                      </button>
                      <button
                        className="additional-options transparent-btn"
                        id="deleteEmployee"
                        onClick={() => handleDeleteEmployee(employee.empId)}
                      >
                        Delete
                      </button>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" align="center">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Table;
