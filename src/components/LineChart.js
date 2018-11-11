import React from 'react';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { LinearGradient } from '@vx/gradient';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AreaClosed } from '@vx/shape';
import { extent, max } from 'd3-array';

import { appleStock } from '@vx/mock-data';

// mock data
const data = appleStock;

// chart dimensions
const width = 750;
const height = 400;

// bounds and margins
const margin = {
  top: 60,
  bottom: 60,
  left: 80,
  right: 80,
};
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

// define x and y (accessors)
const x = d => new Date(d.date); // d.date is unix timestamps
const y = d => d.close;

// x scale
const xScale = scaleTime({
  // domain = input scale
  // extent takes an array of our x or y functions (accessors) and returns the min/max
  // like extent(data, d => d.x)
  domain: extent(data, x),
  // range = output scale
  range: [0, xMax],
});

const yScale = scaleLinear({
  range: [yMax, 0],
  domain: [0, max(data, y)],
});

const LineChart = props => (
  <svg width={width} height={height}>
    <Group top={margin.top} left={margin.left}>
      <AreaClosed
        data={data}
        xScale={xScale}
        yScale={yScale}
        x={x}
        y={y}
        fill={'url("#gradient")'}
        stroke={''}
      />

      <AxisLeft
        scale={yScale}
        top={0}
        left={0}
        label={'Close Price ($)'}
        stroke={'#1b1a1e'}
        tickTextFill={'#1b1a1e'}
      />

      <AxisBottom
        scale={xScale}
        top={yMax}
        label={'Years'}
        stroke={'#1b1a1e'}
        tickTextFill={'#1b1a1e'}
      />

      <LinearGradient from="#fbc2eb" to="#a6c1ee" id="gradient" />
    </Group>
  </svg>
);

export default LineChart;
