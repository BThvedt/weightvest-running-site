import React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryScatter,
  VictoryVoronoiContainer,
  VictoryTooltip,
  Point,
} from "victory";

function mergeHeartrates(restingData, runningData) {
  const m = new Map(runningData.map((d) => [d.x.getTime(), d.y]));
  return restingData
    .map((d) => {
      const rng = m.get(d.x.getTime());
      if (rng == null) return null;
      const delta = d.y - rng;
      const pct = rng ? delta / rng : 0;
      return { x: d.x, y: d.y, running: rng, delta, pct };
    })
    .filter(Boolean)
    .sort((a, b) => a.x - b.x);
}

const Heartrate = ({ restingData, runningData, TitleComponent, title }) => {
  const series = mergeHeartrates(restingData, runningData);

  // y-domain from both series with 5% pad
  const allY = [...series.map((d) => d.y), ...series.map((d) => d.running)];
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);
  const pad = Math.max((maxY - minY) * 0.05, 10);
  const domain = { y: [Math.max(0, minY - pad), maxY + pad * 2] };

  // Generate evenly spaced ticks (e.g., 6 ticks)
  const tickCount = 5;
  const step = (maxY + pad * 2 - Math.max(0, minY - pad)) / (tickCount - 1);
  const ticks = Array.from(
    { length: tickCount },
    (_, i) => Math.max(0, minY - pad) + i * step
  );

  return (
    <>
      <TitleComponent>{title}</TitleComponent>

      <VictoryChart
        containerComponent={
          <VictoryVoronoiContainer
            voronoiBlacklist={["mental-line", "physical-line"]}
          />
        }
        theme={VictoryTheme.material}
        scale={{ x: "time" }}
        domain={domain}
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
          name="mental-line"
          data={restingData}
          style={{ data: { stroke: "#2978a0", strokeWidth: 2 } }}
        />
        <VictoryLine
          name="physical-line"
          data={runningData}
          style={{ data: { stroke: "#ff6b00", strokeWidth: 2 } }}
        />

        {/* Resting points */}
        <VictoryScatter
          data={restingData}
          size={3}
          style={{ data: { fill: "#2978a0", stroke: "none" } }}
          labels={({ datum }) => [
            datum.x.toLocaleDateString(),
            `Resting HR: ${datum.y}`,
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

        {/* Running points */}
        <VictoryScatter
          data={runningData}
          size={3}
          style={{ data: { fill: "#ff6b00", stroke: "none" } }}
          labels={({ datum }) => [
            datum.x.toLocaleDateString(),
            `Running HR: ${datum.y}`,
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

export default Heartrate;
