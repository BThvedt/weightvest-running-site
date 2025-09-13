import React, { useMemo } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryScatter,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryArea,
} from "victory";

function mergeCalories(caloriesData, maintenanceData) {
  const m = new Map(maintenanceData.map((d) => [d.x.getTime(), d.y]));
  return caloriesData
    .map((d) => {
      const maint = m.get(d.x.getTime());
      if (maint == null) return null;
      const delta = d.y - maint;
      const pct = maint ? delta / maint : 0;
      return { x: d.x, y: d.y, maintenance: maint, delta, pct };
    })
    .filter(Boolean)
    .sort((a, b) => a.x - b.x);
}

function splitAreasWithCrossings(series) {
  const above = [];
  const below = [];

  for (let i = 0; i < series.length - 1; i++) {
    const a = series[i];
    const b = series[i + 1];

    // push anchor points (area collapses to baseline on the "other" side)
    above.push({
      ...a,
      x: a.x,
      y: Math.max(a.y, a.maintenance),
      y0: a.maintenance,
    });
    below.push({
      ...a,
      x: a.x,
      y: Math.min(a.y, a.maintenance),
      y0: a.maintenance,
    });

    // detect crossing
    const ya = a.y - a.maintenance;
    const yb = b.y - b.maintenance;
    if (ya === 0 || yb === 0 || ya > 0 === yb > 0) continue;

    // linear crossing point
    const t = ya / (ya - yb);
    const xMillis = a.x.getTime() + t * (b.x.getTime() - a.x.getTime());
    const xCross = new Date(xMillis);
    const maintAtCross = a.maintenance + t * (b.maintenance - a.maintenance);

    const cross = {
      x: xCross,
      y: maintAtCross,
      maintenance: maintAtCross,
      delta: 0,
      y0: maintAtCross,
    };
    above.push(cross);
    below.push(cross);
  }

  const last = series[series.length - 1];
  above.push({
    ...last,
    x: last.x,
    y: Math.max(last.y, last.maintenance),
    y0: last.maintenance,
  });
  below.push({
    ...last,
    x: last.x,
    y: Math.min(last.y, last.maintenance),
    y0: last.maintenance,
  });

  return { above, below };
}

const CalorieGraph = ({
  calorieData,
  maintenanceCalorieData,
  TitleComponent,
  title,
}) => {
  const series = mergeCalories(calorieData, maintenanceCalorieData);

  const { above, below } = splitAreasWithCrossings(series);

  // y-domain from both series with 5% pad
  const allY = [...series.map((d) => d.y), ...series.map((d) => d.maintenance)];
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);
  const pad = Math.max((maxY - minY) * 0.05, 50);
  const domain = { y: [Math.max(0, minY - pad), maxY + pad * 3] };

  // Generate evenly spaced ticks (e.g., 6 ticks)
  const tickCount = 5;
  const step = (maxY + pad * 3 - Math.max(0, minY - pad)) / (tickCount - 1);
  const ticks = Array.from(
    { length: tickCount },
    (_, i) => Math.max(0, minY - pad) + i * step
  );

  return (
    <>
      <div className="display-flex justify-between">
        <TitleComponent>{title}</TitleComponent>
        <div className="pr-md">
          <div className="display-flex items-center text-blue font-large text-md">
            <div className="border-blue border-solid w-lg border-md h-0 mr-xs line-height-sm"></div>
            <p>Cals</p>
          </div>
          <div className="display-flex items-center text-default font-large text-md">
            <div className="border-default border-dashed w-lg border-md h-0 mr-xs line-height-sm"></div>
            <p>Maint. Cals</p>
          </div>
        </div>
      </div>

      <VictoryChart
        containerComponent={
          <VictoryVoronoiContainer
            voronoiBlacklist={["cal-line", "maint-line"]} // only show scatter tooltips
          />
        }
        theme={VictoryTheme.material}
        scale={{ x: "time" }}
        domain={domain}
        padding={{ top: 10, bottom: 10, left: 50, right: 30 }}
      >
        {/* Horizontal grid only */}
        <VictoryAxis
          dependentAxis
          tickValues={ticks}
          style={{
            grid: { stroke: "#ddd", strokeDasharray: "4,4" },
            tickLabels: { fontSize: 10, padding: 5 },
          }}
          tickFormat={(y) => y.toFixed(0)}
        />

        {/* X-axis labels and hide vertical grid */}
        <VictoryAxis
          tickFormat={(t, i) =>
            i % 2 === 0 ? `${t.getMonth() + 1}/${t.getDate()}` : ""
          }
          style={{
            grid: { stroke: "none" },
            tickLabels: { fontSize: 10, padding: 5 },
          }}
        />

        {/* Fills */}
        <VictoryArea
          data={below}
          interpolation="linear" // ← no curves
          style={{
            data: { fill: "rgba(133,232,146,0.3)", stroke: "transparent" },
          }}
        />
        <VictoryArea
          data={above}
          interpolation="linear"
          style={{
            data: { fill: "rgba(255,0,0,0.3)", stroke: "transparent" },
          }}
        />

        {/* Lines */}
        <VictoryLine
          name="maint-line"
          data={series.map((d) => ({ x: d.x, y: d.maintenance }))}
          style={{
            data: { stroke: "#888", strokeWidth: 2, strokeDasharray: "6,6" },
          }}
        />
        <VictoryLine
          name="cal-line"
          data={series.map((d) => ({ x: d.x, y: d.y }))}
          style={{ data: { stroke: "#2978a0", strokeWidth: 2 } }}
        />

        {/* Points for tooltips (on calories series) */}
        <VictoryScatter
          data={series}
          size={3}
          style={{
            data: { fill: "#ff6b00" },
          }}
          labels={({ datum }) => [
            datum.x.toLocaleDateString(),
            `Maint: ${Math.round(datum.maintenance)}`,
            `Cals: ${Math.round(datum.y)}`,
            `${datum.delta > 0 ? "+" : ""}${Math.round(datum.delta)}`,
          ]}
          labelComponent={
            <VictoryTooltip
              lineHeight={1.2}
              style={[
                { fontSize: 12, fill: "#252832" }, // date
                { fontSize: 12, fill: "#252832" }, // cals
                { fontSize: 12, fill: "#252832" }, // maint
                {
                  fontSize: 12,
                  fill: ({ datum }) => (datum.delta > 0 ? "#f00" : "#85e892"),
                }, // Δ
              ]}
              flyoutStyle={{ fill: "#fff", stroke: "#85e892", strokeWidth: 1 }}
            />
          }
        />
      </VictoryChart>
    </>
  );
};

export default CalorieGraph;
