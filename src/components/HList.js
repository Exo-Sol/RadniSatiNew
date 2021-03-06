import React, { useState } from "react";
import { useSpring, animated, useTransition } from "react-spring";
import clockBuilder from "../Icons/clockBuilder.png";
import eject from "../Icons/eject.png";
// import EjectIcon from "@material-ui/icons/Eject";
// import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

import "../styles/mainStyle.css";

const HList = ({ clickHour, selectedTimes, catchD }) => {
  // const clickedBtn = (e) => {
  //   clickHour
  //   console.log(e.target.textContent);
  // };

  // create an array of jobe time stamps, for now
  const arr = [];
  ////////////////////////
  const [displaySelector, changeDisplySelector] = useState(false);

  /////////////////////////////ANIMATION///////////////////////////////////////
  const props = useSpring({
    config: { duration: 1250 },
    opacity: 1,
    from: { opacity: 0 },
  });

  const transitions = useTransition(displaySelector, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  ///////////////////////////////////////////////////////////////

  const startStyle = {
    backgroundColor: "#5de6da",
    color: "black",
    border: "none",
  };

  const endStyle = {
    backgroundColor: "#ee3968",
    color: "black",
    border: "none",
  };

  const resetSyle = {
    border: "#f0ffff 1px solid",

    backgroundColor: "azure",
  };

  const iconStyle = {
    height: "40px",
    width: "40px",
    fontWeight: "300",
    fontSize: "37px",
    textAlign: "center",
  };

  /////////////////////////////////////////////////////
  for (let i = 7; i <= 24; i++) {
    if (i == selectedTimes.startTime) {
      arr.push(
        <h1
          onClick={clickHour}
          className="numberList"
          style={startStyle}
          key={i}
        >
          {i}
        </h1>
      );
    } else if (i == selectedTimes.endTime) {
      arr.push(
        <h1 onClick={clickHour} className="numberList" style={endStyle} key={i}>
          {i}
        </h1>
      );
    } else {
      arr.push(
        <h1
          onClick={clickHour}
          className="numberList"
          style={resetSyle}
          key={i}
        >
          {i}
        </h1>
      );
    }
  }

  const hClick = () => {
    changeDisplySelector(!displaySelector);
    catchD();
  };

  return displaySelector ? (
    transitions.map(
      ({ item, key, props }) =>
        item && (
          <animated.div className="hourSelect" key={key} style={props}>
            {arr}

            <img
              src={eject}
              className="hButton material-icons numberList "
              onClick={hClick}
              style={resetSyle}
            ></img>
          </animated.div>
        )
    )
  ) : (
    <img
      src={clockBuilder}
      className="material-icons numberList hButton"
      onClick={hClick}
      style={resetSyle}
    ></img>
  );
};

export default HList;
