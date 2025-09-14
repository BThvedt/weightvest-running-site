import React from "react";
import BodyFatAndWaterGraph from "./ResultsGraphs/BodyFatAndWaterGraph.js";
import RunSpeedGraph from "./ResultsGraphs/RunSpeedGraph.js";
import CalorieGraph from "./ResultsGraphs/CalorieGraph.js";
import WeightGraph from "./ResultsGraphs/WeightGraph.js";
import MentalPhysical from "./ResultsGraphs/MentalPhysical.js";
import WeightAdded from "./ResultsGraphs/WeightAdded.js";
import Heartrate from "./ResultsGraphs/HeartRate.js";
import SleepTime from "./ResultsGraphs/SleepTime.js";
import WakeUps from "./ResultsGraphs/WakeUps.js";
import SidebarGraphWrapper from "./ResultsGraphs/SidebarGraphWrapper.js";
import BigTitle from "./ResultsGraphs/BigTitle.js";
import SidebarTitle from "./ResultsGraphs/SidebarTitle.js";
import StrideLength from "./ResultsGraphs/StrideLength.js";
import StridesPerMinute from "./ResultsGraphs/StridesPerMinute.js";

function ResultsSidebar({ jsonGraphData }) {
  const bodyFatData = [];
  const calorieData = [];
  const maintenanceCalorieData = [];
  const runTimeData = [];
  const strideLengthData = [];
  const stridesPerMinuteData = [];
  const weightAddedData = [];
  const mentalEnergyData = [];
  const physicalEnergyData = [];
  const heartRateData = [];
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
      field_heart_rate,
      resting_heartrate,
      sleep_time,
      sleep_wakeups,
      weight,
      field_distance,
      water_content,
    } = jsonGraphData[date];

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
    formatIntoArray(date, field_heart_rate, heartRateData);
    formatIntoArray(date, sleep_time, sleepTimeData);
    formatIntoArray(date, sleep_wakeups, sleepWakeups);
    formatIntoArray(date, weight, weightData);
    formatIntoArray(date, field_distance, distanceData);
    formatIntoArray(date, water_content, waterContentData);
  }

  const randomNumberArr = [];
  const numOfGraphs = 2;

  while (randomNumberArr.length < numOfGraphs) {
    let randNum = Math.floor(Math.random() * 11) + 1; // 1-9
    if (randomNumberArr.indexOf(randNum) == -1) {
      randomNumberArr.push(randNum);
    }
  }

  return (
    <>
      <div className="display-flex flex-col flex-wrap max-tab:flex-row">
        <SidebarGraphWrapper showNum={1} randArr={randomNumberArr}>
          <BodyFatAndWaterGraph
            TitleComponent={SidebarTitle}
            title={"Body Composition"}
            data={bodyFatData}
            waterData={waterContentData}
          />
        </SidebarGraphWrapper>

        <SidebarGraphWrapper showNum={2} randArr={randomNumberArr}>
          <RunSpeedGraph
            TitleComponent={SidebarTitle}
            title={"Run Speed"}
            distanceData={distanceData}
            timeData={runTimeData}
          />
        </SidebarGraphWrapper>

        <SidebarGraphWrapper showNum={3} randArr={randomNumberArr}>
          <CalorieGraph
            TitleComponent={SidebarTitle}
            title={"Calorie Data"}
            calorieData={calorieData}
            maintenanceCalorieData={maintenanceCalorieData}
          />
        </SidebarGraphWrapper>

        <SidebarGraphWrapper showNum={4} randArr={randomNumberArr}>
          <WeightGraph
            TitleComponent={SidebarTitle}
            title={"Body Weight"}
            weightData={weightData}
          />
        </SidebarGraphWrapper>

        <SidebarGraphWrapper showNum={5} randArr={randomNumberArr}>
          <MentalPhysical
            TitleComponent={SidebarTitle}
            title={"Physical/Mental Energy"}
            mentalData={mentalEnergyData}
            physicalData={physicalEnergyData}
          />
        </SidebarGraphWrapper>

        <SidebarGraphWrapper showNum={6} randArr={randomNumberArr}>
          <WeightAdded
            TitleComponent={SidebarTitle}
            title={"Weight Added"}
            weightAddedData={weightAddedData}
          />
        </SidebarGraphWrapper>

        <SidebarGraphWrapper showNum={7} randArr={randomNumberArr}>
          <Heartrate
            TitleComponent={SidebarTitle}
            title={"Runinng/Resting Heartrate"}
            restingData={restingHeartrateData}
            runningData={heartRateData}
          />
        </SidebarGraphWrapper>

        <SidebarGraphWrapper showNum={8} randArr={randomNumberArr}>
          <SleepTime
            TitleComponent={SidebarTitle}
            title={"Sleep Time"}
            sleepData={sleepTimeData}
          />
        </SidebarGraphWrapper>

        <SidebarGraphWrapper showNum={9} randArr={randomNumberArr}>
          <WakeUps
            TitleComponent={SidebarTitle}
            title={"Wake ups"}
            wakeUpData={sleepWakeups}
          />
        </SidebarGraphWrapper>

        <SidebarGraphWrapper showNum={10} randArr={randomNumberArr}>
          <StrideLength
            TitleComponent={SidebarTitle}
            title={"Wake ups"}
            strideLengthData={strideLengthData}
          />
        </SidebarGraphWrapper>

        <SidebarGraphWrapper showNum={11} randArr={randomNumberArr}>
          <StridesPerMinute
            TitleComponent={SidebarTitle}
            title={"Wake ups"}
            stridesPerMinuteData={stridesPerMinuteData}
          />
        </SidebarGraphWrapper>
      </div>
    </>
  );
}

export default ResultsSidebar;
