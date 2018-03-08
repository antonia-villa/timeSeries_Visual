import React, { Component } from 'react';

import * as d3 from 'd3'
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Scale from 'd3-scale';
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip,LabelList, Legend} from 'recharts';
import {reFormat} from './dataCleansing.js'

class Chart2 extends Component {
  render() {
    // Reformat input data
    const data = reFormat(this.props.data);

    const CustomizedLabel = (props) => {
    const {x, y, fill, value} = props;

      return (
        <text 
           x={x} 
           y={y} 
           dy={-4} 
           fontSize='16' 
           fontFamily='sans-serif'
           fill={fill}
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
             dataKey="Text"
             fontFamily="Roboto"
             fontWeight="900" 
             tickSize
             dy='100'/>
         <YAxis hide/>
         <Bar 
             dataKey="percent" 
             barSize ={200}
             fontFamily="Roboto"
             fill="#A1D4E3" >
            <LabelList content={CustomizedLabel}/>}
          >
          </Bar>
        </BarChart>
        </ResponsiveContainer>
      );
    }
  }


export default Chart2;