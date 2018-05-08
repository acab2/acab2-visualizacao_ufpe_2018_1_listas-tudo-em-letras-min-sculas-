var dataset;
d3.csv("https://raw.githubusercontent.com/nosbielcs/opendata_aig_brazil/master/data/oco.csv", function(data) {
  dataset = data;
});

var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = 1000 - margin.left - margin.right // Use the window's width 
  , height = 500 - margin.top - margin.bottom; // Use the window's height
   
var svg = d3.select("body").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + " )");
		
var map = svg.append("g").attr("class", "counties").attr("id","mapToggle");

var number= svg.append("text")
                            .attr("id","numberToggle")
                            .attr("x",120)
                            .attr("y",90)
                            .attr("fill","green")
                            .attr("font-size",24)
                            .text("[click a button]"); //////////////
			 
var allMaps = svg.append("g")
                   .attr("id","allMaps"); 			 

var labels = ['1','2','3'];
var defaultColor= "#7777BB";
var hoverColor= "#0000ff";
var pressedColor= "#000077";

//groups for each button (which will hold a rect and text)
            var buttonGroups= allMaps.selectAll("g.button")
                                    .data(labels)
                                    .enter()
                                    .append("g")
                                    .attr("class","button")
                                    .style("cursor","pointer")
                                    .on("click",function(d,i) {
                                        updateButtonColors(d3.select(this), d3.select(this.parentNode))
                                        d3.select("#numberToggle").text(i+1)
                                    })
                                    .on("mouseover", function() {
                                        if (d3.select(this).select("rect").attr("fill") != pressedColor) {
                                            d3.select(this)
                                                .select("rect")
                                                .attr("fill",hoverColor);
                                        }
                                    })
                                    .on("mouseout", function() {
                                        if (d3.select(this).select("rect").attr("fill") != pressedColor) {
                                            d3.select(this)
                                                .select("rect")
                                                .attr("fill",defaultColor);
                                        }
                                    });


var bWidth= 40; //button width
            var bHeight= 25; //button height
            var bSpace= 10; //space between buttons
            var x0= 20; //x offset
            var y0= 10; //y offset

            //adding a rect to each toggle button group
            //rx and ry give the rect rounded corner
            buttonGroups.append("rect")
                        .attr("class","buttonRect")
                        .attr("width",bWidth)
                        .attr("height",bHeight)
                        .attr("x",function(d,i) {return x0+(bWidth+bSpace)*i;})
                        .attr("y",y0)
                        .attr("rx",5) //rx and ry give the buttons rounded corners
                        .attr("ry",5)
                        .attr("fill",defaultColor)

						buttonGroups.append("text")
                        .attr("class","buttonText")
                        .attr("font-family","FontAwesome")
                        .attr("x",function(d,i) {
                            return x0 + (bWidth+bSpace)*i + bWidth/2;
                        })
                        .attr("y",y0+bHeight/2)
                        .attr("text-anchor","middle")
                        .attr("dominant-baseline","central")
                        .attr("fill","white")
                        .text(function(d) {return d;});

            function updateButtonColors(button, parent) {
                parent.selectAll("rect")
                        .attr("fill",defaultColor)

                button.select("rect")
                        .attr("fill",pressedColor)
            }
		//https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-100-mun.json
