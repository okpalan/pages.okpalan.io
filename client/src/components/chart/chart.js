'use strict';
import * as d3 from 'd3';
import competence from './competence.json';

const settings = {
    width: 600,
    height: 400,
};

const options = {
    radius: 150,
    margin: 10,
    padding: 5,
    elId: '#competence-chart',

};

const svg = d3.select(options.elId)
    .append('svg')
    .attr('width', settings.width)
    .attr('height', settings.height)
    .attr('role', 'region')
    .attr('aria-label', 'Competence Chart')
    .attr('tabindex', '0');

const title = svg.append("text")
    .attr("class", "title")
    .attr("x", settings.width / 2).attr("y", settings.height - options.margin)
    .attr("text-anchor", "middle")
    .attr("font-size", "2em").text("Competence Chart");

// Added aria-labelledby pointing to the id of the title.
svg.attr('aria-labelledby', 'chartTitle');

const arc = d3.arc().innerRadius(50).outerRadius(options.radius)
    .padAngle(0.04);
const pie = d3.pie().value(d => d.competence);

// Adjust the color scale to ensure accessibility
const colorScale = d3.scaleOrdinal().range(d3.schemePaired);

const g = svg.append('g').attr('transform', `translate(${settings.width / 2},${settings.height / 2})`).attr('role', 'list');
const labelGroup = svg.append('g')
    .attr('transform', `translate(${settings.width / 2},${settings.height / 2})`)
    .attr('id', 'labels')

const labels = labelGroup
    .selectAll('text')
    .data(pie(Object.values(competence)))
    .enter()
    .append('text')
    .text(d => d.data.name)
    .attr('transform', function (d) {
        var pos = arc.centroid(d);
        return `translate(${pos})`;
    })
    .attr('dy', '.35em')
    .attr('text-anchor', 'middle')
    .attr('font-size', '1.4em')
    .attr('stroke', (d, i) => d3.schemeDark2[i]);

const arcs = g.selectAll('.arc')
    .data(pie(Object.values(competence)))
    .enter()
    .append('path')
    .attr('class', 'arc')
    .attr('d', arc)
    .attr('fill', (_, i) => colorScale(i))
    .attr('role', 'listitem')
    .attr('tabindex', '0');
// Initialize each arc as "empty"
arcs.attr('d', function (d) {
    var i = d3.interpolate(d.startAngle, d.endAngle);
    return function (t) {
        d.endAngle = i(0);
        return arc(d);
    }
})
    .transition() // start a transition
    .duration(1500) // for two seconds
    .attrTween('d', function (d) {
        // interpolate the end angle from 0 to its final value
        var i = d3.interpolate(d.startAngle, d.endAngle);
        return function (t) {
            d.endAngle = i(t);
            return arc(d);
        };
    });

// Create a div element for the tooltip
const tooltip = d3.select(options.elId) // Append tooltip to the body
    .append('div')
    .style('opacity', 0)
    .attr('class', 'tooltip')
    .style('background', '#f9f9f9')
    .style('border', 'solid')
    .style('border-width', '1px')
    .style('border-radius', '5px')
    .style('padding', '15px')
    .style('position', 'absolute') // Position the tooltip absolutely

function handleTooltip(event, d) {
    const total = d3.sum(pie(Object.values(competence)).map((d) => d.data.competence));
    const percentage = ((d.data.competence / total) * 100).toFixed(2);

    tooltip
        .style('opacity', 1)
        .html(`<strong>
            Programming Language:${d.data.name} <br>
            My Competence: ${percentage}%<br>
            Data Value: ${d.data.competence}<br>
            Description: <br>
             ${d.data.description}<br>
            
        </strong>`)
        .style('left', (event.pageX + 10) + 'px') // Adjust the position from the mouse
        .style('top', (event.pageY - 28) + 'px')
        .style('width', '300px')
}
// Creating a larger arc when hovered
const arcHovered = d3.arc()
    .innerRadius(50)
    .outerRadius(options.radius * 1.1) // Assuming a 10% increment when hovered
    .padAngle(0.04);

labels.on('mouseover', function (event, d) {
    // Using a larger mean radius for the centroid when an arc is hovered
    const posHover = arcHovered.centroid(d);
    // Move the label
    d3.select(this).transition().attr('transform', `translate(${posHover})`);
    handleTooltip(event, d)
})
    .on('mouseout', function (event, d) {
        // Moving the label back to its original position when mouse is not over the arc
        const pos = arc.centroid(d);
        d3.select(this).transition().attr('transform', `translate(${pos})`);
        hideTooltip();
    });

// Then attach these handlers
arcs.on('mouseover', function (event, d) {
    handleTooltip(event, d);
    d3.select(this).transition().duration(300).attr('transform', 'scale(1.1)');
})
    .on('mouseout', function () {
        hideTooltip();
        d3.select(this).transition().duration(300).attr('transform', 'scale(1)');
    });

function hideTooltip() {
    tooltip.transition().duration(500).style('opacity', 0);
}
