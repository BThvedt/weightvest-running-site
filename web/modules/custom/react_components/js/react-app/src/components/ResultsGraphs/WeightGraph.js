import React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryScatter,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory";

const WeightGraph = ({ weightData, TitleComponent, title }) => {
  // Calculate min/max with a buffer
  const values = weightData.map((d) => d.y);
  const minY = Math.min(...values);
  const maxY = Math.max(...values);
  const padding = (maxY - minY) * 0.05; // 5% buffer
  const domainMin = minY - padding;
  const domainMax = maxY + padding * 3;

  // Generate evenly spaced ticks (e.g., 6 ticks)
  const tickCount = 5;
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
              `${datum.x.toLocaleDateString()}\n${datum.y.toFixed(2)} lbs`
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
            voronoiBlacklist={["line"]}
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
          tickFormat={(y) => `${y}`}
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
          name="line"
          data={weightData}
          style={{
            data: { stroke: "#2978a0", strokeWidth: 2 },
          }}
        />
        <VictoryScatter
          name="points"
          data={weightData}
          size={3}
          style={{ data: { fill: "#ff6b00" } }}
        />
      </VictoryChart>
    </>
  );
};

export default WeightGraph;
