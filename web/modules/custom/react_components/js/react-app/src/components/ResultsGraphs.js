import React from "react";
import BodyFatGraph from "./ResultsGraphs/BodyFatGraph.js";
import RunSpeedGraph from "./ResultsGraphs/RunSpeedGraph.js";
import CalorieGraph from "./ResultsGraphs/CalorieGraph.js";
import WeightGraph from "./ResultsGraphs/WeightGraph.js";

function ResultsGraphs({ jsonGraphData }) {
  // ok just parse everything, work on graphs tomorrow
  // no need to put anything into context, since it's reloaded on page refresh anyway
  // perhaps some type of local storage could be used/optimized... but.. meh
  // variables come from the markup, passed in, no need to fetch anything.

  const bodyFatData = [];
  const calorieData = [];
  const maintenanceCalorieData = [];
  const runTimeData = [];
  const strideLengthData = [];
  const stridesPerMinuteData = [];
  const weightAddedData = [];
  const mentalEnergyData = [];
  const physicalEnergyData = [];
  const restingHeartrateData = [];
  const sleepTimeData = [];
  const sleepWakeups = [];
  const weightData = [];
  const distanceData = [];
  const waterContentData = [];

  function formatIntoArray(date, data, arr) {
    let dateObj = new Date(date);
    if (!data || !(dateObj instanceof Date)) {
      return;
    } else {
      arr.push({ x: dateObj, y: Number(data) });
    }
  }

  for (var date in jsonGraphData) {
    let {
      body_fat,
      field_calories,
      field_maintenance_calories,
      field_run_time,
      field_stride_length,
      field_strides_per_minute,
      field_weight_added,
      mental_energy,
      physical_energy,
      resting_heartrate,
      sleep_time,
      sleep_wakeups,
      weight,
      field_distance,
      water_content,
    } = jsonGraphData[date];

    console.log(jsonGraphData);

    formatIntoArray(date, body_fat, bodyFatData);
    formatIntoArray(date, field_calories, calorieData);
    formatIntoArray(date, field_maintenance_calories, maintenanceCalorieData);
    formatIntoArray(date, field_run_time, runTimeData);
    formatIntoArray(date, field_stride_length, strideLengthData);
    formatIntoArray(date, field_strides_per_minute, stridesPerMinuteData);
    formatIntoArray(date, field_weight_added, weightAddedData);
    formatIntoArray(date, mental_energy, mentalEnergyData);
    formatIntoArray(date, physical_energy, physicalEnergyData);
    formatIntoArray(date, resting_heartrate, restingHeartrateData);
    formatIntoArray(date, sleep_time, sleepTimeData);
    formatIntoArray(date, sleep_wakeups, sleepWakeups);
    formatIntoArray(date, weight, weightData);
    formatIntoArray(date, field_distance, distanceData);
    formatIntoArray(date, water_content, waterContentData);

    // ok gues I gotta make ... 14 graphs haha
    // plus the page should take progress pics ..
    // and have up to 4 healthMetrics!
  }

  return (
    <>
      <div className="display-flex">
        <BodyFatGraph data={bodyFatData} />
        <RunSpeedGraph distanceData={distanceData} timeData={runTimeData} />
        <CalorieGraph
          calorieData={calorieData}
          maintenanceCalorieData={maintenanceCalorieData}
        />
        <WeightGraph weightData={weightData} />
        {/* <BodyFatGraph data={bodyFatData} />
        <BodyFatGraph data={bodyFatData} /> */}
      </div>
    </>
  );
}

export default ResultsGraphs;
