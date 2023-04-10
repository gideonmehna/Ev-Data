import React from 'react';
import { Group } from '@vx/group';
import { LinearGradient } from '@vx/gradient';
import { scaleBand, scaleLinear } from '@vx/scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Bar } from '@vx/shape';


// accessors return the label and value of that data item
const x = (d) => d.name;

function Data({ brands, data, width, height, argv }) {
  // bounds
  const xMax = width - 80;
  const yMax = height - 80;

  const l = (d) => { 
    const vlist = [];
    for (var i = 0; i < data.length; i++ ){
      if ( argv.length === 1){
        vlist.push(d[i][argv[0]]);
      }
      else if (argv.length === 2){
        vlist.push(d[i][argv[0]][argv[1]]);
      }
        
    }
    return vlist;
  };
    
  // scales
  const xScale = scaleBand({
    range: [0, xMax],
    domain: brands.map(x),
    padding: 0.4,
  });
  
  const yScale = scaleLinear({
    range: [0, yMax],
    domain: [Math.max(...l(data)), 0],
  });
 
  return (
    <svg width={width} height={height}>

      <LinearGradient from={`#e9e9e9`} to={`#fff`} id={`gradientFill`} />

      <rect width={width} height={height} fill={`url(#gradientFill)`} rx={5} />

      <Group top={25} left={55}>

        <AxisLeft left={10} scale={yScale} numTicks={5} label={argv[0]} />
      
          {data.map((d)=>{
            
            const label = d.brand;
            const barWidth = xScale.bandwidth();
            var barHeight = 0;
        
            if (argv.length === 1){
              barHeight = yMax - (1*yScale(d[argv[0]]));
            }
            else if (argv.length === 2){
              barHeight = yMax - (1*yScale(d[argv[0]][argv[1]]));
            }
                
            const barX = 1*xScale(label);
            const barY = 1*(yMax - barHeight);
            console.log(barX);
            return <Bar key={`bar-${label}`} x={barX } y={barY } width={barWidth} height={barHeight} />
            })};

    
        <AxisBottom scale={xScale} label="Brand" labelOffset={15} top={yMax} />
      </Group>

    </svg>
  );
}


export default Data;
