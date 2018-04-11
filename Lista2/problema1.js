
var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = 1000 - margin.left - margin.right // Use the window's width 
  , height = 500 - margin.top - margin.bottom; // Use the window's height
   
var xScale = d3.scaleTime().domain([new Date(2017, 0, 1), new Date(2017, 11, 01)]).range([0, width]);
var yScale = d3.scaleLinear().domain([0, 35]).range([height, 0]);

var dataset = function(i){
	var data = [];
		for (i = 0; i < 12; i++) { 		
			data.push({ "x": new Date(2017, i, 1),
						"high": temperature.RecordHigh[i],
						"mean": temperature.DailyMean[i],
						"low": temperature.RecordLow[i]}); 
		}
		return data;
}

var line = d3.line()
    .x(function(d, i) { return xScale(d.x); }) // set the x values for the line generator
    .y(function(d, i) { return yScale(d.mean); }) // set the y values for the line generator 
	
var areaLow = d3.area()
	.x(function(d, i) { return xScale(d.x); }) // set the x values for the line generator
	.y0(function(d, i){return yScale(d.low)-margin.top;})
	.y1(function(d, i){return yScale(d.mean)-margin.top;})

var areaHigh = d3.area()
	.x(function(d, i) { return xScale(d.x); }) // set the x values for the line generator
	.y0(function(d, i) { return yScale(d.mean)+margin.top ; })
	.y1(function(d, i){return yScale(d.high);})
	
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + " )");

svg.append("g")
	.append("path")
	.attr("fill", "#884488")
	.attr("d", areaHigh(dataset()));

svg.append("g").attr("transform", "translate(" + 0 + "," + margin.top + ")")
	.append("path")
	.attr("fill", "#884488")
	.attr("d", areaLow(dataset()));

svg.append("g")
	.append("path")
    .attr("class", "line") 
    .attr("d", line(dataset())); 
	
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); 

svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); 
	
svg.append("g").append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top) + ")")
      .style("text-anchor", "middle")
      .text("Time");
