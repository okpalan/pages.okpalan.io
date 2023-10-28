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

const dataUrls = [
    `http://${window.location.host}/chart/data/competence-frontend.json`,
    `http://${window.location.host}/chart/data/competence-backend.json`,
];
let currentId = options.elId.FRONTEND;
// Fetch the data from the given URL
let promisedData = [];

const svg = d3.select(settings.elId)
    .append('svg')
    .attr('width', settings.width)
    .attr('height', settings.height);

// Define the arc generator
const arc = d3.arc()
    .innerRadius(130)
    .outerRadius(options.radius)
    .padAngle(0.02);

// Recalculate the pie layout with 
// the updated data
const pie = d3.pie()
    .value(d => d.competence);

// Title
svg.append('text')
    .text('Competence Chart')
    .attr('id', 'title')
    .attr('text-anchor', 'middle')
    .attr('font-size', '1.5em')
    .attr('x', settings.width / 2)
    .attr('y', settings.height - options.margin);

const g = svg.append('g')
    .attr('transform', `translate(${settings.width / 2},${settings.height / 2})`)
    .attr('id', 'arcs');

const labelGroup = svg.append('g')
    .attr('transform', `translate(${settings.width / 2},${settings.height / 2})`)
    .attr('id', 'labels')


async function updateChart(id) {
    // Update the labels with transitions
    const labels = labelGroup.selectAll('text')
        .data(pie(promisedData[id]))
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
        .attr('fill', 'black'); // Set label styling

    // Update the arcs with transitions
    const arcs = g.selectAll('.arc')
        .data(pie(promisedData[id]));

    // Exit selection
    arcs.exit().remove();

    // Enter selection
    const newArcs = arcs
        .enter()
        .append('path')
        .attr('class', 'arc');

    // Merge existing and new arcs, then apply transitions to each individually
    newArcs
        .merge(arcs)
        .transition()
        .duration(750)
        .attr('fill', (_, i) => d3.interpolateRainbow(i / promisedData[id].length))
        .attrTween('d', function (d) {
            const interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        });

    const newText = labelGroup
        .enter()
        .merge(labels)
        .transition()
        .duration(750)
        .attrTween('transfrom', function (d) {
            console.log(this._current);
            // const [x,y] = arc.centroid(d);
            return `translate(${arc.centroid()})`
        });


}

async function drawChart() {
    promisedData = await Promise.all(dataUrls.map(async url => {
        try {
            const response = await fetch(url, { headers: _headers });
            if (response.ok) {
                return await response.json();
            } else {
                throw Error(`Failed to fetch data from ${url}`);
            }
        } catch (error) {
            console.error(error);
        }
    }));

    updateChart(currentId);

    // Toggle the chart when the button is clicked
    document.querySelector('#toggle-chart').addEventListener('click', async () => {
        currentId = currentId === options.elId.FRONTEND ? options.elId.BACKEND : options.elId.FRONTEND;
        updateChart(currentId);
    });
}

// Call the function to fetch and draw data
drawChart();
updateChart(currentId);
