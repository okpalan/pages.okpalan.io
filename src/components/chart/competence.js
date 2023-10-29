'use strict';

// JSON Headers for Request
const _headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
});

const settings = {
    width: 800,
    height: 600,
    elId: '#competence-chart'
};

const options = {
    elId: {
        FRONTEND: 0,
        BACKEND: 1
    },
    radius: 250,
    margin: 10,
    padding: 5,
};

const dataUrl = `http://${window.location.host}/chart/data/competence.json`;
const currentId = options.elId.FRONTEND;

// Fetch the data from the given URL
let promisedData = [];

const svg = d3.select(settings.elId)
    .append('svg')
    .attr('width', settings.width)
    .attr('height', settings.height);

// Define the arc generator
const arc = d3.arc()
    .innerRadius(100)
    .outerRadius(options.radius)
    .padAngle(0.02);

// Recalculate the pie layout with 
// the updated data
const pie = d3.pie()
    .value(d => d.competence);

// Color scale for arc fill
const colorScale = d3.scaleOrdinal()
    .range(d3.schemeCategory10); // Change to a color scheme of your choice

// Title
svg.append('text')
    .text('Competence Chart')
    .attr('id', 'title')
    .attr('text-anchor', 'middle')
    .attr('font-size', '2em')
    .attr('x', settings.width / 2)
    .attr('y', settings.height - options.margin);

const g = svg.append('g')
    .attr('transform', `translate(${settings.width / 2},${settings.height / 2})`)
    .attr('id', 'arcs');

const labelGroup = svg.append('g')
    .attr('transform', `translate(${settings.width / 2},${settings.height / 2})`)
    .attr('id', 'labels');
async function updateChart(id) {
    // Update the labels with transitions
    const labels = labelGroup
        .selectAll('text')
        .data(pie(Object.values(promisedData)))
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
        .attr('dy', '0.35em') // Adjust the vertical position
        .attr('text-anchor', 'middle')
        .attr('fill', 'blue');


    // Update the arcs with transitions
    const arcs = g.selectAll('.arc')
        .data(pie(Object.values(promisedData)))

    arcs.selectAll('path')
        .enter()
        .attr('fill', (_, i) => colorScale(i));

    arcs.on('mouseover', function (d) {
        // Add your hover effect here
        return d3.select(this)
            .transition()
            .duration(185)
            .style('opacity', 0.7);
    })
        .on('mouseout', function (d) {
            // Reset the hover effect
            return d3.select(this)
                .transition()
                .duration(185)
                .style('opacity', 1.0);
        });

    arcs.on('mouseover', function (d) {
        const updateArc = d3.arc()
            .padAngle(0.7);
        return d3.select(this)
            .style('opacity', .7)
            .transition()
            .attrTween('d', updateArc)

    }).on('mouseout', function (d) {
        return d3.select(this)
            .style('opacity', 1)

    })

    // Exit selection
    arcs.exit()
        .remove();

    // Enter selection
    const newArcs = arcs
        .enter()
        .append('path')
        .attr('class', 'arc');

    // Merge existing and new arcs,
    // then apply transitions to each 
    // individually
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
        .data(pie(Object.values(promisedData)))


    label
        .exit()
        .remove();

    let newLabels = labels
        .text(d => d.data.name)
        .merge(label)
        .transition()
        .duration(750)
        .attrTween('transform', function (d) {
            console.log(label);
            const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
            this._current = interpolate(0);
            return function (t) {
                const [x, y] = arc.centroid(interpolate(t));
                return `translate(${x},${y})`;
            }
        })
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle')
        .attr('fill', (d, i) => colorScale(promisedData.length - 1 - i));

}



async function drawChart() {
    try {
        const response = await fetch(dataUrl, { headers: _headers });
        if (response.ok) {
            promisedData = await response.json();
            updateChart(currentId);
        } else {
            throw Error(`Failed to fetch data from ${dataUrl}`);
        }
    } catch (error) {
        console.error(error);
    }

   
}

// Call the function to
// fetch and draw data
drawChart();

