import React, { useState, useEffect } from "react";

import HList from "../components/HList";

import "../styles/mainStyle.css";

import PopUp from "./PopUp";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const DateNav = ({ catchData, curJob, catchD }) => {
  const [clickCount, setClickCount] = useState(0);

  //////////DATE FORMARING//////////////////////////
  //////////////////////////////////////////////////
  const formatDate = (count) => {
    const dateObj = new Date(),
      dayNames = ["Ned", "Pon", "Uto", "Sri", "Cet", "Pet", "Sub"];
    if (clickCount !== 0) {
      dateObj.setDate(new Date().getDate() + count);
    }

    return {
      year: dateObj.getFullYear(),
      day: dateObj.getDate(),
      month: dateObj.getMonth() + 1,
      dayName: dayNames[dateObj.getDay()],
    };
  };
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  const [selectedDay, setSelectedDay] = useState(formatDate());
  ///////////////////////////////////////////////////////////////
  const [workHours, setWorkHours] = useState(undefined);
  //////////////////////////////////////////////////////////////
  const [selectedTimes, setSelectedTimes] = useState({
    startTime: null,
    endTime: null,
  });
  //////////////////////////////////////////////////////////////
  const [popUpState, setPopUpState] = useState(false);

  ////////////////////////ANIMATION///////////////////////////////////////

  ///////////////////////////////////////////////////////////////

  // settin the displayed date <_> clicking day back or foward is hooked with useEffect to change state
  //witch is date displayed visualy

  useEffect(() => {
    setSelectedDay(formatDate(clickCount));
  }, [clickCount]);

  const dayFoward = () => {
    setClickCount((count) => count + 1);
  };

  const dayBack = () => {
    setClickCount((count) => count - 1);
  };

  /////////////JSX variables/////////////////////////////////

  const backArrow = (
    <ArrowBackIosIcon
      style={{ fontSize: "50px", fontWeight: 100, opacity: 0.7 }}
      className="material-icons timeArrow"
      onClick={dayBack}
    ></ArrowBackIosIcon>
  );

  const fwdArrow = (
    <ArrowForwardIosIcon
      style={{ fontSize: "50px", fontWeight: 100, opacity: 0.7 }}
      className="material-icons timeArrow"
      onClick={dayFoward}
    ></ArrowForwardIosIcon>
  );
  /////////////////////////////////////////////////////////
  const clickHour = (e) => {
    if (!selectedTimes.startTime) {
      setSelectedTimes({ ...selectedTimes, startTime: e.target.textContent });
    } else if (!selectedTimes.endTime) {
      // make unable to select end time lower than start time
      if (parseInt(e.target.textContent) > parseInt(selectedTimes.startTime)) {
        setSelectedTimes({ ...selectedTimes, endTime: e.target.textContent });
      }
    }
  };

  /////////////////////////////////////////////////////////////////////
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (selectedTimes.endTime !== null) {
        let derivedWorkHours = selectedTimes.endTime - selectedTimes.startTime;
        setWorkHours(derivedWorkHours);
      }
    }
    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [selectedTimes.endTime]);

  ////////////////////////////////////////////////////////////////////

  const hoursChange = (e) => {
    setWorkHours(e.target.value);
  };

  //////////////////////////////////
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      workHours > 24 ||
      workHours < 0 ||
      workHours === "" ||
      workHours === undefined
    ) {
      alert("Netocno uneseni sati");
    } else if (selectedTimes.startTime && !selectedTimes.endTime) {
      alert("Unesite pocetak pa kraj smjene, unijeli ste samo pocetak");
      setSelectedTimes({
        startTime: null,
        endTime: null,
      });
    } else if (workHours !== 0) {
      catchData(selectedDay, workHours, selectedTimes);

      setSelectedTimes({
        startTime: null,
        endTime: null,
      });
      /////////////////////////
      setPopUpState(true);
      setTimeout(() => {
        setPopUpState(false);
      }, 800);
    }
  };
  /////////////////////////////////////////////
  const clickDelete = () => {
    setWorkHours("");
    setSelectedTimes({
      startTime: null,
      endTime: null,
    });
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="popUpWrapper">
        {popUpState ? <PopUp curJob={curJob} /> : <div></div>}
      </div>
      <div className="dateNav">
        {backArrow}

        <span id="animateDate">{`${selectedDay.dayName}, ${selectedDay.day}/${selectedDay.month}`}</span>
        {fwdArrow}
      </div>
      <div className="flexWrapNav">
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          className="inputField"
          name="workHours"
          placeholder="Radni sati"
          value={workHours}
          onChange={hoursChange}
          style={{ display: "block" }}
          onKeyDown={(evt) =>
            ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()
          }
        />
        <br />
        <div className="flexWrapButtons">
          <input
            type="submit"
            onClick={onSubmit}
            value="Save"
            id="save"
            className="buttons"
          />

          <button id="delete" onClick={clickDelete} className="buttons">
            Del
          </button>
        </div>
        <div className="hourPad">
          <HList
            clickHour={clickHour}
            selectedTimes={selectedTimes}
            catchD={catchD}
          />
        </div>
      </div>
    </>
  );
};

export default DateNav;
