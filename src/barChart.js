import React, { Component } from 'react';

import * as d3 from 'd3'
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Scale from 'd3-scale';
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip,LabelList, Legend} from 'recharts';


class Chart2 extends Component {
  render() {
    const data = this.props.data;
    console.log(data)

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
           dy='12000'/>
       <YAxis hide/>
       <Bar 
           dataKey="pigPopulation" 
           barSize ={200}
           fontFamily="Roboto"
           fill="#A1D4E3" >
           <LabelList dataKey="island" fill="rgba(68, 73, 82, 1)" position="insideTop" />
        </Bar>
      </BarChart>
      </ResponsiveContainer>
    );
  }
}


export default Chart2;