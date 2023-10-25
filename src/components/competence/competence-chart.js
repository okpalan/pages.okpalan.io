import * as d3 from 'd3';
import data from "./competence.json";


const dataEntries = Object.entries(data);
const filteredData = dataEntries.filter(([key, value]) => !["backend", "frontend"].includes(key));

const options = {
    width: 800,
    height: 600,
    padding: 40,
};

const chartSettings = {
    innerRadius: 0,
    outerRadius: Math.min(options.width, options.height) / 2
};

const svg = d3.select('#competence-chart').append('svg').attr('width', options.width).attr('height', options.height);

const label = d3.arc()
    .outerRadius(chartSettings.outerRadius)
    .innerRadius(chartSettings.outerRadius - 80);

const g = svg.append('g')
    .attr('transform', `translate(${options.width / 2},${options.height - options.padding})`)
    .attr('id', 'arcs');

    g.append('text')
    .text('Competence Chart')
    .attr('id', 'title');


const pie = d3.pie()
    .value(d => d.competence);

const arc = d3.arc()
    .innerRadius(chartSettings.innerRadius)
    .outerRadius(chartSettings.outerRadius);

const arcs = g.selectAll('.arc')
    .data(pie(filteredData))
    .enter()
    .append('g')
    .attr('class', 'arc');


arcs.append('path')
    .attr('fill', function (d, i) {
        return d3.interpolateRainbow(i / filteredData.length);
    })
    .attr('d', arc);

arcs.append('text')
    .attr('transform', function (d) {
        return `translate(${label.centroid(arc(d))})`;
    })
    .text((d) => d.data[0]);