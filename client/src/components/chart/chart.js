'use strict';
import * as d3 from 'd3';
import competence from './competence.json';

const settings = {
    width: 600,
    height: 400,
    elId: '#competence-chart',
};

const options = {
    radius: 150,
    margin: 10,
    padding: 5,
};

const svg = d3.select(settings.elId)
    .append('svg')
    .attr('width', settings.width)
    .attr('height', settings.height);
svg.attr('role', 'region')
    .attr('aria-label', 'Competence Chart')
    .attr('tabindex', '0');
// Define the arc generator
const arc = d3.arc()
    .innerRadius(50)
    .outerRadius(options.radius)
    .padAngle(0.02);

// Recalculate the pie layout with the updated data
const pie = d3.pie()
    .value(d => d.competence);

// Color scale for arc fill
const colorScale = d3.scaleOrdinal()
    .range(d3.schemeCategory10);

// Title
svg.append('text')
    .text('Competence Chart')
    .attr('id', 'title')
    .attr('text-anchor', 'middle')
    .attr('font-size', '1em')
    .attr('x', settings.width / 2)
    .attr('y', settings.height - options.margin + options.padding);

const g = svg.append('g')
    .attr('transform', `translate(${settings.width / 2},${settings.height / 2})`)
    .attr('id', 'arcs');

const labelGroup = svg.append('g')
    .attr('transform', `translate(${settings.width / 2},${settings.height / 2})`)
    .attr('id', 'labels');

// Update the arcs with transitions
const arcs = g.selectAll('.arc')
    .data(pie(Object.values(competence)));

arcs.enter()
    .append('path')
    .attr('class', 'arc')
    .attr('fill', (_, i) => colorScale(i))
    .merge(arcs)
    .transition()
    .duration(750)
    .attrTween('d', function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
            return arc(interpolate(t));
        };
    });
arcs.enter()
    .append('path')
    .attr('class', 'arc')
    .attr('fill', (_, i) => colorScale(i))
    .attr('role', 'img')  // role for each slice
    .attr('aria-label', d => `Competence name: ${d.data.name}, Value: ${d.data.competence}`) // dynami
// Focus and Blur interactions
svg.selectAll('path')
    .on('focus', function (event, d) {
        const newArc = d3.arc()
            .innerRadius(100).
            outerRadius(options.radius + 100);
        return d3.select(this)
            .attr('d', newArc)
            .transition()
            .style('fill', 'orange')
            .attr("role", "img") // Role attribute for the SVG arc
            .attr("aria-label", `Competence name: ${d.data.name}, Value: ${d.data.competence}`); // Label attribute to describe the SVG arc's function
    })
    .on('blur', function (event, d) {
        log
        d3.select(this)
            .attr('d', arc)
            .transition()
            .style('fill', (_, i) => colorScale(i));
    });

// Mouseover and Mouseout interactions
svg.selectAll('path')
    .on('mouseover', function (event, d) {
        d3.select(this)
            .transition()
            .duration(185)
            .style('opacity', 0.7);
    })
    .on('mouseout', function (event, d) {
        d3.select(this)
            .transition()
            .duration(185)
            .style('opacity', 1.0);
    });

// Focus button
// const button = d3.select(settings.elId)
//     .append('button')
//     .text('Focu')
//     .attr('id', 'custom-button')
//     .attr('class', 'custom-button');

// Title
svg.append('text')
    .text('Competence Chart')
    .attr('id', 'title')
    .attr('text-anchor', 'middle')
    .attr('font-size', '1em')
    .attr('x', settings.width / 2)
    .attr('y', settings.height - options.margin + options.padding);

// Function that handles what will occur when the mouse is moving over a slice
function handleMouseOver(event, d) {
    const selectedArc = d3.select(event.currentTarget);
    selectedArc.attr('fill', 'orange');
    selectedArc.attr('aria-label', `Competence name: ${d.data.name}, Value: ${d.data.competence}, Mouse Overed`);
}

// Function that handles what will occur when the mouse moves out of a slice
function handleMouseOut(event, d) {
    const selectedArc = d3.select(event.currentTarget);
    selectedArc.attr('fill', (_, i) => colorScale(i));
    selectedArc.attr('aria-label', `Competence name: ${d.data.name}, Value: ${d.data.competence}`);
}

svg.selectAll('path')
    .on('focus', handleMouseOver)
    .on('blur', handleMouseOut)
    .on('mousemove', handleMouseMove);



// Function that handles what will occur when the mouse is moving inside a slice
function handleMouseMove(event, d) {
    const selectedArc = d3.select(event.currentTarget);
    selectedArc.attr('aria-label', `Competence name: ${d.data.name}, Value: ${d.data.competence}, Mouse In motion`);
}

const newArcs = arcs
    .enter()
    .append('path')
    .attr('class', 'arc')
    .attr('aria-hidden', 'true');


// Update the labels with transitions
const labels = labelGroup
    .selectAll('text')
    .data(pie(Object.values(competence)))
    .enter()
    .append('text')
    .text(d => d.data.name)
    .transition()
    .duration(750)
    .attr('transform', function (d) {
        const [x, y] = arc.centroid(d);
        const labelX = x;
        const labelY = y;
        return `translate(${labelX},${labelY})`;
    })
    .attr('dy', '0.45em') // Adjust the vertical position
    .attr('text-anchor', 'middle')
    .attr('fill', 'blue');



// Exit selection
arcs
    .exit()
    .remove();



// Merge existing and new arcs,
// then apply transitions to each individually
newArcs
    .merge(arcs)
    .transition()
    .duration(750)
    .attr('fill', (_, i) => colorScale(i)) // Use the color scale
    .attrTween('d', function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d)
        this._current = interpolate(0)
        return function (t) {
            return arc(interpolate(t));
        };
    });


const label = labelGroup
    .selectAll('text')
    .data(pie(Object.values(competence)))


label
    .exit()
    .remove();
labels
    .text(d => d.data.name)
    .merge(labels)
    .attrTween('transform', function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        this._current = interpolate(0);
        return function (t) {
            const [x, y] = arc.centroid(interpolate(t));
            return `translate(${x},${y})`;
        };
    })
    .attr('dy', '.35em')
    .attr('text-anchor', 'middle')
    .attr('fill', (d, i) => colorScale(competence.length - (i - 1)));



