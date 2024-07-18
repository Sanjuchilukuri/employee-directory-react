import React, { useState } from "react";
import "./DropdownFilter.scss";
import filterIcon from "../../../assets/sort-descending.png";

function DropdownFilter({ options, filters, updateFilter }) {
  const [tempFilters, setTempFilters] = useState(filters);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setTempFilters((prevTempFilters) => ({
      ...prevTempFilters,
      [name]: value,
    }));
  };

  const handleReset = () => {
    const resetFilters = Object.keys(filters)
      .filter((key) => key !== "alphabet")
      .reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
    
    setTempFilters(resetFilters);

    Object.keys(filters)
      .filter((key) => key !== "alphabet")
      .map((key) => {
        updateFilter(key, "");
      });
  };

  const hasFiltersApplied = Object.keys(tempFilters).some((key) => {
    return key !== "alphabet" && tempFilters[key];
  });

  const applyFilters = () => {
    Object.keys(filters).map((key) => {
      if (key !== "alphabet") updateFilter(key, tempFilters[key]);
    });
  };

  return (
    <section className="filter" id="filter">
      <div className="filter-options">
        <p>Filter</p>
        <img src={filterIcon} alt="sorting icon" />

        {options &&
          Object.keys(options).map((key) => (
            <select
              name={`${key}Filter`}
              key={key}
              value={tempFilters[`${key}Filter`]}
              onChange={handleFilterChange}
            >
              <option value="" hidden default>
                {key}
              </option>
              {options[key] &&
                options[key].map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
            </select>
          ))}
      </div>
      <div>
        <button
          className="reset-btn"
          id="resetBtn"
          onClick={handleReset}
          style={{ cursor: hasFiltersApplied ? "pointer" : "not-allowed" }}
          disabled={!hasFiltersApplied}
        >
          Reset
        </button>
        <button
          className="apply-btn"
          id="applyBtn"
          onClick={applyFilters}
          style={{
            cursor: hasFiltersApplied ? "pointer" : "not-allowed",
            backgroundColor: hasFiltersApplied ? "red" : "#f55d5d",
          }}
          disabled={!hasFiltersApplied}
        >
          Apply
        </button>
      </div>
    </section>
  );
}

export default DropdownFilter;
