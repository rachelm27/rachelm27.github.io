async function page3() {
    document.getElementById("chart-title").innerHTML = "Section 3: Greenhouse Gas Emissions ";
    var data = d3.csv("ghg-per-kg-poore.csv", function(d) {
    d.Year = +d.Year;
    d.emissions_per_kilogram = +d.emissions_per_kilogram;
    
    return d;
    }).then(function(data) {
        data.sort((a, b) => d3.descending(a.emissions_per_kilogram, b.emissions_per_kilogram));
        console.log(data);
        
        var x = d3.scaleLinear().domain([0,100]).range([0,750]);
        var y = d3.scaleBand().domain(data.map(function(d) { return d.Entity; })).range([0,400]).padding(.1);;
        
        var categories = ["Fruits, Grains, Meats/Animal Products, Sugars, Vegetables, Dairy, Nuts, Legumes, Other"]
        // https://observablehq.com/@d3/color-schemes
        const colors = ["#4269d0","#efb118","#ff725c","#6cc5b0","#3ca951","#ff8ab7","#a463f2","#97bbf5"]
        const hoverColors = ["#294798ff","#b58303ff","#c3503fff","#549e8cff","#2b873dff","#c35e84ff","#773bc1ff","#6086c3ff"]

        function assignColor(entity) {
            const curData = data.filter(d => d.Entity === entity);
            // console.log(curData);
            for (let i = 0; i < 9; i++) {
                console.log(i);
                if (curData.Category === categories[i]) {
                    console.log([colors[i], hoverColors[i]]);
                    return [colors[i], hoverColors[i]];
                };
            }
        }
        
        var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        commaFormat = d3.format(",");
        twoSf = d3.format(".2f");


        // ANNOTATIONS


        // GRAPH 
        // display bars
        var bars = d3.select("svg")
            .append("g")
            .attr("transform","translate(100,50)")
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", x(0))
            .attr("y", function(d) { return y(d.Entity); })
            .attr("width", function(d) { return x(d.emissions_per_kilogram); })
            .attr("height", y.bandwidth() )
            .attr("fill", function(d) { return assignColor(d.Entity)[0]; });
        
        
        bars.on('mouseover', function(d, i) {
            d3.select(this)
                .transition()
                .duration(100)
                .attr("fill", assignColor(d.Entity)[1]);

            tooltip.transition()
                .duration(100)
                .style("opacity", 1);
            tooltip.html("<strong>GHG Emissions: </strong>" + d.emissions_per_kilogram + "kg") // Display data
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px");
            
            
        });

        bars.on('mouseout', function(d, i) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("fill", assignColor(d.Entity)[0]);

            tooltip.transition()
                .duration(200)
                .style("opacity", 0);
        });
        
        // axes
        d3.select("svg").append("g").attr("transform","translate(100,50)").call(d3.axisLeft(y));
        d3.select("svg").append("g").attr("transform","translate(100,450)").call(d3.axisBottom(x).tickValues([0, 10, 20, 30, 40 , 50, 60, 70, 80, 90, 100]));
        
        // title
        d3.select("svg").append("text")
            .attr("class", "title")
            .attr("text-anchor", "end")
            .attr("x", 650)
            .attr("y", 40)
            .style("font-weight", 500)
            .style("font-size", 12)
            .text("Hover over bars for more details");

        // x axis label
        d3.select("svg").append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", 650)
            .attr("y", 500 - 6)
            .text("Greenhouse gas emissions in kilograms");

        // y axis label
        d3.select("svg").append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", 0)
            .attr("dy", ".75em")
            .attr("x", -200)
            .attr("transform", "rotate(-90)")
            .text("Foods");
        
    //     //legend
    //     var legend = d3.select("#legend")
    //     var keys = ["Agriculture", "Industrial", "Municipal"];

    //     legend.selectAll("dots")
    //     .data(keys)
    //     .enter()
    //     .append("circle")
    //         .attr("cx", 50)
    //         .attr("cy", function(d,i){ return 50 + i*25})
    //         .attr("r", 7)
    //         .style("fill", function(d, i){ return colors[i]})
    //         .style("cursor", "default");

    //     legend.selectAll("labels")
    //     .data(keys)
    //     .enter()
    //     .append("text")
    //         .attr("x", 70)
    //         .attr("y", function(d,i){ return 50 + i*25})
    //         .style("fill", function(d, i){ return colors[i]})
    //         .text(function(d){ return d})
    //         .attr("text-anchor", "left")
    //         .style("alignment-baseline", "middle")
    //         .style("font-size", "14px");
    });
}

