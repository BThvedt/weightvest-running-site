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

function mergeFatandWater(data, waterData) {
  const m = new Map(waterData.map((d) => [d.x.getTime(), d.y]));
  return data
    .map((d) => {
      const wtr = m.get(d.x.getTime());
      if (wtr == null) return null;
      const delta = d.y - wtr;
      const pct = wtr ? delta / wtr : 0;
      return { x: d.x, y: d.y, water: wtr, delta, pct };
    })
    .filter(Boolean)
    .sort((a, b) => a.x - b.x);
}

const BodyFatAndWaterGraph = ({ data, waterData, TitleComponent, title }) => {
  const series = mergeFatandWater(data, waterData);

  // Calculate min/max with a buffer
  const allY = [...series.map((d) => d.y), ...series.map((d) => d.water)];
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);
  const pad = Math.max((maxY - minY) * 0.05, 10);
  const domainMin = minY - pad;
  const domainMax = maxY + pad;

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
          <VictoryVoronoiContainer voronoiBlacklist={["line"]} />
        }
        theme={VictoryTheme.material}
        scale={{ x: "time" }}
        domain={{ y: [domainMin, domainMax] }}
        padding={{ top: 10, bottom: 10, left: 50, right: 30 }}
      >
        <VictoryAxis
          dependentAxis
          tickValues={ticks}
          tickFormat={(y) => `${y.toFixed(1)} %`}
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
          name="water-line"
          data={waterData}
          style={{ data: { stroke: "#2978a0", strokeWidth: 2 } }}
        />
        <VictoryScatter
          data={waterData}
          size={3}
          style={{ data: { fill: "#2978a0", stroke: "none" } }}
          labels={({ datum }) => [
            datum.x.toLocaleDateString(),
            `Water: ${datum.y.toFixed(1)}%`,
          ]}
          labelComponent={
            <VictoryTooltip
              lineHeight={1.2}
              style={[
                { fontSize: 12, fill: "#252832" },
                { fontSize: 12, fill: "#2978a0" },
              ]}
              flyoutStyle={{
                fill: "#fff",
                stroke: "#3978d0",
                strokeWidth: 1,
              }}
            />
          }
        />

        <VictoryLine
          name="line"
          data={data}
          style={{
            data: { stroke: "#2978a0", strokeWidth: 2 },
          }}
        />

        <VictoryScatter
          data={data}
          size={3}
          style={{ data: { fill: "#ff6b00", stroke: "none" } }}
          labels={({ datum }) => [
            datum.x.toLocaleDateString(),
            `Fat: ${datum.y.toFixed(1)}%`,
          ]}
          labelComponent={
            <VictoryTooltip
              lineHeight={1.2}
              style={[
                { fontSize: 12, fill: "#252832" },
                { fontSize: 12, fill: "#ff6b00" },
              ]}
              flyoutStyle={{
                fill: "#fff",
                stroke: "#ff6b00",
                strokeWidth: 1,
              }}
            />
          }
        />
      </VictoryChart>
    </>
  );
};

export default BodyFatAndWaterGraph;
