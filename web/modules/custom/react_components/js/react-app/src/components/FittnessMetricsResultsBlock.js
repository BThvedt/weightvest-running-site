import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryContainer,
  VictoryLabel,
} from "victory";

function FitnessMetricsResultsBlock({ jsonGraphData }) {
  console.log("THE JSON DATA IS");
  console.log(jsonGraphData);

  if (jsonGraphData.length == 0) {
    return null;
  }

  return (
    <>
      <div className="display-flex flex-wrap">
        {jsonGraphData.map((dataObj) => {
          let {
            created,
            full_circuit,
            goblet_squat,
            id,
            lunge,
            pullups,
            pushups,
            title,
            url,
            exercise_max_weight,
          } = dataObj;

          const data = [
            {
              exercise: "40 Full\nCircuit lbs",
              weight: Number(parseFloat(full_circuit).toFixed(1)) || 0,
            },
            {
              exercise: "40 Goblet\nSquat lbs",
              weight: Number(parseFloat(goblet_squat).toFixed(1)) || 0,
            },
            {
              exercise: "40 Lunge\nlbs",
              weight: Number(parseFloat(lunge).toFixed(1)) || 0,
            },
            {
              exercise: "40 Pushup\nlbs",
              weight: Number(parseFloat(pushups).toFixed(1)) || 0,
            },
          ].filter(
            (item) => typeof item.weight === "number" && !isNaN(item.weight)
          );

          return (
            <div
              className="scr:w-1/3 w-1/2 max-mob:w-full hover:text-orange"
              key={id}
            >
              <a className="no-underline" href={url}>
                <h3 className="font-large text-lg mb-0">{created}</h3>
                <VictoryChart
                  theme={VictoryTheme.material}
                  domainPadding={30}
                  width={550}
                  height={300}
                  padding={{ left: 90, top: 30, right: 30, bottom: 60 }}
                  containerComponent={<VictoryContainer responsive={true} />}
                  domain={{
                    y: [
                      0,
                      Number(exercise_max_weight) ||
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
                  {/* This is the categorical Y axis (left) */}
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
                    text={`And Number of Pullups I can do: ${pullups}`}
                    x={20}
                    y={280}
                    textAnchor="left"
                    style={{
                      fontSize: 14,
                      fontFamily: "Titillium Web",
                      fill: "#666",
                    }}
                  />
                </VictoryChart>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FitnessMetricsResultsBlock;
