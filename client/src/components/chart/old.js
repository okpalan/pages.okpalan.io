function handleMouseOver(event, d) {
    // Function that handles what will occur on mouse over events
        d3.select(event.currentTarget)
            .transition()
            .duration(200)
            .style('fill', 'orange');
    
        tooltip.transition()
            .duration(200)
            .style('opacity', .9);
            
        tooltip.html(`Date: ${d.date}, Amount: ${d.amount}`)
            .style('left', `${d3.event.pageX + 5}px`)
            .style('top', `${d3.event.pageY - 28}px`);
    }
    
    function handleMouseOut(event, d) {
    // Function that handles what will occur on mouse out events
        d3.select(event.currentTarget)
            .transition()
            .duration(200)
            .style('fill', 'blue');
    
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    }
    
    svg.selectAll('rect')
       .data(dataset)
       .enter()
       .append('rect')
       // remaining code...
       .on('mouseover', handleMouseOver)
       .on('mouseout', handleMouseOut);