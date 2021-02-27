import React, { useState } from "react";

const NameJob = ({ catchName, exit, name }) => {
  const [jobName, setJobName] = useState("");

  const inputName = (e) => {
    setJobName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    catchName(jobName);
  };

  const backClick = () => {
    exit();
  };
  console.log(name);

  return (
    <div className="jobName">
      <form action="" onSubmit={onSubmit}>
        <h3 id="nazivPosla">Unesi naziv posla</h3>
        <div className="miniFlex">
          {name !== null && (
            <button className="saveJob" id="backAddJob" onClick={backClick}>
              {"x"}
            </button>
          )}
          <input
            type="text"
            placeholder="Tu"
            value={jobName}
            onChange={inputName}
            id="placeHolder"
            name="unosPosla"
          />
          <input
            type="submit"
            onClick={onSubmit}
            value="+"
            className="saveJob"
          />
        </div>
      </form>
    </div>
  );
};

export default NameJob;
