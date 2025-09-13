import React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryScatter,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryBar,
} from "victory";

const WakeUps = ({ wakeUpData, TitleComponent, title }) => {
  return (
    <>
      <TitleComponent>{title}</TitleComponent>

      <VictoryChart
        domain={{ y: [0, 3] }}
        domainPadding={{ x: [11, 12], y: [0, 8] }}
        theme={VictoryTheme.material}
        scale={{ x: "time" }}
        padding={{ top: 10, bottom: 10, left: 50, right: 30 }}
      >
        {/* X Axis */}
        <VictoryAxis
          tickFormat={(t, i) =>
            i % 2 === 0 ? `${t.getMonth() + 1}/${t.getDate()}` : ""
          }
          style={{
            grid: { stroke: "none" },
            ticks: { size: 4 },
          }}
        />
        {/* Y Axis */}
        <VictoryAxis dependentAxis tickValues={[0, 1, 2, 3]} />
        {/* Bars */}
        <VictoryBar
          data={wakeUpData}
          x="x"
          y="y"
          barRatio={0.8}
          style={{
            data: { fill: "#2978a0" },
          }}
          // show a tooltip with the numeric value
          labels={({ datum }) =>
            `${datum.x.toLocaleDateString()}\nWake Ups: ${datum.y}`
          }
          labelComponent={
            <VictoryTooltip
              // keep the tooltip above the bar
              pointerLength={6}
              flyoutPadding={{ top: 4, bottom: 4, left: 6, right: 6 }}
              constrainToVisibleArea
              style={{ fontSize: 12 }}
              flyoutStyle={{
                fill: "#fff",
                stroke: "#85e892",
                strokeWidth: 1,
              }}
            />
          }
        />
      </VictoryChart>
    </>
  );
};

export default WakeUps;
