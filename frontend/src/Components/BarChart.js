import React from 'react';
import { Group } from '@vx/group';
import { LinearGradient } from '@vx/gradient';
import { scaleBand, scaleLinear } from '@vx/scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Bar } from '@vx/shape';


// accessors return the label and value of that data item
const x = (d) => d.label;
const y = (d) => d.value;

function BarChart({ data, width, height }) {
  // bounds
  const xMax = width - 80;
  const yMax = height - 80;

  // scales
  const xScale = scaleBand({
    range: [0, xMax],
    domain: data.map(x),
    padding: 0.4,
  });

  const yScale = scaleLinear({
    range: [0, yMax],
    domain: [Math.max(...data.map(y)), 0],
  });

  return (
    <svg width={width} height={height}>
      <LinearGradient from={`#e9e9e9`} to={`#fff`} id={`gradientFill`} />
      <rect width={width} height={height} fill={`url(#gradientFill)`} rx={5} />
      <Group top={25} left={55}>
        <AxisLeft left={10} scale={yScale} numTicks={4} label="Times" />
        {data.map((d, i) => {
          const label = x(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - yScale(y(d));
          const barX = xScale(label);
          const barY = yMax - barHeight;

          return <Bar key={`bar-${label}`} x={barX} y={barY} width={barWidth} height={barHeight} />;
        })}
        <AxisBottom scale={xScale} label="Emotion" labelOffset={15} top={yMax} />
      </Group>
    </svg>
  );
}

export default BarChart;
