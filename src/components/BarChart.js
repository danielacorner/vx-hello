import React from 'react';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { GradientOrangeRed } from '@vx/gradient';
import { Group } from '@vx/group';
import { scaleLinear, scaleBand } from '@vx/scale';
import { Bar } from '@vx/shape';

import { letterFrequency } from '@vx/mock-data';

// We'll use some mock data from `@vx/mock-data` for this.
const data = letterFrequency;

// Define the graph dimensions and margins
const width = 500;
const height = 500;
const margin = { top: 20, bottom: 60, left: 60, right: 20 };

// Then we'll create some bounds
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

// We'll make some helpers to get at the data we want
const x = d => d.letter;
const y = d => +d.frequency * 100;

// And then scale the graph by our data
const xScale = scaleBand({
  rangeRound: [0, xMax],
  domain: data.map(x),
  padding: 0.4,
});

const yScale = scaleLinear({
  rangeRound: [yMax, 0],
  domain: [0, Math.max(...data.map(y))],
});

// Compose together the scale and accessor functions to get point functions
const compose = (scale, accessor) => data => scale(accessor(data));
const xPoint = compose(
  xScale,
  x,
);
const yPoint = compose(
  yScale,
  y,
);

// Finally we'll embed it all in an SVG
const BarChart = props => (
  <svg width={width} height={height}>
    <Group top={margin.top} left={margin.left}>
      {data.map((d, i) => {
        const barHeight = yMax - yPoint(d);
        return (
          <Group key={`bar-${i}`}>
            <Bar
              x={xPoint(d)}
              y={yMax - barHeight}
              height={barHeight}
              width={xScale.bandwidth()}
              fill="url(#gradient)"
            />
          </Group>
        );
      })}

      <AxisLeft
        scale={yScale}
        top={0}
        left={0}
        label={'Frequency'}
        stroke={'#1b1a1e'}
        tickTextFill={'#1b1a1e'}
      />

      <AxisBottom
        scale={xScale}
        top={yMax}
        label={'Letters'}
        stroke={'#1b1a1e'}
        tickTextFill={'#1b1a1e'}
      />
      <GradientOrangeRed id="gradient" />
    </Group>
  </svg>
);

export default BarChart;
