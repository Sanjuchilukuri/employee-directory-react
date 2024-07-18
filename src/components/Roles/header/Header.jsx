import React from "react";
import "./Header.scss";
import Button from "../../common/button/Button";
import { Navigate, useNavigate } from "react-router-dom";

function Header({ name, description }) {
  const navigate = useNavigate();
  return (
    <section class="add-employee">
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      <div>
        <Button
          color="btn--red"
          size="btn--medium"
          classes="add-btn"
          onClick={() => {
            navigate("/mainpage/roles/addrole");
          }}
        >
          ADD ROLE
        </Button>
      </div>
    </section>
  );
}

export default Header;
