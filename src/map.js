import React, { Component } from 'react';
import * as topojson from "topojson-client";
import MapChoropleth from 'react-d3-map-choropleth';
import ReactDOM from 'react-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import * as d3 from 'd3'
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Scale from 'd3-scale';

class CountyMap extends Component {
    // Setup default D3 objects
    // projection - defines our geo projection, how the map looks
    // geoPath - calculates d attribute of <path> so it looks like a map
    // quantize - threshold scale with 9 buckets
    constructor(props) {
        super(props);

      this.state = {
         mapData: this.props.mapData, 
         populationData: this.props.population
      }
   };
 

    
    componentDidUpdate(){
        const projection = d3.geoAlbersUsa()
                            .scale(1280);
        const geoPath = d3.geoPath()
                         .projection(this.projection);
        const quantize = d3.scaleQuantize()
                          .range(d3.range(9));
 
        


    }
 
    // update D3 objects when props update
    componentWillReceiveProps(newProps) {
        this.updateD3(newProps);
    }
 
    // Re-center the geo projection
    // Update domain of quantize scale
    updateD3(props) {
        this.projection.translate([props.width / 2, props.height / 2]);
 
        if (props.populationData) {
            this.quantize.domain([10000, 75000]);
        }
    }
 
    // If no data, do nothing (we might mount before data loads into props)
    render() {
        if (!this.props.mapData) {
            return null;
        }else{
            // Translate topojson data into geojson data for drawing
            // Prepare a mesh for states and a list of features for counties
            const us = this.props.mapData,
                  statesMesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b),
                  counties = topojson.feature(us, us.objects.hawaii_shapefile).features;
 
            // Loop through counties and draw <County> components
            // Add a single <path> for state borders
            return (
                <g>
                    {counties.map((feature) => <County geoPath={this.geoPath}
                        feature={feature}
                        key={feature.id}
                        quantize={this.quantize}
                        data={_.find(this.props.populationData, {us: feature.NAME})} />)}
 
                     <path d={this.geoPath(statesMesh)} style={{fill: 'none',
                             stroke: '#fff',
                             strokeLinejoin: 'round'}} />
                </g>
            );
        }
    }
}

export default CountyMap;

// class Choropleth extends Component {
//    constructor(props){
//       super(props)
//       this.state = {
//          mapData: this.props.mapData, 
//          populationData: this.props.population
//       }
//    };


//   componentDidUpdate(){

//     const mapData = this.state.mapData;
//   //   const populaiton = this.state.populationData; 

//   //   const svg = d3.select(this.refs.anchor),  
//   //   {width, height} = this.props;



//   //   const color = d3.scaleThreshold()
//   //   .domain(d3.range(2, 10))
//   //   .range(d3ScaleChromatic.schemeGreys[9])

//   // // Dictionary of key value pairs {id: value} --> {censusBlockID: value}
//   // const popData = populaiton.map(function(d){populaiton.set(d.island, +d.pigPopulation)});

//   // // used to refer to the features of the county data

//   // const islands = topojson.feature(mapData, {
//   //   type:"GeometryCollection",
//   //   geometries: mapData.objects.hawaii_shapefile.geometries
//   // });

//   // // identify projection and path
//   // const projection = d3.geoAlbersUsa()
//   //   .fitExtent([[20,20], [width, height]], islands) 

//   // // define path
//   // const geoPath = d3.geoPath()
//   //     .projection(projection)

//   //   // draw map
//   //   svg.selectAll("path")
//   //     .data(islands.features) //pass in data
//   //     .enter()
//   //     .append("path")
//   //     .attr("d", geoPath) // pass in geoPath object created
//   //     .attr("id", function(d) {return d.properties.GEOID })
//   //     // .attr("fill", function(d) { return color(d.pigPopulation = popData.get(d.properties.NAME)); })
//   //     // .attr("stroke", "white")
//   //     // .attr("d", geoPath)

//       // const islands = topojson.feature(mapData, {
//       //   type:"GeometryCollection",
//       //   geometries: mapData.objects.hawaii_shapefile.geometries
//       // });

//        const islands = topojson.feature(mapData, mapData.objects.hawaii_shapefile)

//         const svg = d3.select(this.refs.anchor),
//               { width, height } = this.props;

//         const projection = d3.geoAlbers()
//                              .scale(1280)
//                              .translate([width / 2, height / 2], islands);




//         const path = d3.geoPath()
//                   .projection(projection)

//     //         // draw map
//     // svg.selectAll("path")
//     //   .data(islands.features) //pass in data
//     //   .enter()
//     //   .append("path")
//     //   .attr("d", geoPath) // pass in geoPath object created
//     //   .attr("id", function(d) { return d.properties.GEOID })
      
//     console.log(topojson.feature(mapData, mapData.objects.hawaii_shapefile));
    

//         svg.append("defs").append("path")
//            .attr("id", "land")
//            .datum(islands)
//            .attr("d", path);

//         // svg.append("clipPath")
//         //    .attr("id", "clip-land")
//         //    .append("use")
//         //    .attr("xlink:href", "#land");

//         // svg.append("g")
//         //    .attr("class", "districts")
//         //    .attr("clip-path", "url(#clip-land)")
//         //    .selectAll("path")
//         //    .data(islands.features)
//         //    .enter().append("path")
//         //    .attr("d", path)
//         //    .append("title")
//         //    .text(function(d) { return d.id; });


// }

//   render(){

//     // Check to confirm data has loaded
//     if(!this.state.mapData || !this.state.population ){
//       return null
//     }

//     return
//       <g ref="anchor" />
      
//   }
// }

// export default Choropleth;