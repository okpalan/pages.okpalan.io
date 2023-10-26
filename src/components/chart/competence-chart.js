import * as d3 from 'd3';
import data from "./competence.json";

const options = {
  width: 400,
  height: 400,
};

const chartSettings = {
  innerRadius: 20,
  outerRadius: Math.min(options.width, options.height) / 2,
};

const svg = d3.select('#competence-chart')
  .append('svg')
  .attr('width', +options.width)
  .attr('height', +options.height);

svg.append('text')
  .text('Competence Chart')
  .attr('id', 'title')
  .attr('text-anchor', 'middle')
  .attr('font-size', '1.2em')
  .attr('x', options.width / 2)
  .attr('y', options.height + 10);

const arc = d3.arc()
  .innerRadius(chartSettings.innerRadius)
  .outerRadius(chartSettings.outerRadius);

const label = d3.arc()
  .outerRadius(chartSettings.outerRadius)
  .innerRadius(chartSettings.innerRadius);

const g = svg.append('g')
  .attr('transform', `translate(${options.width / 2},${options.height / 2})`)
  .attr('id', 'arc');

const pie = d3.pie()
  .value(d => d.competence);

const arcs = g.selectAll('g')
  .data(pie(data))
  .enter()
  .append('g')
  .attr('class', 'arc');

// Add transitions to the path elements (arcs)
arcs.append('path')
  .attr('fill', function (d, i) {
    return d3.interpolateRainbow(i / data.length);
  })
  .attr('d', function (d) {
    return arc(d);
  })
  .on('mouseover', function () {
    d3.select(this)
      .transition()
      .ease(d3.easeBackOut)
      .attr('d', function (d) {
        return arc({
          ...d.data,
          innerRadius: chartSettings.innerRadius + 10,
          outerRadius: chartSettings.outerRadius + 10,
        });
      });
  })
  .on('mouseout', function () {
    d3.select(this)
      .transition()
      .duration(250)
      .ease(d3.easeBackIn)
      .attr('d', function (d) {
        return arc({
          ...d.data,
          innerRadius: chartSettings.innerRadius,
          outerRadius: chartSettings.outerRadius,
        });
      });
  })
  .transition()
  .duration(750)
  .ease(d3.easeLinear)
  .attrTween('d', function (d) {
    const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
    return function (t) {
      return arc(interpolate(t));
    };
  });

// Add transitions to the text elements (labels)
arcs.append('text')
  .attr('transform', function (d) {
    const [x, y] = label.centroid(d);
    return `translate(${x}, ${y})`;
  })
  .attr('text-anchor', 'middle')
  .attr('font-size', '1.5em')
  .text((d) => d.data.name)
  .transition() // Add a transition
  .duration(750) // Set the transition duration
  .ease(d3.easeQuad);
