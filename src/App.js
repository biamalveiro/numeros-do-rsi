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
        <a
          href="https://github.com/biamalveiro/rsi-vs-lfv"
          className="absolute top-0 right-0 m-2"
        >
          <svg
            width="24"
            height="24"
            fill="currentColor"
            className="text-gray-500 hover:text-gray-600 mr-3 text-opacity-50 transform"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
            ></path>
          </svg>
        </a>
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
