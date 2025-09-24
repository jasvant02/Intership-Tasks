import React, { useState } from "react";

export const Converts = () => {
  const [heights, setHeights] = useState();
  const [weight, setWeight] = useState("");
  const [cm, setCm] = useState("");
  const [kilo, setKilo] = useState("");
  const [bmi, setBmi] = useState("");

  const handleheight = (e) => {
    const heightsvalue = e.target.value;
    setHeights(heightsvalue);
    const cm = parseFloat(heightsvalue * 2.4);
    setCm(cm);
  };

  const handleweight = (e) => {
    const weightvalue = e.target.value;
    setWeight(weightvalue);
    const kilos = parseFloat(weightvalue / 2.2046);
    setKilo(kilos);
  };

  const handleBMI = () => {
    const bmi = parseFloat(kilo) / (cm * cm * 100);
    setBmi(bmi);
  };
  return (
    <>
      <h1>miles to kilo</h1>
      <div>
        <input
          type="number"
          //   name="miles"
          placeholder="Enter heights in inches"
          value={heights}
          onChange={handleheight}
        />

        <p>Centimetermeter:{cm}</p>

        <input
          type="number"
          //   name="miles"
          placeholder="Enter weights in pounds"
          value={weight}
          onChange={handleweight}
        />

        <p>Kilogram:{kilo}</p>

        <button onClick={handleBMI}>BMI</button>
        <p>{bmi}</p>
      </div>
    </>
  );
};
