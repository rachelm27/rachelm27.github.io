async function page1() {
    document.getElementById("prev").disabled = true;
    var data = d3.csv("https://ourworldindata.org/grapher/ghg-emissions-by-sector.csv?v=1&csvType=full&useColumnShortNames=true", function(d) {
    d.Year = +d.Year;
    d.agriculture_ghg_emissions = +d.agriculture_ghg_emissions;
    d.land_use_change_and_forestry_ghg_emissions = +d.land_use_change_and_forestry_ghg_emissions;
    d.waste_ghg_emissions = +d.waste_ghg_emissions;
    d.buildings_ghg_emissions = +d.buildings_ghg_emissions;
    d.industry_ghg_emissions = +d.industry_ghg_emissions;
    d.manufacturing_and_construction_ghg_emissions = +d.manufacturing_and_construction_ghg_emissions;
    d.transport_ghg_emissions = +d.transport_ghg_emissions;
    d.electricity_and_heat_ghg_emissions = +d.electricity_and_heat_ghg_emissions;
    d.fugitive_ghg_emissions = +d.fugitive_ghg_emissions;
    d.other_fuel_combustion_ghg_emissions = +d.other_fuel_combustion_ghg_emissions;
    d.aviation_and_shipping_ghg_emissions = +d.aviation_and_shipping_ghg_emissions;
    return d;
    }).then(function(data) {
        console.log(data);
        
        const worldData = data.filter(d => d.Code === "OWID_WRL");
        // console.log(worldData);

        var x = d3.scaleLinear().domain([1990,2021]).range([0,800]);
        var y = d3.scaleLinear().domain([0,16000000000]).range([400,0]);
        
        const emissionCols = ["agriculture_ghg_emissions", "land_use_change_and_forestry_ghg_emissions", "waste_ghg_emissions", "buildings_ghg_emissions", "industry_ghg_emissions", "manufacturing_and_construction_ghg_emissions", "transport_ghg_emissions", "electricity_and_heat_ghg_emissions", "fugitive_ghg_emissions", "other_fuel_combustion_ghg_emissions", "aviation_and_shipping_ghg_emissions"]
        // https://observablehq.com/@d3/color-schemes
        const colors = ["#4269d0","#efb118","#ff725c","#6cc5b0","#3ca951","#ff8ab7","#a463f2","#97bbf5","#9c6b4e","#bcbd22", "#d62728"]
        
        var idx = 0;
        
        var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
        
        // const yearTotals = [];
        worldData.forEach(function(d) {
            var curSum = 0;
            emissionCols.forEach(function(colName) {
                curSum += d[colName];
            });
            d.total = curSum;
        });
        console.log(worldData);

        commaFormat = d3.format(",");
        twoSf = d3.format(".2f");


        // ANNOTATIONS
        const type = d3.annotationCalloutCircle

        const annotations = [{
            note: {
                label: "Agriculture is the 2nd leading sector in GHG emissions, contributing to 14.91% of total emissions for the year.",
                title: "1990",
                wrap: 215
            },
            //can use x, y directly instead of data
            data: { Year: 1990, Emissions: 4975520300 },
            // x: 200,
            // y: 200,
            dy: -175,
            dx: 25,
            subject: {
                radius: 7,
                radiusPadding: 3
            }
        }]

        const make1 = d3.annotation()
            .editMode(false)
            .notePadding(5)
            .type(type)
            .accessors({
                x: d => x(d.Year),
                y: d => y(d.Emissions)
            })
            .accessorsInverse({
                year: d => x.invert(d.x),
                emissions: d => y.invert(d.y)
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
                label: "Agriculture drops to the 3rd leading sector, decreasing its emissions by 1.34% since 1990 (-66.8M tonnes).",
                title: "1993",
                wrap: 215
            },
            //can use x, y directly instead of data
            data: { Year: 1993, Emissions: 4908680000 },
            dy: -25,
            dx: 0,
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
                y: d => y(d.Emissions)
            })
            .accessorsInverse({
                year: d => x.invert(d.x),
                emissions: d => y.invert(d.y)
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
                label: "Agriculture drops to the 4th leading sector, but increased its emissions by 10.46% since 1993 (+513.3M tonnes).",
                title: "2007",
                wrap: 215
            },
            //can use x, y directly instead of data
            data: { Year: 2007, Emissions: 5422060000 },
            dy: -75,
            dx: 0,
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
                y: d => y(d.Emissions)
            })
            .accessorsInverse({
                year: d => x.invert(d.x),
                emissions: d => y.invert(d.y)
            })
            .annotations(annotations3)

        d3.select("svg")
        .append("g")
        .attr("transform","translate(50,50)")
        .attr("class", "annotation-group")
        .style("font-size", "12px")
        .call(make3)

        const annotations4 = [{
            note: {
                label: "Agriculture contributes to 11.6% of total emissions for the year, and has 17.86% (888.5M) more emissions than in 1990.",
                title: "2021",
                wrap: 215
            },
            //can use x, y directly instead of data
            data: { Year: 2021, Emissions: 5864000000 },
            dy: -150,
            dx: -1,
            subject: {
                radius: 7,
                radiusPadding: 3
            }
        }]

        const make4 = d3.annotation()
            .editMode(false)
            .notePadding(5)
            .type(type)
            .accessors({
                x: d => x(d.Year),
                y: d => y(d.Emissions)
            })
            .accessorsInverse({
                year: d => x.invert(d.x),
                emissions: d => y.invert(d.y)
            })
            .annotations(annotations4)

        d3.select("svg")
        .append("g")
        .attr("transform","translate(50,50)")
        .attr("class", "annotation-group")
        .style("font-size", "12px")
        .call(make4)



        // GRAPH
        emissionCols.forEach(function(colName) { 
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

                d3.select(points.nodes()[index]).style("cursor", "pointer"); 

                d3.select(points.nodes()[index])
                    .transition()
                    .duration(100)
                    .attr("r", 5);

                tooltip.transition()
                    .duration(100)
                    .style("opacity", 1);
                tooltip.html("<strong>Year: </strong>" + d.Year + "<br><strong>Emissions: </strong>" + commaFormat(d[colName]) + " tonnes<br><strong>% of Total Year Emissions: </strong>" + twoSf((d[colName]/d.total)*100)) // Display data
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px");
                
            });

            points_hitbox.on('mouseout', function(d, i) {
                const index = worldData.indexOf(d);

                d3.select(points.nodes()[index]).style("cursor", "default"); 

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
        d3.select("svg").append("g").attr("transform","translate(50,50)").call(d3.axisLeft(y).tickValues([0, 2000000000, 4000000000, 6000000000, 8000000000, 10000000000, 12000000000, 14000000000, 16000000000]).tickFormat((d,i) => ["0B", "2B", "4B", "6B", "8B", "10B", "12B", "14B", "16B"][i]));
        d3.select("svg").append("g").attr("transform","translate(50,450)").call(d3.axisBottom(x).tickValues([1990, 1995, 2000, 2005, 2010, 2015, 2021]).tickFormat(d3.format("c")));
        
        // title
        d3.select("svg").append("text")
            .attr("class", "title")
            .attr("text-anchor", "end")
            .attr("x", 650)
            .attr("y", 25)
            .style("font-weight", 500)
            .text("Worldwide Greenhouse Gas Emissions by Sector");

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
            .attr("y", 6)
            .attr("dy", ".75em")
            .attr("x", -100)
            .attr("transform", "rotate(-90)")
            .text("Greenhouse gas emissions in tonnes");
        
        //legend
        var legend = d3.select("#legend")
        var keys = ["Agriculture", "Land-use Change and Forestry", "Waste", "Buildings", "Industry", "Manufacturing and Construction", "Transport", "Electricity and Heat", "Fugitive emissions", "Other fuel combustion", "Aviation and Shipping"];

        legend.selectAll("dots")
        .data(keys)
        .enter()
        .append("circle")
            .attr("cx", 50)
            .attr("cy", function(d,i){ return 50 + i*25})
            .attr("r", 7)
            .style("fill", function(d, i){ return colors[i]})

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