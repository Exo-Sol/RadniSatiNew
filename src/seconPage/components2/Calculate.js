import React, { useState, useEffect } from "react";

const Calculate = ({ back, cur, totHours, change }) => {
  const [pay, setPay] = useState();
  const [retrivedPay, setRetrivedPay] = useState(localStorage.getItem(cur));

  useEffect(() => {
    setRetrivedPay(localStorage.getItem(cur));
    return () => back();
  }, [cur, change]);

  const payMent = (e) => {
    setPay(e.target.value);
  };

  const goBack = () => {
    back();
  };

  const savePay = () => {
    localStorage.setItem(cur, pay);
    setRetrivedPay(pay);
  };

  const changeSallary = () => {
    localStorage.removeItem(cur);
    setPay(false);
    setRetrivedPay(false);
  };

  return (
    <div className="calculate">
      <div style={{ color: "white" }}>{cur}</div>
      {retrivedPay ? (
        <>
          <div>Zaradjena placa : {parseInt(retrivedPay) * totHours}</div>
          <div>Ukupno sati na poslu: {totHours}</div>
          <div>Placa po satu : {retrivedPay}</div>
          <br></br>
          <button onClick={goBack}> Nazad</button>
          <button onClick={changeSallary}>Promijeni placu za {cur}</button>{" "}
        </>
      ) : (
        <>
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
              ["e", "E", "+", "-", "."].includes(evt.key) &&
              evt.preventDefault()
            }
          />
          <button onClick={goBack}> Nazad</button>
          <button onClick={savePay}>Spremi</button>
        </>
      )}
    </div>
  );
};

export default Calculate;
