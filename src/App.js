import { scaleLinear, scaleBand } from "@visx/scale";
import { format } from "d3-format";
import { Group } from "@visx/group";
import { AxisLeft, AxisTop } from "@visx/axis";
import { Text } from "@visx/text";
import { GridRows } from "@visx/grid";
import { leftTickLabelProps } from "@visx/axis/lib/axis/AxisLeft";

import useChartDimensions from "./useChartDimensions";

const data = [
  {
    label:
      "Agregado familiar composto por um titular, um indivíduo menor, e outro maior (3 pessoas) a receber RSI durante 30 anos",
    value: 500700.0,
  },
  {
    label: "Dívida de Luís Filipe Vieira [Promovalor] ao Novo Banco",
    value: 760000000.0,
  },
];

const moneyFormatter = (value) =>
  value === 0 ? "€ 0" : `€ ${format(",.2f")(value).replace("G", "MM")}`;

const maxHeight = window.innerHeight * 28;

const yScale = scaleLinear({
  domain: [0, data[1].value],
  range: [0, maxHeight],
});

const tickValues = [];
for (let i = 0; i <= 750; i += 50) {
  tickValues.push(i * 1e6);
}

const isOnSmallDisplay = document.documentElement.clientWidth <= 768;

const MARGIN_Y = 100;
const MARGIN_X = isOnSmallDisplay ? 20 : 100;

function App() {
  const [chartWrapper, dimensions] = useChartDimensions({
    height: maxHeight + 2 * MARGIN_Y,
    marginTop: MARGIN_Y,
    marginBottom: MARGIN_Y,
    marginLeft: MARGIN_X,
    marginRight: MARGIN_X,
  });

  const xScale = scaleBand({
    domain: data.map((d) => d.label),
    range: [0, dimensions.boundedWidth],
    padding: 0.2,
  });
  console.log();

  return (
    <div className="py-10 w-full md:w-9/12 mx-auto">
      <div className="text-gray-600 text-center my-4">
        <h1 className="text-3xl font-semibold mb-2 ">O que custa mais? 💸</h1>
        <h2 className="text-base w-1/2 mx-auto ">
          (Recriação digital.{" "}
          <a
            className="text-blue-500 hover:text-blue-600 underline"
            href="https://twitter.com/ruitavares/status/1478877669387390976/photo/1"
          >
            Gráfico original
          </a>{" "}
          por LIVRE)
        </h2>
      </div>
      <div ref={chartWrapper} className="w-full md:w-3/4 mx-auto">
        <svg width={dimensions.width} height={dimensions.height}>
          <Group top={dimensions.marginTop} left={dimensions.marginLeft}>
            <AxisLeft
              scale={yScale}
              tickFormat={moneyFormatter}
              hideAxisLine
              hideTicks
              tickValues={tickValues}
              tickLabelProps={(value) => {
                const isZero = value === 0;
                return {
                  ...leftTickLabelProps,
                  textAnchor: isZero ? "end" : "start",
                  fill: isZero ? "#94a3b8" : "#475569",
                  className: isOnSmallDisplay ? "text-xs" : "text-sm",
                  dy: isZero ? 5 : -10,
                };
              }}
            />
            <AxisTop
              scale={xScale}
              hideTicks
              hideAxisLine
              tickComponent={({ formattedValue, tickValue, ...tickProps }) => (
                <Text
                  {...tickProps}
                  width={xScale.step()}
                  className={isOnSmallDisplay ? "text-xs" : "text-sm"}
                  fill="#475569"
                >
                  {formattedValue}
                </Text>
              )}
            />
            {data.map((d, i) => (
              <Group key={`bar-${i}`}>
                <rect
                  x={xScale(d.label)}
                  y={0}
                  height={yScale(d.value)}
                  width={xScale.bandwidth()}
                  fill="#ff9800"
                />
                <Text
                  x={xScale(d.label) + xScale.bandwidth() / 2}
                  y={yScale(d.value)}
                  textAnchor="middle"
                  dy={20}
                  className="text-sm"
                  fill="#475569"
                >
                  {moneyFormatter(d.value)}
                </Text>
              </Group>
            ))}
            <GridRows
              scale={yScale}
              width={dimensions.boundedWidth}
              stroke="#475569"
              tickValues={tickValues}
            />
          </Group>
        </svg>
      </div>
    </div>
  );
}

export default App;
