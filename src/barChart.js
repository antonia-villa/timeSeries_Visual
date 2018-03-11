import React, { Component } from 'react';


import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LabelList} from 'recharts';
import {reFormat} from './dataCleansing.js'

class Chart extends Component {
  render() {
    // Reformat input data
    const data = reFormat(this.props.data);
    const CustomizedLabel = (props) => {
    const {x, y, value, width, height} = props;
    console.log(width)
      return (
        <text 
           x={x + width / 2}
           y={y} 
           dy={-4} 
           fontSize='14' 
           fontFamily='Arimo'
           fill="black"
           position="insideTop"
           >
           {value}%
        </text>
        );
      }


  return(
      <ResponsiveContainer height={450}>
        <BarChart 
              data={data}
              margin={{top: 0, right: 0, left: 0, bottom: 0}}>
         <XAxis 
             dataKey="island"
             fontFamily="Arimo"
             tick={{ fill: 'black' }}
             fontWeight="bold" 
             />
         <YAxis hide/>
         <Bar 
             dataKey="percent" 
             barSize ={200}
             fontFamily="Arimo"
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