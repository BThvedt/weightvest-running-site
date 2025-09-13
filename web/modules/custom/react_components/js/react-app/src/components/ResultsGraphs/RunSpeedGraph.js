import React, { useMemo } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryScatter,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory";

function toSpeedSeries(distanceData, timeData) {
  const timeMap = new Map(timeData.map((d) => [d.x.getTime(), d.y]));
  return distanceData
    .map((d) => {
      const ms = d.x.getTime();
      const minutes = timeMap.get(ms);
      if (minutes == null || minutes <= 0) return null; // skip missing/zero time
      const mph = d.y / (minutes / 60);
      return { x: d.x, y: mph, distance: d.y, minutes };
    })
    .filter(Boolean)
    .sort((a, b) => a.x - b.x);
}

const RunSpeedGraph = ({ distanceData, timeData, TitleComponent, title }) => {
  const speedSeries = useMemo(
    () => toSpeedSeries(distanceData, timeData),
    [distanceData, timeData]
  );

  // Y-domain with 5% padding
  const values = speedSeries.map((d) => d.y);
  const minY = Math.min(...values);
  const maxY = Math.max(...values);
  const padding = (maxY - minY) * 0.05 || 0.3; // fallback pad if flat
  const domainMin = Math.max(0, minY - padding); // speeds shouldn't go negative
  const domainMax = maxY + padding * 3;

  // Evenly spaced y ticks incl. top/bottom
  const tickCount = 6;
  const step = (domainMax - domainMin) / (tickCount - 1);
  const ticks = Array.from(
    { length: tickCount },
    (_, i) => domainMin + i * step
  );

  return (
    <>
      <TitleComponent>{title}</TitleComponent>
      <VictoryChart
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) =>
              `${datum.x.toLocaleDateString()}\n${datum.y.toFixed(2)} mph\n` +
              `${datum.distance.toFixed(2)} mi`
            }
            labelComponent={
              <VictoryTooltip
                style={{ fontSize: 12 }}
                flyoutStyle={{
                  fill: "#fff",
                  stroke: "#85e892",
                  strokeWidth: 1,
                }}
              />
            }
            voronoiBlacklist={["speed-line"]} // avoid duplicate tooltips from line+points
          />
        }
        theme={VictoryTheme.material}
        scale={{ x: "time" }}
        domain={{ y: [domainMin, domainMax] }}
        padding={{ top: 10, bottom: 10, left: 50, right: 30 }}
      >
        <VictoryAxis
          dependentAxis
          tickValues={ticks}
          tickFormat={(y) => y.toFixed(1)}
          label="(mph)"
          style={{
            ticks: { size: 4 },
            axisLabel: { padding: 35, fontSize: 11 },
          }}
        />
        <VictoryAxis
          tickFormat={(t, i) =>
            i % 2 === 0 ? `${t.getMonth() + 1}/${t.getDate()}` : ""
          }
          style={{
            grid: { stroke: "none" },
            ticks: { size: 4 },
          }}
        />

        <VictoryLine
          name="speed-line"
          data={speedSeries}
          style={{ data: { stroke: "#2978a0", strokeWidth: 2 } }}
        />

        <VictoryScatter
          data={speedSeries}
          size={3} // smaller dots
          style={{ data: { fill: "#ff6b00" } }}
        />
      </VictoryChart>
    </>
  );
};

export default RunSpeedGraph;
