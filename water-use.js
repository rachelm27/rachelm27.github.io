async function page2() {
    document.getElementById("chart-title").innerHTML = "Section 2: Worldwide Water Withdrawal by Sector";
    var data = d3.csv("water-use-by-sector.csv", function(d) {
    d.Year = +d.Year;
    d.agricultural_water_withdrawal = +d.agricultural_water_withdrawal;
    d.agricultural_water_withdrawal_as_percent_of_total_water_withdrawal = +d.agricultural_water_withdrawal_as_percent_of_total_water_withdrawal;
    d.agricultural_water_withdrawal_per_capita = +d.agricultural_water_withdrawal_per_capita;
    d.environmental_flow_requirements = +d.environmental_flow_requirements;
    d.industrial_water_withdrawal = +d.industrial_water_withdrawal;
    d.industrial_water_withdrawal_as_percent_of_total_water_withdrawal = +d.industrial_water_withdrawal_as_percent_of_total_water_withdrawal;
    d.industrial_water_withdrawal_per_capita = +d.industrial_water_withdrawal_per_capita;
    d.irrigation_water_requirement = +d.irrigation_water_requirement;
    d.irrigation_water_withdrawal = +d.irrigation_water_withdrawal;
    d.municipal_water_withdrawal = +d.municipal_water_withdrawal;
    d.municipal_water_withdrawal_as_percent_of_total_withdrawal = +d.municipal_water_withdrawal_as_percent_of_total_withdrawal;
    d.municipal_water_withdrawal_per_capita = +d.municipal_water_withdrawal_per_capita;
    d.total_water_withdrawal = +d.total_water_withdrawal;
    d.total_water_withdrawal_per_capita = +d.total_water_withdrawal_per_capita;
    d.water_withdrawal_for_aquaculture = +d.water_withdrawal_for_aquaculture;
    d.water_withdrawal_for_livestock_watering_cleaning = +d.water_withdrawal_for_livestock_watering_cleaning;
    return d;
    }).then(function(data) {
        console.log(data);
        
        const worldData = data.filter(d => d.Area === "World");

        var x = d3.scaleLinear().domain([2000,2022]).range([0,800]);
        var y = d3.scaleLinear().domain([0,3000]).range([400,0]);
        
        const withdrawalCols = ["agricultural_water_withdrawal", "industrial_water_withdrawal", "municipal_water_withdrawal"]
        // https://observablehq.com/@d3/color-schemes
        const colors = ["#4269d0","#ff725c","#6cc5b0"]


        function getPercentTotal(colName, year) {
            if (colName === "agricultural_water_withdrawal") return "agricultural_water_withdrawal_as_percent_of_total_water_withdrawal";
            else if (colName === "industrial_water_withdrawal") return "industrial_water_withdrawal_as_percent_of_total_water_withdrawal";
            else if (colName === "municipal_water_withdrawal") return "municipal_water_withdrawal_as_percent_of_total_withdrawal";
        }

        var idx = 0;
        
        var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        commaFormat = d3.format(",");
        twoSf = d3.format(".2f");


        // ANNOTATIONS
        const type = d3.annotationCalloutCircle

        const annotations = [{
            note: {
                label: "Agriculture experiences a 4.84% water use increase (+120.4 billion cubic meters)--the largest increase within a year.",
                title: "2005-2006",
                wrap: 180
            },
            data: { Year: 2005.5, Water: 2540 },
            dy: 70,
            dx: -1,
            subject: {
                radius: 30,
                radiusPadding: 3
            }
        }]

        const make1 = d3.annotation()
            .editMode(false)
            .notePadding(5)
            .type(type)
            .accessors({
                x: d => x(d.Year),
                y: d => y(d.Water)
            })
            .accessorsInverse({
                year: d => x.invert(d.x),
                water: d => y.invert(d.y)
            })
            .annotations(annotations)

        d3.select("svg")
        .append("g")
        .attr("transform","translate(50,50)")
        .attr("class", "annotation-group")
        .style("font-size", "12px")
        .call(make1)
        

        const annotations2 = [{
            note: {
                label: "Agriculture peaks in contribution to total water withdrawals for the year at 71.92%.",
                title: "2015",
                wrap: 225
            },
            //can use x, y directly instead of data
            data: { Year: 2015, Water: 2868.595211247 },
            dy: 50,
            dx: -1,
            subject: {
                radius: 7,
                radiusPadding: 3
            }
        }]

        const make2 = d3.annotation()
            .editMode(false)
            .notePadding(5)
            .type(type)
            .accessors({
                x: d => x(d.Year),
                y: d => y(d.Water)
            })
            .accessorsInverse({
                year: d => x.invert(d.x),
                water: d => y.invert(d.y)
            })
            .annotations(annotations2)

        d3.select("svg")
        .append("g")
        .attr("transform","translate(50,50)")
        .attr("class", "annotation-group")
        .style("font-size", "12px")
        .call(make2)

        const annotations3 = [{
            note: {
                label: "Agriculture peaks in water use at 2889.83 billion cubic meters (22.2% increase from 2000).",
                title: "2019",
                wrap: 215
            },
            //can use x, y directly instead of data
            data: { Year: 2019, Water: 2889.827122122 },
            dy: 150,
            dx: -1,
            subject: {
                radius: 7,
                radiusPadding: 3
            }
        }]

        const make3 = d3.annotation()
            .editMode(false)
            .notePadding(5)
            .type(type)
            .accessors({
                x: d => x(d.Year),
                y: d => y(d.Water)
            })
            .accessorsInverse({
                year: d => x.invert(d.x),
                water: d => y.invert(d.y)
            })
            .annotations(annotations3)

        d3.select("svg")
        .append("g")
        .attr("transform","translate(50,50)")
        .attr("class", "annotation-group")
        .style("font-size", "12px")
        .call(make3)


        // GRAPH
        withdrawalCols.forEach(function(colName) { 
            // display points
            var points = d3.select("svg")
                .append("g")
                .attr("transform","translate(50,50)")
                .selectAll("circle")
                .data(worldData)
                .enter()
                .append("circle")
                .attr("cx", function(d) { return x(d.Year); })
                .attr("cy", function(d) { return y(d[colName]); })
                .attr("r", 3)
                .attr("fill", function(d){ return colors[idx] });
            
            // invis mouseover points
            var points_hitbox = d3.select("svg")
                .append("g")
                .attr("transform","translate(50,50)")
                .selectAll("circle")
                .data(worldData)
                .enter()
                .append("circle")
                .attr("cx", function(d) { return x(d.Year); })
                .attr("cy", function(d) { return y(d[colName]); })
                .attr("r", 7)
                .attr("fill", "transparent");
            
            points_hitbox.on('mouseover', function(d, i) {
                const index = worldData.indexOf(d);

                d3.select(points.nodes()[index])
                    .transition()
                    .duration(100)
                    .attr("r", 5);

                tooltip.transition()
                    .duration(100)
                    .style("opacity", 1);
                if (colName === "agricultural_water_withdrawal") {
                    tooltip.html("<strong>Year: </strong>" + d.Year + "<br><strong>Water Withdrawal: </strong>" + commaFormat(twoSf(d[colName])) + " billion cubic meters<br><strong>% of Total Year Withdrawal: </strong>" + twoSf(d[getPercentTotal(colName, d.Year)]) + "<br><br><strong>Withdrawal due to Irrigation: </strong>" + commaFormat(twoSf(d["irrigation_water_withdrawal"])) + " billion cubic meters<br><strong>Withdrawal due to Aquaculture: </strong>" + commaFormat(twoSf(d["water_withdrawal_for_aquaculture"])) + " billion cubic meters<br><strong>Withdrawal due to Livestock: </strong>" + commaFormat(twoSf(d["water_withdrawal_for_livestock_watering_cleaning"])) + "  billion cubic meters") // Display data
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 15) + "px");
                } else {
                    tooltip.html("<strong>Year: </strong>" + d.Year + "<br><strong>Water Withdrawal: </strong>" + commaFormat(twoSf(d[colName])) + " billion cubic meters<br><strong>% of Total Year Withdrawal: </strong>" + twoSf(d[getPercentTotal(colName, d.Year)])) // Display data
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 15) + "px");
                }
                
                
            });

            points_hitbox.on('mouseout', function(d, i) {
                const index = worldData.indexOf(d);

                d3.select(points.nodes()[index])
                    .transition()
                    .duration(200)
                    .attr("r", 3);

                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0);
            });
            
            // display line
            d3.select("svg")
                .append("g")
                .attr("transform","translate(50,50)")
                .append("path")
                .datum(worldData)
                .attr("fill", "none")
                .attr("stroke", function(d){ return colors[idx] })
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                    .x(function(d) { return x(d.Year) })
                    .y(function(d) { return y(d[colName]) })
                    );

            idx += 1;
        });

        // axes
        d3.select("svg").append("g").attr("transform","translate(50,50)").call(d3.axisLeft(y).tickValues([0, 400, 800, 1200, 1600, 2000, 2400, 2800, 3000]).tickFormat((d,i) => ["0B", "400B", "800B", "1.2T", "1.6T", "2T", "2.4T", "2.8T", "3.T"][i]));
        d3.select("svg").append("g").attr("transform","translate(50,450)").call(d3.axisBottom(x).tickValues([2000, 2005, 2010, 2015, 2022]).tickFormat(d3.format("c")));
        
        // title
        d3.select("svg").append("text")
            .attr("class", "title")
            .attr("text-anchor", "end")
            .attr("x", 550)
            .attr("y", 50)
            .style("font-weight", 500)
            .style("font-size", 12)
            .text("Hover over points for more details");

        // x axis label
        d3.select("svg").append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", 450)
            .attr("y", 500 - 6)
            .text("Year");

        // y axis label
        d3.select("svg").append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", 0)
            .attr("dy", ".75em")
            .attr("x", -100)
            .attr("transform", "rotate(-90)")
            .text("Water withdrawal in cubic meters");
        
        //legend
        var legend = d3.select("#legend")
        var keys = ["Agriculture", "Industrial", "Municipal"];

        legend.selectAll("dots")
        .data(keys)
        .enter()
        .append("circle")
            .attr("cx", 50)
            .attr("cy", function(d,i){ return 50 + i*25})
            .attr("r", 7)
            .style("fill", function(d, i){ return colors[i]})
            .style("cursor", "default");

        legend.selectAll("labels")
        .data(keys)
        .enter()
        .append("text")
            .attr("x", 70)
            .attr("y", function(d,i){ return 50 + i*25})
            .style("fill", function(d, i){ return colors[i]})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-size", "14px");
    });
}

