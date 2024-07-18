import React, { useState } from "react";
import blackFilter from "../../../assets/filter-black.svg";
import "./AlphabetFilter.scss";
import { Alphabets } from "../../../constants/constants";

function AlphabetFilter({ filters, updateFilter }) {
  const [prevAlphabet, setPrevAlphabet] = useState(null);

  const alphabetClickHandler = (event) => {
    if (prevAlphabet) {
      prevAlphabet.classList.remove("alphabet-active");
      if (prevAlphabet !== event.target) {
        event.target.classList.toggle("alphabet-active");
        setPrevAlphabet(event.target);
        updateFilter("alphabet", event.target.id);
      } else {
        setPrevAlphabet(null);
        updateFilter("alphabet", "");
      }
    } else {
      event.target.classList.toggle("alphabet-active");
      updateFilter("alphabet", event.target.id);
      setPrevAlphabet(event.target);
    }
  };

  const resetAlphabetFilter = () => {
    if (prevAlphabet) {
      prevAlphabet.classList.remove("alphabet-active");
      setPrevAlphabet(null);
      updateFilter("alphabet", "");
    }
  };

  return (
    <section className="options">
      <ul id="alphabetsWrapper">
        <li>
          <img
            id="alphabetsFilter"
            src={blackFilter}
            onClick={resetAlphabetFilter}
            alt="filter-icon"
          />
        </li>
        {Alphabets.map((alphabet) => (
          <li key={alphabet} onClick={alphabetClickHandler} id={alphabet}>
            {alphabet}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AlphabetFilter;
