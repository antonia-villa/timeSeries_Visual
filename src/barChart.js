import React, { Component } from 'react';


import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LabelList} from 'recharts';
import {reFormat} from './dataCleansing.js'

class Chart extends Component {
  render() {
    // Reformat input data
    const data = reFormat(this.props.data);
    const CustomizedLabel = (props) => {
    const test = this.props;
    console.log('props inside custom label', test)
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
             fontWeight="bold" 
             
             dy={100}/>
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


export default Chart;