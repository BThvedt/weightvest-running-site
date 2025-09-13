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

const MentalPhysical = ({
  mentalData,
  physicalData,
  TitleComponent,
  title,
}) => {
  // lookups
  const physByTime = new Map(physicalData.map((d) => [d.x.getTime(), d.y]));
  const equalKeys = new Set(
    mentalData
      .filter((m) => physByTime.get(m.x.getTime()) === m.y)
      .map((m) => m.x.getTime())
  );
  const combinedPoints = mentalData
    .filter((m) => equalKeys.has(m.x.getTime()))
    .map((m) => ({ x: m.x, y: m.y }));

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
        domain={{ y: [0, 10] }}
        padding={{ top: 10, bottom: 10, left: 50, right: 30 }}
      >
        <VictoryAxis
          dependentAxis
          tickValues={[0, 2, 4, 6, 8, 10]}
          tickFormat={(y) => `${y.toFixed(1)}`}
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
          data={mentalData}
          style={{ data: { stroke: "#2978a0", strokeWidth: 2 } }}
        />
        <VictoryLine
          name="physical-line"
          data={physicalData}
          style={{ data: { stroke: "#ff6b00", strokeWidth: 2 } }}
        />

        {/* Mental points */}
        <VictoryScatter
          data={mentalData}
          size={3}
          style={{ data: { fill: "#2978a0", stroke: "none" } }}
          labels={({ datum }) =>
            equalKeys.has(datum.x.getTime())
              ? ""
              : [datum.x.toLocaleDateString(), `Mental: ${datum.y}`]
          }
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

        {/* Physical points */}
        <VictoryScatter
          data={physicalData}
          size={3}
          style={{ data: { fill: "#ff6b00", stroke: "none" } }}
          labels={({ datum }) =>
            equalKeys.has(datum.x.getTime())
              ? ""
              : [datum.x.toLocaleDateString(), `Physical: ${datum.y}`]
          }
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

        {/* Overlay scatter: combined tooltip only; renders NO glyph */}
        <VictoryScatter
          data={combinedPoints}
          // dataComponent={() => null} // <- bulletproof: renders nothing
          labels={({ datum }) => [
            datum.x.toLocaleDateString(),
            `Mental: ${datum.y}`,
            `Physical: ${datum.y}`,
          ]}
          labelComponent={
            <VictoryTooltip
              lineHeight={1.2}
              style={[
                { fontSize: 12, fill: "#252832" },
                { fontSize: 12, fill: "#2978a0" },
                { fontSize: 12, fill: "#ff6b00" },
              ]}
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

export default MentalPhysical;
