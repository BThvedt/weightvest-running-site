import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryContainer,
  VictoryLabel,
} from "victory";

function FitnessMetricsPageBlock({
  title,
  full_circuit_weight,
  goblet_squat_weight,
  lunge_weight,
  number_of_pullups,
  pushup_weight,
  excersize_max_weight,
}) {
  const data = [
    { exercise: "40 Full\nCircuit lbs", weight: full_circuit_weight || 0 },
    { exercise: "40 Goblet\nSquat lbs", weight: goblet_squat_weight || 0 },
    { exercise: "40 Lunge\nlbs", weight: lunge_weight || 0 },
    { exercise: "40 Pushup\nlbs", weight: pushup_weight || 0 },
  ].filter((item) => typeof item.weight === "number" && !isNaN(item.weight));

  return (
    <>
      <h2 class="font-header text-3xl">{title}</h2>
      <div style={{ width: "100%", aspectRatio: "16/9" }}>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={30}
          width={550}
          height={300}
          padding={{ left: 100, top: 40, right: 40, bottom: 80 }}
          containerComponent={<VictoryContainer responsive={true} />}
          domain={{
            y: [
              0,
              excersize_max_weight ||
                Math.max(...data.map((d) => d.weight)) + 5,
            ],
          }}
        >
          <VictoryAxis
            dependentAxis
            style={{
              tickLabels: {
                fontSize: 14,
                fontFamily: "Titillium Web",
                lineHeight: 1.4,
              },
            }}
          />
          <VictoryAxis
            tickFormat={(x) => `${x}`}
            style={{
              tickLabels: {
                fontSize: 14,
                fontFamily: "Titillium Web",
                lineHeight: 1.4,
              },
            }}
          />
          <VictoryBar
            horizontal
            data={data}
            x="exercise"
            y="weight"
            barRatio={0.7}
            style={{
              data: { fill: "#2978a0" },
            }}
          />
          <VictoryLabel
            text={`And Number of Pullups I can do: ${number_of_pullups}`}
            x={20}
            y={270}
            textAnchor="left"
            style={{
              fontSize: 14,
              fontFamily: "Titillium Web",
              fill: "#666",
            }}
          />
        </VictoryChart>
      </div>
    </>
  );
}

export default FitnessMetricsPageBlock;
