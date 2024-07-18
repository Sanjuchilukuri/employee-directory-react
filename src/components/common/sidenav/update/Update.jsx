import React from "react";
import "./Update.scss";
import Button from "../../button/Button";

function Update() {
  return (
    <section className="sidenav-update">
      <p>Install new update 2.3.1A</p>
      <p className="update-description">
        Allow to launch the new update for the AD application
      </p>
      <div>
        <Button className="btn" color="btn--white" size="btn--medium">
          Dismiss
        </Button>
        <Button className="btn" color="btn--red" size="btn--medium">
          Accept
        </Button>
      </div>
    </section>
  );
}

export default Update;
