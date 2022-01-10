import { useRef, useState, useEffect } from "react";

/**
 * useChartDimensions hook
 * Source: https://wattenberger.com/blog/react-hooks
 * It creates a dimension object with the size and margins for the chart.
 * If no height/width is set, it uses the size of the parent <div>.
 * Important: Unlike the original hook, this one does not observe window resizing or handle responsiveness.
 */

const combineChartDimensions = (dimensions) => {
  const parsedDimensions = {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
    ...dimensions,
  };

  return {
    ...parsedDimensions,
    boundedHeight: Math.max(
      parsedDimensions.height -
        parsedDimensions.marginTop -
        parsedDimensions.marginBottom,
      0
    ),
    boundedWidth: Math.max(
      parsedDimensions.width -
        parsedDimensions.marginLeft -
        parsedDimensions.marginRight,
      0
    ),
  };
};

const useChartDimensions = (dimensionsSettings) => {
  const ref = useRef();
  const dimensions = combineChartDimensions(dimensionsSettings);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const wrapperBoundingRect = ref.current.getBoundingClientRect();

    setWidth(wrapperBoundingRect.width);
    setHeight(wrapperBoundingRect.height);
  }, []);

  const newSettings = combineChartDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });

  return [ref, newSettings];
};

export default useChartDimensions;
