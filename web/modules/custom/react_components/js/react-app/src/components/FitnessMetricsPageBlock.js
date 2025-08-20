import React from "react";

function FitnessMetricsPageBlock({
  title,
  full_circuit_weight,
  goblet_squat_weight,
  lunge_weight,
  number_of_pullups,
  pushup_weight,
}) {
  console.log("Inside teh Fitness Metrics Page Blocks");
  console.log(
    title,
    full_circuit_weight,
    goblet_squat_weight,
    lunge_weight,
    number_of_pullups,
    pushup_weight
  );
  return (
    <>
      <h3>Fitness Metrics</h3>
      {title ? <p>title is: {title}</p> : ""}
    </>
  );
}

export default FitnessMetricsPageBlock;
