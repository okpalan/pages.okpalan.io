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
    radius: 200,
    margin: 10,
    padding: 5,
};

const dataUrls = [
    `http://${window.location.host}/chart/data/competence-frontend.json`,
    `http://${window.location.host}/chart/data/competence-backend.json`,
];

async function draw() {
    const promisedData = await Promise.all(dataUrls.map(async url => {
        try {
            const response = await fetch(url, { headers: _headers });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error(`Failed to fetch data from ${url}`);
            }
        } catch (error) {
            console.error(error);
        }
    }));

    const currentId = options.elId.FRONTEND;
    const svg = d3.select(settings.elId)
        .append('svg')
        .attr('width', settings.width)
        .attr('height', settings.height);

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

    const arcs = g.selectAll('.arc')
        .data(pie(promisedData[currentId]))
        .enter()
        .append('path')
        .attr('class', 'arc');

    const labels = g.select('circle')
        .data(pie(promisedData[currentId]))
        .enter()
        .append('circle')
        .attr()
        
    const arc = d3.arc()
        .innerRadius(50)
        .outerRadius(options.radius);

    arcs.attr('d', arc)
        .attr('fill', (d, i) => d3.schemeCategory10[i]);

    function updateChart(id) {
        arcs.data(pie(promisedData[id]))
            .transition()
            .duration(500)
            .attrTween('d', d => {
                const interpolate = d3.interpolate(d.previous, d);
                return t => arc(interpolate(t));
            });
    };

    document.querySelector('#toggle-chart').addEventListener('click', async () => {
        updateChart(currentId === options.elId.FRONTEND ? options.elId.BACKEND : options.elId.FRONTEND);
    });
}
draw()
