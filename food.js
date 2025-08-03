async function page3() {
    document.getElementById("chart-title").innerHTML = "Section 3: Freshwater Withdrawals vs. Greenhouse Gas Emissions per Kilogram of Food Produced (2010)";
    var data = d3.csv("ghg-and-water-withdrawals-per-kg-poore.csv", function(d) {
    d.Year = +d.Year;
    d.emissions_per_kilogram = +d.emissions_per_kilogram;
    d.freshwater_withdrawals_per_kilogram = +d.freshwater_withdrawals_per_kilogram;
    
    return d;
    }).then(function(data) {
        // data.sort((a, b) => d3.descending(a.emissions_per_kilogram, b.emissions_per_kilogram));
        console.log(data);
        
        var x = d3.scaleLog().domain([0.1,100]).range([0,750]);
        var y = d3.scaleLog().domain([0.1,6000]).range([400,0]);
        // var y = d3.scaleBand().domain(data.map(function(d) { return d.Entity; })).range([0,400]).padding(.1);;
        
        var categories = ["Fruits", "Grains", "Meats/Animal Products", "Sugars", "Vegetables", "Dairy", "Nuts", "Legumes", "Other"]
        // https://observablehq.com/@d3/color-schemes
        const colors = ["#ed313aff","#efb118","#97bbf5","#6cc5b0","#3ca951","#ff8ab7","#a463f2","#4269d0", "#ff725c"]
        const hoverColors = ["#ba242bff","#b58303ff","#6086c3ff","#549e8cff","#2b873dff","#c35e84ff","#773bc1ff","#294798ff", "#c3503fff"]

        function assignColor(entity) {
            const curData = data.filter(d => d.Entity === entity);
            for (let i = 0; i < 9; i++) {
                if (curData[0].Category === categories[i]) {
                    return colors[i];
                };
            }
        }

        function assignHover(entity) {
            const curData = data.filter(d => d.Entity === entity);
            for (let i = 0; i < 9; i++) {
                if (curData[0].Category === categories[i]) {
                    return hoverColors[i];
                };
            }
        }
        
        var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        commaFormat = d3.format(",");
        twoSf = d3.format(".2f");


        // ANNOTATIONS
        const type = d3.annotationCalloutCircle

        const annotations = [{
            note: {
                label: "Cows raised for beef production contribute to the highest amount of greenhouse gases.",
                title: "",
                wrap: 200
            },
            data: { Emissions: 99.48, Water: 1451.2 },
            dy: 175,
            dx: -1,
            subject: {
                radius: 8,
                radiusPadding: 3
            }
        }]

        const make1 = d3.annotation()
            .editMode(false)
            .notePadding(5)
            .type(type)
            .accessors({
                x: d => x(d.Emissions),
                y: d => y(d.Water)
            })
            .accessorsInverse({
                Emissions: d => x.invert(d.x),
                Water: d => y.invert(d.y)
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
                label: "Cheese contributes to the highest amount of water use.",
                title: "",
                wrap: 150
            },
            data: { Emissions: 23.88, Water: 5605.2 },
            dy: 125,
            dx: 0,
            subject: {
                radius: 8,
                radiusPadding: 3
            }
        }]

        const make2 = d3.annotation()
            .editMode(false)
            .notePadding(5)
            .type(type)
            .accessors({
                x: d => x(d.Emissions),
                y: d => y(d.Water)
            })
            .accessorsInverse({
                Emissions: d => x.invert(d.x),
                Water: d => y.invert(d.y)
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
                label: "Poultry products contribute to the least amount of emissions and water use out of all animal products.",
                title: "",
                wrap: 200
            },
            data: { Emissions: 6.8, Water: 618.85 },
            dy: 225,
            dx: 0,
            subject: {
                radius: 50,
                radiusPadding: 3
            }
        }]

        const make3 = d3.annotation()
            .editMode(false)
            .notePadding(5)
            .type(type)
            .accessors({
                x: d => x(d.Emissions),
                y: d => y(d.Water)
            })
            .accessorsInverse({
                Emissions: d => x.invert(d.x),
                Water: d => y.invert(d.y)
            })
            .annotations(annotations3)

        d3.select("svg")
        .append("g")
        .attr("transform","translate(50,50)")
        .attr("class", "annotation-group")
        .style("font-size", "12px")
        .call(make3)



        // GRAPH 
        // display scatterplot
        var points = d3.select("svg")
            .append("g")
            .attr("transform","translate(50,50)")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return x(d.emissions_per_kilogram); })
            .attr("cy", function(d) { return y(d.freshwater_withdrawals_per_kilogram); })
            .attr("r", 5)
            .attr("fill", function(d) { return assignColor(d.Entity); });
        
        
        points.on('mouseover', function(d, i) {
            d3.select(this)
                .transition()
                .duration(100)
                .attr("fill", assignHover(d.Entity));

            tooltip.transition()
                .duration(100)
                .style("opacity", 1);
            tooltip.html("<strong>Food: </strong>" + d.Entity + "<br><strong>GHG Emissions: </strong>" + d.emissions_per_kilogram + " kilograms<br><strong>Water Withdrawal: </strong>" + d.freshwater_withdrawals_per_kilogram + " liters") // Display data
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px");
            
            
        });

        points.on('mouseout', function(d, i) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("fill", assignColor(d.Entity));

            tooltip.transition()
                .duration(200)
                .style("opacity", 0);
        });
        
        // axes
        d3.select("svg").append("g").attr("transform","translate(50,50)").call(d3.axisLeft(y).tickValues([10,20,50,100,300,2000,6000]).tickFormat(d3.format("~s")));
        d3.select("svg").append("g").attr("transform","translate(50,450)").call(d3.axisBottom(x).tickValues([1, 2, 4, 6, 10,20,50,100]).tickFormat(d3.format("~s")));
        
        // title
        d3.select("svg").append("text")
            .attr("class", "title")
            .attr("text-anchor", "end")
            .attr("x", 550)
            .attr("y", 40)
            .style("font-weight", 500)
            .style("font-size", 12)
            .text("Hover over points for more details");

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
            .attr("x", -150)
            .attr("transform", "rotate(-90)")
            .text("Water withdrawal in liters");
        
        //legend
        var legend = d3.select("#legend")

        legend.selectAll("dots")
        .data(categories)
        .enter()
        .append("circle")
            .attr("cx", 50)
            .attr("cy", function(d,i){ return 50 + i*25})
            .attr("r", 7)
            .style("fill", function(d, i){ return colors[i]})
            .style("cursor", "default");

        legend.selectAll("labels")
        .data(categories)
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

