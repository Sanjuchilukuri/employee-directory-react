import React, { useRef } from "react";
import "./Header.scss";
import Button from "../../common/button/Button";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";

function Header({ name, description, Employees }) {
  const navigate = useNavigate();
  const csvLink = useRef();

  const exportTOCSV = () => {
    csvLink.current.link.click();
  };

  return (
    <section className="add-employee">
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      <div>
        <Button
          color="btn--white"
          size="btn--medium"
          classes="export-btn"
          onClick={exportTOCSV}
        >
          EXPORT
        </Button>

        <Button
          color="btn--red"
          size="btn--medium"
          classes="add-btn"
          onClick={() => {
            navigate("/mainpage/employees/addemp");
          }}
        >
          ADD EMPLOYEE
        </Button>

        <CSVLink
          data={Employees}
          filename="employees.csv"
          className="hidden"
          ref={csvLink}
        />
      </div>
    </section>
  );
}

export default Header;
