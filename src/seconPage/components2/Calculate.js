import React, { useState, useEffect } from "react";

const Calculate = ({ back, cur }) => {
  const [pay, setPay] = useState();

  const payMent = (e) => {
    setPay(e.target.value);
  };

  const goBack = () => {
    back();
  };

  const savePay = () => {
    localStorage.setItem(cur, pay);
  };

  return (
    <div className="calculate">
      <div style={{ color: "white" }}>{cur}</div>
      <input
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        className="inputField"
        name="Placa po satu"
        placeholder="Placa po satu"
        value={pay}
        onChange={payMent}
        style={{ display: "block" }}
        onKeyDown={(evt) =>
          ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()
        }
      />
      <button onClick={goBack}> Nazad</button>
      <button onClick={savePay}>Spremi</button>
    </div>
  );
};

export default Calculate;
