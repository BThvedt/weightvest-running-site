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
import GraphWrapper from "./ResultsGraphs/GraphWrapper.js";
import BigTitle from "./ResultsGraphs/BigTitle.js";
import StrideLength from "./ResultsGraphs/StrideLength.js";
import StridesPerMinute from "./ResultsGraphs/StridesPerMinute.js";

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
      body_fat, // done
      field_calories, // done
      field_maintenance_calories, // done
      field_run_time, // done
      field_stride_length,
      field_strides_per_minute,
      field_weight_added, // done
      mental_energy, // done
      physical_energy, // done
      field_heart_rate, // done
      resting_heartrate, // done
      sleep_time, // done
      sleep_wakeups,
      weight, // done
      field_distance, // done
      water_content, // done
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

    // ok gues I gotta make ... 14 graphs haha
    // plus the page should take progress pics ..
    // and have up to 4 healthMetrics!
  }

  return (
    <>
      <div className="display-flex flex-wrap">
        <GraphWrapper>
          <BodyFatAndWaterGraph
            TitleComponent={BigTitle}
            title={"Body Composition"}
            data={bodyFatData}
            waterData={waterContentData}
          />
        </GraphWrapper>

        <GraphWrapper>
          <RunSpeedGraph
            TitleComponent={BigTitle}
            title={"Run Speed"}
            distanceData={distanceData}
            timeData={runTimeData}
          />
        </GraphWrapper>

        <GraphWrapper>
          <CalorieGraph
            TitleComponent={BigTitle}
            title={"Calorie Data"}
            calorieData={calorieData}
            maintenanceCalorieData={maintenanceCalorieData}
          />
        </GraphWrapper>

        <GraphWrapper>
          <WeightGraph
            TitleComponent={BigTitle}
            title={"Body Weight"}
            weightData={weightData}
          />
        </GraphWrapper>

        <GraphWrapper>
          <MentalPhysical
            TitleComponent={BigTitle}
            title={"Physical/Mental Energy"}
            mentalData={mentalEnergyData}
            physicalData={physicalEnergyData}
          />
        </GraphWrapper>

        <GraphWrapper>
          <WeightAdded
            TitleComponent={BigTitle}
            title={"Weight Added"}
            weightAddedData={weightAddedData}
          />
        </GraphWrapper>

        <GraphWrapper>
          <Heartrate
            TitleComponent={BigTitle}
            title={"Runinng/Resting Heartrate"}
            restingData={restingHeartrateData}
            runningData={heartRateData}
          />
        </GraphWrapper>

        <GraphWrapper>
          <SleepTime
            TitleComponent={BigTitle}
            title={"Sleep Time"}
            sleepData={sleepTimeData}
          />
        </GraphWrapper>

        <GraphWrapper>
          <WakeUps
            TitleComponent={BigTitle}
            title={"Wake ups"}
            wakeUpData={sleepWakeups}
          />
        </GraphWrapper>

        <GraphWrapper>
          <StrideLength
            TitleComponent={BigTitle}
            title={"Stride Length"}
            strideLengthData={strideLengthData}
          />
        </GraphWrapper>

        <GraphWrapper>
          <StridesPerMinute
            TitleComponent={BigTitle}
            title={"Cadence"}
            stridesPerMinuteData={stridesPerMinuteData}
          />
        </GraphWrapper>
      </div>
    </>
  );
}

export default ResultsGraphs;
