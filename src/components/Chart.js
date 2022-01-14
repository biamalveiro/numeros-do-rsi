import React from "react";
import { Group } from "@visx/group";
import { AxisLeft, AxisTop } from "@visx/axis";
import { Text } from "@visx/text";
import { GridRows } from "@visx/grid";
import { leftTickLabelProps } from "@visx/axis/lib/axis/AxisLeft";
import { scaleLinear, scaleBand } from "@visx/scale";
import { max } from "d3-array";

import useChartDimensions from "./../hooks/useChartDimensions";

const isOnSmallDisplay = document.documentElement.clientWidth <= 768;

const MARGIN_Y = 90;
const MARGIN_X = isOnSmallDisplay ? 30 : 100;
const REF_COLOR = "#ef4444";

export default function Chart({
  data,
  color,
  chart,
  formatter,
  reference,
  scrollFactor,
}) {
  const maxHeight = window.innerHeight * scrollFactor;
  const [chartWrapper, dimensions] = useChartDimensions({
    height: maxHeight + 2 * MARGIN_Y,
    marginTop: chart === "LFV" ? 120 : MARGIN_Y,
    marginBottom: MARGIN_Y / 2,
    marginLeft: MARGIN_X,
    marginRight: MARGIN_X,
  });

  const yMax = max(data, (d) => d.value);

  const xScale = scaleBand({
    domain: data.map((d) => d.label),
    range: [0, dimensions.boundedWidth],
    padding: 0.2,
  });

  const yScale = scaleLinear({
    domain: [0, yMax],
    range: [0, maxHeight],
  });

  return (
    <div ref={chartWrapper} className="w-full md:w-3/4 mx-auto ">
      <svg width={dimensions.width} height={dimensions.height}>
        <Group top={dimensions.marginTop} left={dimensions.marginLeft}>
          <AxisLeft
            scale={yScale}
            tickFormat={formatter}
            hideAxisLine
            hideTicks
            numTicks={scrollFactor}
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
                fill={color}
              />
              <Text
                x={xScale(d.label) + xScale.bandwidth() / 2}
                y={yScale(d.value)}
                textAnchor="middle"
                dy={20}
                className="text-sm"
                fill="#475569"
              >
                {formatter(d.value)}
              </Text>
            </Group>
          ))}
          <GridRows
            scale={yScale}
            width={dimensions.boundedWidth}
            stroke="#475569"
            numTicks={scrollFactor}
          />
          {chart !== "LFV" && (
            <Group>
              <rect
                x={0}
                y={yScale(reference.value)}
                height={1}
                width={dimensions.boundedWidth}
                fill={REF_COLOR}
              />
              <Text
                x={0}
                y={yScale(reference.value)}
                dy={-10}
                verticalAnchor="end"
                fill={REF_COLOR}
                className={isOnSmallDisplay ? "text-xs" : "text-sm"}
              >
                {formatter(reference.value)}
              </Text>
              <Text
                x={0}
                y={yScale(reference.value)}
                dy={10}
                textAnchor="start"
                verticalAnchor="start"
                fill={REF_COLOR}
                className={isOnSmallDisplay ? "text-xs" : "text-sm"}
              >
                {reference.label}
              </Text>
            </Group>
          )}
        </Group>
      </svg>
    </div>
  );
}
