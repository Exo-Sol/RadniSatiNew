import React, { useState, useEffect } from "react";
import MainDiv from "./components2/MainDiv";
import Delete from "./components2/Delete";
import NukeStorage from "./components2/NukeStorage";
import dropdown from "../Icons/dropdown.png";
import Calculate from "../seconPage/components2/Calculate";
import "./styles2/styles.css";

const SecondPage = ({ change, onAddedTime }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  /////////////////////////////getting JObs
  /////////////////////////////////////////////////////////

  const currentJob = localStorage.getItem("currentJob");
  //////////////////////////////
  /////////Need to set cur job so it changes before usefeect for getting relevan array

  //////////////////////////////////////////////////////////////////
  const dateObj = new Date();
  const [curJob, setCurJob] = useState(currentJob);
  const [linkEffect, setLinkEffect] = useState(false);
  const [month, setMonth] = useState(dateObj.getMonth() + 1);
  const [relevantShifts, setRelevantShifts] = useState([]);
  const [calcSall, setCalcSall] = useState(false);

  ///////////////////////////////////////////////////////////////////
  const retriveArr = JSON.parse(localStorage.getItem(dateObj.getFullYear()));

  //////////////////////////////////////////////////////////////////
  useEffect(() => {
    setCurJob(() => currentJob);
    setRelevantShifts(() => []);

    setLinkEffect(!linkEffect);
  }, [change]);
  ////////////////////////////////////////////////////////////
  const monthsWorked = new Set();

  //////////////// populate dropdown with avaliable months /////////////////////////////////////////
  if (retriveArr) {
    if (Array.isArray(retriveArr)) {
      retriveArr.map((ele, ind) => {
        if (ele.job === currentJob) {
          monthsWorked.add(ele.month);
        }
      });
    } else {
      monthsWorked.add(retriveArr.month);
    }
  }
  /////////////////////////////
  const newMonthArr = [];

  monthsWorked.forEach((ele) => newMonthArr.push(parseInt(ele)));

  newMonthArr.sort((a, b) => a - b);

  ///////////////////////////////udating relevant data when month change or user inputs something on first page/////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (Array.isArray(retriveArr)) {
      retriveArr.map((ele, ind) => {
        if (ele.job === curJob && ele.month === month) {
          setRelevantShifts((relevantShifts) => [...relevantShifts, ele]);
        }
      });
    } else if (retriveArr) {
      if (retriveArr.job === curJob && retriveArr.month === month) {
        setRelevantShifts([retriveArr]);
      }
    }
    return () => setRelevantShifts([]);
  }, [month]);

  useEffect(() => {
    if (Array.isArray(retriveArr)) {
      retriveArr.map((ele, ind) => {
        if (ele.job === curJob && ele.month === month) {
          setRelevantShifts((relevantShifts) => [...relevantShifts, ele]);
        }
      });
    } else if (retriveArr) {
      if (retriveArr.job === curJob && retriveArr.month === month) {
        setRelevantShifts([retriveArr]);
      }
    } else {
      setRelevantShifts([]);
    }
    return () => setRelevantShifts([]);
  }, [linkEffect]);

  //////////////////////////////////////////////////////////////////////////////////////////////
  const dropDown = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const setClickedMonth = (e) => {
    e.preventDefault(); // maybe
    setMonth(parseInt(e.target.innerText));
    if (month !== parseInt(e.target.innerText)) {
      setRelevantShifts([]);
    }
    setToggleDropdown(false);
  };

  const calculateSallary = () => {
    setCalcSall(!calcSall);
  };

  return calcSall ? (
    <div className="mainDivContainer">
      <div className="curJob">{curJob}</div>
      <ul className="monthWhole">
        <li className="material-icons icons" onClick={dropDown}>
          <img src={dropdown} id="dropIcon" />{" "}
          <p id="dropMonths">Mjesec {month}</p>
        </li>
        {toggleDropdown &&
          newMonthArr.map((ele, ind) => (
            <li key={ind} className="monthList" onClick={setClickedMonth}>
              {ele}
            </li>
          ))}
      </ul>
      {!toggleDropdown && (
        <MainDiv data={relevantShifts} calc={calculateSallary} />
      )}
      <Delete relevantShifts={relevantShifts} onAddedTime={onAddedTime} />
      <NukeStorage onAddedTime={onAddedTime} />
    </div>
  ) : (
    <Calculate back={calculateSallary} cur={curJob} />
  );
};

export default SecondPage;
