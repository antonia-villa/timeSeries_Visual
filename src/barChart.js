import React, { Component } from 'react';


import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LabelList} from 'recharts';
import {reFormat} from './dataCleansing.js'

class Chart extends Component {
  render() {
    // Reformat input data
    const data = reFormat(this.props.data);
    // Customize Data Labels
    const CustomizedLabel = (props) => {
    const {x, y, value, width, height} = props;
      return (
        <text 
           x={(x-6) + width / 2}
           y={y} 
           dy={13} 
           fontSize='14' 
           fontFamily='Merriweather Sans'
           fill="black"
           position="insideTop"
           >
           {value}%
        </text>
      );
    }

    // Customize Tooltip Content
    const renderTooltip = (props) => {
      const { active, payload } = props;
        if (active && payload && payload.length) {
          const data = payload[0].payload;
          return (
            <div className="customizedToolTip">
              <p className="ToolTipTitle">{data.island}</p>
              <p className="ToolTipText">Total: {data.percent}%</p>
              <p className="ToolTipText">Population: {data.pigPopulation.toLocaleString()}</p>
            </div>
          );
        }
    }

console.log(data)
  return(
    
      <ResponsiveContainer height={450}>
        <BarChart 
              data={data}
              margin={{top: 0, right: 0, left: 0, bottom: 0}}>
         <XAxis 
             dataKey="island"
             fontFamily="Merriweather Sans"
             tick={{ fill: 'black', dy: 5 }}
             fontWeight="normal" 
             
             />
         <YAxis hide/>
         <Tooltip  content={renderTooltip}
         cursor={false}/>
         <Bar 
             dataKey="percent" 
             barSize ={200}
             fontFamily="Merriweather Sans"
             fill="#96c568" >
            <LabelList content={CustomizedLabel}/>}
          >
          </Bar>
        </BarChart>
        </ResponsiveContainer>
      );
    }
  }


export default Chart;